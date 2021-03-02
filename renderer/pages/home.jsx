import electron from 'electron'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const ipcRenderer = electron.ipcRenderer || false

const getUser = () => {
  if (ipcRenderer) {
    return ipcRenderer.sendSync('get-user')
  }

  return null
}

const getDaftarResponden = () => {
  if (ipcRenderer) {
    return ipcRenderer.sendSync('get-daftar-responden')
  }

  return []
}

const Home = () => {
  const router = useRouter()
  const user = getUser()
  // const daftar = getDaftarResponden()

  const [daftar, setDaftar] = useState(getDaftarResponden())
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  const deleteHandler = () => {
    const id = selectedId
    if (id) {
      console.log(3)
      // const response = ipcRenderer.sendSync('delete-responden', id)
      const response = ipcRenderer.send('delete-responden', id)
      setDaftar(getDaftarResponden())
    }
    console.log(4)
    setSelectedId(null)
    console.log(5)
    setShowDeleteDialog(false)
  }

  const btnDeleteHandler = (e) => {
    const v = e.target.value
    console.log(1)
    setSelectedId(v)
    console.log(2)
    setShowDeleteDialog(true)
  }

  const download = () => {
    // if (mainProcess) {
    //   console.log('Found mainProcess')
    //   const currentWindow = ipcMain.getCurrentWindow()
    //   const content = JSON.stringify(daftar, null, 2)
    //   ipcMain.saveData(currentWindow, filePath, content)
    // }

    // console.log('mainProcess not found')
    if (ipcRenderer) {
      const response = ipcRenderer.sendSync('save-data', 'test')
      console.log(response)
    }
  }


  return (
    <>
      <div className="relative pt-28 min-h-screen bg-gray-600 shadow-lg max-w-5xl mx-auto antialiased">
        <div className="px-20 text-gray-400 font-mono">
          <div className="flex flex-row items-center pb-2 border-b border-gray-700">
            <div className="flex-grow">
              <p className="text-gray-800 uppercase tracking-tight">Sensus Larap Mentarang</p>
              <p className="tracking-tight font-bold">&rarr; Enumerator: <span className="text-pink-500">{user?.name}</span></p>
            </div>
            <div className="">
              <Link href="/new">
                <a className="px-3 py-2 border border-gray-700 border-opacity-25 hover:bg-gray-700 focus:outline-none">New</a>
              </Link>
            </div>
          </div>

          <table className="w-full text-sm">
            <tbody>
            {daftar.map(({ id, tanggal, desa, nama}) => (
              <tr key={id} className="border-b border-gray-700 border-opacity-50 hover:bg-gray-700 hover:bg-opacity-25">
                <td width="110" className="whitespace-nowrap p-2">{tanggal}</td>
                <td width="100" className="whitespace-nowrap p-2 pl-1">{desa}</td>
                <td className="whitespace-nowrap p-2 pl-1">🙍🏼‍♀️ {nama}</td>
                <td width="110" className="whitespace-nowrap text-right p-1 pr-2">
                  <button onClick={e => router.push(`/view?id=${id}`)} className="ml-1 rounded-xs text-xs bg-gray-s600 hover:bg-gray-700 hover:text-green-500 px-2 py-1 leading-snug focus:outline-none">V</button>
                  <button onClick={e => router.push(`/responden?id=${id}`)} className="ml-1 rounded-xs text-xs bg-gray-s600 hover:bg-gray-700 hover:text-yellow-400 px-2 py-1 leading-snug focus:outline-none">E</button>
                  <button
                  value={id}
                  onClick={btnDeleteHandler}
                  className="ml-1 rounded-xs text-xs bg-gray-s600 hover:bg-gray-700 hover:text-red-500 px-2 py-1 leading-snug focus:outline-none">D</button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
          <div className="py-10 text-center">
            <button onClick={download} className="border hover:border-gray-300 px-4 py-2 hover:shadow">
              Save Data
            </button>
          </div>
        </div>
        {/* <div className='grid grid-col-1 text-2xl w-full text-center'>
          <img className='ml-auto mr-auto' src='/images/logo.png' />
          <span>💕 </span>
        </div>
        <div className='mt-1 w-full flex-wrap flex justify-center'>
          <Link href='/new'>
            <a className='btn-blue'>Go to next page</a>
          </Link>
        </div> */}
      </div>

      <pre>
        DAFTAR {JSON.stringify(daftar, null, 2)}
      </pre>

      {showDeleteDialog && <div className="fixed w-full h-full top-0 bg-gray-400 bg-opacity-50 flex flex-wrap content-center ">
        <div className="relative w-auto rounded h-auto mx-auto bg-white px-8 py-4 shadow-lg text-center">
          <p>Yakin mau menghapus?</p>
          <p className="text-xs text-red-600">(Tidak bisa UNDO)</p>
          <div className="bg-gray-600 text-white text-center -mx-8 px-6 py-2 my-4">
            <p className="text-sm text-gray-400 font-mono">{selectedId}</p>
            <p className="text-yellow-300 text-2xl font-bold">{daftar[selectedId]}</p>
          </div>
          <button onClick={e => {
            setShowDeleteDialog(false)
            setSelectedId(null)
          }}
            className="rounded text-sm text-gray-200 focus:text-white font-bold bg-gray-500 hover:bg-gray-600 focus:bg-gray-700 focus:outline-none px-6 py-2"
          >Cancel</button>
          <button onClick={deleteHandler}
            className="rounded text-sm text-gray-200 focus:text-white font-bold bg-red-500 hover:bg-red-600 focus:bg-red-700 focus:outline-none px-6 py-2 ml-4"
          >Hapus</button>
        </div>
      </div>}
    </>
  )
}

export default Home
