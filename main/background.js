import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers'
import * as Store from 'electron-store'
import { newJsonID } from "../renderer/lib/utils"
import passwordCrypt from '../renderer/lib/crypt'
import * as model from '../renderer/lib/sensus'

const fs = require('fs')
const path = require('path')

const isProd = process.env.NODE_ENV === 'production';

const DATADIR = path.join(app.getPath('userData'), 'JSONFiles')
if (!fs.existsSync(DATADIR)) fs.mkdirSync(DATADIR)

const DOCUMENTSDIR = app.getPath('documents')

const name = isProd ? 'larap-mentarang' : 'larap-mentarang-dev'
const store = new Store({ name: name })

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight:600,
    maxWidth: 896,
    resizable: false,
  });

  const isUser = store.get('user')
  const route = isUser ? 'user' : 'onboarding'


  if (isProd) {
    await mainWindow.loadURL(`app://./${route}.html`);
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/${route}`);
    // mainWindow.webContents.openDevTools();
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});

/**
 *
 *
 *
 *
 */

const getAllRespondenData = () => {
  const files = store.get('files')
  let daftar = []
  Object.keys(files).forEach((key) => {
    const file = path.join(DATADIR, key)
    const buff = fs.readFileSync(file, 'utf-8')
    const json = JSON.parse(buff)
    // daftar[key] = json
    // daftar.push({ id: json.id, tanggal: json.tanggal, desa: json.desa, nama: json.nama })
    daftar.push(json)
  })

  return daftar
}

ipcMain.on('get-data-dir', (event, arg) => {
  // event.returnValue = `[ipcMain] "${arg}" received synchronously.`
  event.returnValue = DATADIR
})



ipcMain.on('get-user', (event, arg) => {
  event.returnValue = store.get('user') || false
})

ipcMain.on('create-user', (event, arg) => {
  console.log(arg)
  // event.returnValue = arg
  const user = store.get('user')

  if (!user) {
    const { name, password } = arg
    const hashed = passwordCrypt(password)
    store.set('user', { name: name, password: hashed })
    event.returnValue = store.get('user') || {}
  }

  event.returnValue = false
})

ipcMain.on('verify-password', (event, arg) => {
  const hashed = passwordCrypt(arg)
  const user = store.get('user')
  event.returnValue = hashed === user.password
})


ipcMain.on('new-responden', (event, arg) => {
  // event.returnValue = arg

  let sensus = model.Sensus
  let anggota = model.Anggota
  anggota.nama = arg.nama
  anggota.hubungan = arg.hubungan
  anggota.isResponden = true
  sensus.anggota[0] = anggota

  sensus.id = newJsonID()
  sensus.enumerator = arg.enumerator
  sensus.tanggal = arg.tanggal
  sensus.dusun = arg.dusun
  sensus.desa = arg.desa
  sensus.kecamatan = arg.kecamatan

  sensus.nama = arg.nama
  sensus.hubungan = arg.hubungan

  // event.returnValue = sensus

  const key = `files.${sensus.id}`
  const filePath = path.join(DATADIR, sensus.id)

  const data = JSON.stringify(sensus, null, 2)
  fs.writeFile(filePath, data, { overwrite: true }, function(err) {
    if (err) {
      event.returnValue = false
    }

    console.log('CREATED NEW RESPONDEN: ', sensus.id)
    store.set(key, sensus.nama)
    event.returnValue = sensus
  })

  // event.returnValue = false
})

ipcMain.on('save-responden', (event, arg) => {
  if (!arg.id) {
    event.returnValue = false
    return
  }

  let responden = arg

  // update anggota
  responden.anggota[0].nama = responden.nama
  responden.anggota[0].gender = responden.gender
  responden.anggota[0].umur = responden.umur
  responden.anggota[0].hubungan = responden.hubungan
  responden.anggota[0].marital = responden.marital
  responden.anggota[0].pendidikan = responden.pendidikan
  responden.anggota[0].pekerjaan = responden.pekerjaan
  responden.anggota[0].kerentanan = responden.kerentanan

  // let prefix = arg.id ? 'SAVED: ' : 'CREATED NEW RESPONDEN: '
  // if (!responden.id) responden.id = newJsonID()
  const key = `files.${responden.id}`
  const filePath = path.join(DATADIR, responden.id)

  const data = JSON.stringify(responden, null, 2)
  fs.writeFile(filePath, data, { overwrite: true }, function(err) {
    if (err) throw err

    console.log('SAVED:', responden.id)
    store.set(key, responden.nama)
  })

  event.returnValue = responden
})

ipcMain.on('delete-responden', (event, arg) => {
  const key = 'files.' + arg
  const file = path.join(DATADIR, arg)
  fs.unlink(file, function(err) {
    if (err) {
      event.returnValue = 'Failed to delete responden.'
    }
    store.delete(key)
    event.returnValue = { message: 'OK' }
  })

  // let daftar = []
  // const files = store.get('files')
  // if (files) {
  //   Object.keys(files).forEach((key) => {
  //     const file = path.join(DATADIR, key)
  //     const buff = fs.readFileSync(file, 'utf-8')
  //     const json = JSON.parse(buff)
  //     // daftar[key] = json
  //     daftar.push({ id: json.id, tanggal: json.tanggal, desa: json.desa, nama: json.nama })
  //   })
  // }

  // console.log(daftar)
  // event.returnValue = daftar
})



ipcMain.on('get-responden', (event, arg) => {
  const file = path.join(DATADIR, arg)
  const buff = fs.readFileSync(file, 'utf-8')
  event.returnValue = JSON.parse(buff)
})

ipcMain.on('get-daftar-responden', (event, arg) => {
  let daftar = []
  const files = store.get('files')
  if (files) {
    Object.keys(files).forEach((key) => {
      const file = path.join(DATADIR, key)
      const buff = fs.readFileSync(file, 'utf-8')
      const json = JSON.parse(buff)
      // daftar[key] = json
      daftar.push({ id: json.id, tanggal: json.tanggal, desa: json.desa, nama: json.nama })
    })
  }

  console.log(daftar)
  event.returnValue = daftar
})





// ipcMain.on('delete-responden', (event, arg) => {
//   const key = 'files.' + arg
//   const file = path.join(DATADIR, arg)
//   fs.unlink(file, function(err) {
//     if (err) {
//       event.returnValue = 'Failed to delete responden.'
//     }
//     store.delete(key)
//     event.returnValue = store.get('files') || {};
//   })
// })


ipcMain.on('save-data', (event, arg) => {
  const username = store.get('user').name.split(' ').join('').toUpperCase()
  const date = new Date().toISOString().replaceAll(':', '').substr(0, 17)
  const filename = 'LARAP-' + username + '-' + date
  const filePath = path.join(DOCUMENTSDIR, filename)
  const data = JSON.stringify(getAllRespondenData(), null, 2)
  fs.writeFile(filePath, data, { overwrite: true }, function(err) {
    if (err) {
      event.returnValue = 'Failed to save data.'
    }

    event.returnValue = 'Saved as ' + filePath
  })
})
