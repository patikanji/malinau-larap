import electron from 'electron'
import { React, useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as model from '../lib/sensus'
import * as options from '../lib/options'
import Input from '../components/Input'
import Select from '../components/Select'
import { decimal } from '../lib/utils'
import ButtonDeleteRow from '../components/ButtonDeleteRow'
import { getDataFromJsonFile } from '../lib/utils'

const ipcRenderer = electron.ipcRenderer || false

const picts = [
  '1280-182474476-lion.jpg',
  '231328-nature-cliff-landscape-Japan.jpg',
  'DSCF3429.JPG',
  'DSCF3444.JPG',
  'GEnthe-Japan-wewe.jpg',
  'hiro-goto-japan-photography-12.jpg',
  'lion8sdjs.jpg',
  'maxresdefault.jpg',
]

const getPhoto = () => {
  return picts[Math.floor(Math.random() * picts.length)]
}

const getUser = () => {
  if (ipcRenderer) {
    return ipcRenderer.sendSync('get-user')
  }

  return null
}

const getResponden = (id) => {
  if (ipcRenderer) {
    return ipcRenderer.sendSync('get-responden', id)
  }

  return null
}

const Responden = () => {
  const user = getUser()
  const router = useRouter()
  const rsid = router.query['id']

  // if (!rsid) router.push('/home') // No router instance found. you should only use "next/router" inside the client side of your app. https://err.sh/vercel/next.js/no-router-instance

  const [resdata, setResdata] = useState( getResponden(rsid) || model.Sensus )

  // const dataDir = getDataDir()
  // const jsonData = getDataFromJsonFile(dataDir, rsid)
  // const [resdata, setResdata] = useState( jsonData )
  const [proxy, setProxy] = useState( resdata )
  const [flag, setFlag] = useState(true)

  const [tanggal, setTanggal] = useState(resdata?.tanggal ? resdata?.tanggal.split('-')[2] : '')
  const [bulan, setBulan] = useState(resdata?.tanggal ? resdata?.tanggal.split('-')[1] : '')
  // const [hubTmp, setHubTmp] = useState('')

  // const [anggota, setAnggota] = useState(null)
  // const [fmAnggota, setFmAnggota] = useState(false)

  // const [activeForm, setActiveForm] = useState(null)
  // const [meta, setMeta] = useState(null)

  // const [fmTanah, setFmTanah] = useState(null)
  // const [fmBangunan, setFmBangunan] = useState(null)
  // const [fmTanaman, setFmTanaman] = useState(null)
  // const [fmTransportasi, setFmTransportasi] = useState(null)
  // const [fmPendapatanNonKK, setFmPendapatanNonKK] = useState(null)
  // const [fmPendapatanPertanian, setFmPendapatanPertanian] = useState(null)
  // const [fmPendapatanMenyewakanTanah, setFmPendapatanMenyewakanTanah] = useState(null)
  // const [fmPendapatanMenyewakanBangunan, setFmPendapatanMenyewakanBangunan] = useState(null)
  // const [fmPendapatanBagihasilPertanian, setFmPendapatanBagihasilPertanian] = useState(null)
  // const [fmPendapatanHasilHutan, setFmPendapatanHasilHutan] = useState(null)
  // const [fmPendapatanBudidayaIkan, setFmPendapatanBudidayaIkan] = useState(null)
  // const [fmPendapatanIkanTangkapan, setFmPendapatanIkanTangkapan] = useState(null)
  // const [fmKejadianPenyakit, setFmKejadianPenyakit] = useState(null)
  // const [fmPutusSekolah, setFmPutusSekolah] = useState(null)
  // const [fmProgram, setFmProgram] = useState(null)

  function getDataDir() {
    if (ipcRenderer) {
      return ipcRenderer.sendSync('get-data-dir')
    }

    return false
  }

  function flagger() {
    setFlag(!flag)
  }

  useEffect(() => {
    if (ipcRenderer) {
      ipcRenderer.sendSync('save-responden', resdata)
    }
    return () => {}
  }, [proxy, flag])

  function getDaftarNamaAnggota() {
    let array = []
    resdata?.anggota.forEach(a => {
      array.push([a?.nama, a?.nama])
    })
    return array
  }

  function getDaftarNamaNonKK() {
    let array = []
    resdata?.anggota.forEach(a => {
      if (a.hubungan !== 'Kepala keluarga') array.push([a?.nama, a?.nama])
    })
    return array
  }

  function getUmurAnggota(nama) {
    let umur = 0
    resdata?.anggota.forEach(a => {
      if (a?.nama == nama) umur = a.umur
    })
    return umur
  }

  function getDaftarNamaUsiaSekolah() {
    let daftar = []
    resdata?.anggota.forEach(a => {
      if (a.umur < 16) daftar.push([a?.nama, a?.nama])
    })
    return daftar
  }

  return (
    <>
      <Head>
        <title>Larap Mentarang - {resdata?.nama}</title>
      </Head>
     <div className="relative pt-28 min-h-screen bg-white shadow-lg max-w-5xl mx-auto antialiased">

       <div className="fixed w-full left-0 top-0 z-50">
        <div className="max-w-5xl mx-auto">
            {/* header */}
            <div className="bg-yellow-100 bg-opacity-25 text-sm text-gray-700">
              <div className="flex flex-row items-center bg-gray-800 px-6 pt-8 pb-4">
                <h1 className="flex-grow text-xl h-7 text-blue-400 font-bold">
                  {resdata?.nama}
                </h1>
                <p className="text-blue-400 uppercase">
                  Larap Mentarang 2021
                </p>
              </div>
            </div>
            {/* ribbon */}
            <div className="shadow-lg bg-yellow-200 border-bs border-gray-400">
              <div className="flex flex-row items-center px-6 py-2">
                <p className="flex-grow text-yellow-600">
                  <Link href="/home">
                    <a>👨🏽‍🚀 &nbsp; {user?.name}</a>
                  </Link>
                </p>
                <p className="text-xs font-mono text-yellow-500">
                  {resdata?.id}
                </p>
              </div>
            </div>
          </div>
       </div>
     </div>


     <div id="content-wrap" className="fixed w-full left-0 bottom-0 overflow-y-auto">
       <div className="max-w-5xl mx-auto">

          <div className="bg-gray-600 bg-opacity-s75 text-sm text-gray-700">
            <div className="p-6 antialiased">
              <h3 className="text-white font-bold ml-1s mb-2">
                Responden & Lokasi Wawancara
              </h3>
              <div className="rounded border border-white border-opacity-50 px-4 pt-2 pb-4">
                <div className="flex flex-row mb-2">
                  <div className="flex flex-col">
                    <label className="capslabel text-gray-400">Tanggal wawancara</label>
                    <div className="flex flex-row">
                      <select disabled
                        onChange={e => setTanggal(e.target.value)}
                        defaultValue={resdata?.tanggal ? resdata?.tanggal.split('-')[2] : ''}
                        className="px-2 py-1 mr-1 border-l border-b border-transparent bg-gray-400 text-gray-800 hover:border-gray-300 focus:bg-gray-300 focus:border-white focus:outline-none">
                        <option></option>
                        {options.optTanggal.map(v => (
                          <option key={v} value={v}>{v}</option>
                        ))}
                      </select>
                      <select disabled
                      onChange={e => setBulan(e.target.value)}
                      defaultValue={resdata?.tanggal ? resdata?.tanggal.split('-')[1] : ''}
                      className="flex-grow px-2 py-1 border-l border-b border-transparent bg-gray-400 text-gray-800 hover:border-gray-300 focus:bg-gray-300 focus:border-white focus:outline-none">
                        <option></option>
                        {options.optBulan.map(([k, v]) => (
                          <option key={k} value={k}>{v}</option>
                        ))}
                      </select>
                      <input type="text" disabled value="2021"
                        className="bg-gray-400 w-16 text-gray-800 ml-1 px-2 py-1 border-b border-l border-transparent hover:border-gray-300 focus:bg-gray-300 focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow ml-4">
                    <label className="capslabel text-gray-400">Nama lengkap</label>
                    <Input model={resdata} disabled={true} setter={setResdata} path={['nama']} style='dark'/>
                  </div>
                  <div className="flex flex-col ml-4">
                    <label className="capslabel text-gray-400">Hubungan</label>
                    <input
                      disabled
                      type="text"
                      value={resdata?.hubungan}
                      className="bg-gray-400 text-gray-800 px-2 py-1 border-b border-l border-transparent hover:border-gray-300 focus:bg-gray-300 focus:border-white focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <label className="capslabel text-gray-400">Dusun</label>
                    <Input model={resdata} disabled={true} setter={setResdata} path={['dusun']} style='dark'/>
                  </div>
                  <div className="flex flex-col">
                    <label className="capslabel text-gray-400">Desa</label>
                    <Input model={resdata} disabled={true} setter={setResdata} path={['desa']} style='dark'/>
                  </div>
                  <div className="flex flex-col">
                    <label className="capslabel text-gray-400">Kecamatan</label>
                    <Input model={resdata} disabled={true} setter={setResdata} path={['kecamatan']} style='dark'/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* kk */}
          <div className="bg-white text-sm text-gray-700">
            <div className="p-6 antialiased">
              <h3 className="font-bold ml-1s mb-2">
                Kepala Keluarga
              </h3>
              <div className="">
                <div className="flex flex-row mb-3">
                  <div className="w-56 flex flex-col mr-4">
                    <label className="capslabel text-gray-400">Nama lengkap</label>
                    <Input model={resdata} disabled={true} setter={setResdata} path={['nama']}/>
                  </div>
                  <div className="w-56 text-sm flex flex-col mr-4">
                    <label className="capslabel text-gray-400">Nama panggilan</label>
                    <Input model={resdata} disabled={true} setter={setResdata} path={['panggilan']}/>
                  </div>
                  <div className="w-16 flex flex-col mr-4">
                    <label className="capslabel text-gray-400">Umur</label>
                    <Input numeric={true} model={resdata} disabled={true} setter={setResdata} path={['umur']}/>
                  </div>
                  <div className="flex flex-col mr-4">
                    <label className="capslabel text-gray-400">Jenis kelamin</label>
                      <Select disabled={true} options={options.optGender} model={resdata} disabled={true} setter={setResdata} path={['gender']} style="light"/>
                  </div>
                  <div className="flex flex-col mr-4">
                    <label className="capslabel text-gray-400">Status perkawinan</label>
                    <Select disabled={true} options={options.optStatus} model={resdata} disabled={true} setter={setResdata} path={['marital']} style="light"/>
                  </div>
                </div>
                <div className="flex flex-row mb-3">
                  <div className="flex flex-col mr-4">
                    <label className="capslabel text-gray-400">Suku/etnis</label>
                    <Select disabled={true} options={options.optSuku} model={resdata} disabled={true} setter={setResdata} path={['suku']} style="light"/>
                  </div>
                  <div className="flex flex-col mr-4">
                    <label className="capslabel text-gray-400">Agama</label>
                    <Select disabled={true} options={options.optAgama} model={resdata} disabled={true} setter={setResdata} path={['agama']} style="light"/>
                  </div>
                  <div className="flex flex-col mr-4">
                    <label className="capslabel text-gray-400">Lama mukim</label>
                    <Select disabled={true} options={options.optMukim} model={resdata} disabled={true} setter={setResdata} path={['mukim']} style="light"/>
                  </div>
                  <div className="flex flex-col mr-4">
                    <label className="capslabel text-gray-400">Kerentanan</label>
                    <Select disabled={true} options={options.optRentan} model={resdata} disabled={true} setter={setResdata} path={['kerentanan']} style="light"/>
                  </div>
                  <div className="flex flex-col mr-4">
                    <label className="capslabel text-gray-400">Pendidikan</label>
                    <Select disabled={true} options={options.optPendidikan} model={resdata} disabled={true} setter={setResdata} path={['pendidikan']} style="light"/>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="flex flex-col mr-2">
                    <label className="capslabel text-gray-400">Pekerjaan utama</label>
                    <Select disabled={true} options={options.optPekerjaan} model={resdata} disabled={true} setter={setResdata} path={['pekerjaan']} style="light"/>
                  </div>
                  <div className="flex flex-col mr-4">
                    <label className="capslabel text-gray-400">Status pekerjaan utama</label>
                    <Select disabled={true} options={options.optStatusPekerjaan} model={resdata} disabled={true} setter={setResdata} path={['statusPekerjaan']} style="light"/>
                  </div>
                  <div className="flex flex-col mr-2">
                    <label className="capslabel text-gray-400">Pekerjaan lain</label>
                    <Select disabled={true} options={options.optPekerjaan} model={resdata} disabled={true} setter={setResdata} path={['pekerjaanLain']} style="light"/>
                  </div>
                  <div className="flex flex-col mr-4">
                    <label className="capslabel text-gray-400">Status pekerjaan utama</label>
                    <Select disabled={true} options={options.optStatusPekerjaan} model={resdata} disabled={true} setter={setResdata} path={['statusPekerjaanLain']} style="light"/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* angota */}
          <div className="bg-yellow-100 bg-opacity-25 border-t border-b border-yellow-100 text-sm text-gray-700">
            <div className="p-6 antialiased">
              <h3 className="font-bold mb-2">
                Anggota Keluarga
              </h3>
              <div className="-mx-6">
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="bg-yellow-200 border-b border-yellow-200">
                      <td className="p-2 pl-6">#</td>
                      <td className="border-l border-white border-opacity-50 p-2">Nama</td>
                      <td className="border-l border-white border-opacity-50 p-2">L/P</td>
                      <td className="border-l border-white border-opacity-50 p-2">Umur</td>
                      <td className="border-l border-white border-opacity-50 p-2">Hubungan</td>
                      <td className="border-l border-white border-opacity-50 p-2">Status</td>
                      <td className="border-l border-white border-opacity-50 p-2">Kerentanan</td>
                      <td className="border-l border-white border-opacity-50 p-2">Pendidikan</td>
                      <td className="border-l border-white border-opacity-50 p-2">Pekerjaan</td>
                      <td className="border-l border-white border-opacity-50 p-2 pr-6">Action</td>
                    </tr>
                    {/* responden/kk */}
                    <tr className="text-gray-600 bg-yellow-100 bg-opacity-50 hover:bg-white hover:bg-opacity-75 border-b border-yellow-100">
                      <td className="p-2 pl-6">1</td>
                      <td className="border-l border-yellow-100 border-opacity-75 p-2">{resdata?.nama}</td>
                      <td className="border-l border-yellow-100 border-opacity-75 p-2">{resdata?.gender}</td>
                      <td className="border-l border-yellow-100 border-opacity-75 p-2">{resdata?.umur}</td>
                      <td className="border-l border-yellow-100 border-opacity-75 p-2">{resdata?.hubungan}</td>
                      <td className="border-l border-yellow-100 border-opacity-75 p-2">{resdata?.marital}</td>
                      <td className="border-l border-yellow-100 border-opacity-75 p-2">{resdata?.kerentanan}</td>
                      <td className="border-l border-yellow-100 border-opacity-75 p-2">{resdata?.pendidikan}</td>
                      <td className="border-l border-yellow-100 border-opacity-75 p-2">{resdata?.pekerjaan}</td>
                      <td className="border-l border-yellow-100 border-opacity-75 p-2 pr-6">
                        <div className="leading-none">
                          <button disabled
                          className="rounded bg-yellow-50 text-yellow-200 px-2 py-1"
                          >DEL</button>
                        </div>
                      </td>
                    </tr>
                    {/* mapping */}
                    {resdata?.anggota.map((a, index) => {
                      const kkClass = "hidden text-gray-600 bg-yellow-100 bg-opacity-50 hover:bg-white hover:bg-opacity-75 border-b border-yellow-100"
                      const normalClass = "hover:bg-white hover:bg-opacity-75 border-b border-yellow-100"
                      return (
                        <tr key={'k-' + a.nama + index} className={index == 0 ? kkClass : normalClass}>
                          <td className="p-2 pl-6">{index + 1}</td>
                          <td className="border-l border-yellow-100 border-opacity-75 p-2">{a.nama}</td>
                          <td className="border-l border-yellow-100 border-opacity-75 p-2">{a.gender}</td>
                          <td className="border-l border-yellow-100 border-opacity-75 p-2">{a.umur}</td>
                          <td className="border-l border-yellow-100 border-opacity-75 p-2">{a.hubungan}</td>
                          <td className="border-l border-yellow-100 border-opacity-75 p-2">{a.marital}</td>
                          <td className="border-l border-yellow-100 border-opacity-75 p-2">{a.kerentanan}</td>
                          <td className="border-l border-yellow-100 border-opacity-75 p-2">{a.pendidikan}</td>
                          <td className="border-l border-yellow-100 border-opacity-75 p-2">{a.pekerjaan}</td>
                          <td className="border-l border-yellow-100 border-opacity-75 p-2 pr-6">
                          {index == 0 && (
                            <div className="leading-none">
                              <button disabled
                              className="rounded bg-yellow-50 text-yellow-200 px-2 py-1"
                              >DEL</button>
                            </div>
                          )}
                          {index > 0 && (
                            <div className="leading-none">
                              <button disabled
                              value={index}
                              onClick={e => {
                                let array = [...resdata?.anggota]
                                array.splice(index, 1)
                                setResdata(prev => ({
                                  ...prev,
                                  anggota: array
                                }))
                                setFlag(!flag)
                              }}
                              className="rounded bg-yellow-200 hover:bg-yellow-300 text-yellow-400 hover:text-yellow-700 px-2 py-1"
                              >DEL</button>
                            </div>
                          )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>


              </div>
            </div>
          </div>

          {/* rumah */}
          <div className="bg-white text-sm text-gray-700">
            <div className="p-6">
              <h3 className="font-bold mb-2">
                Rumah Tinggal
              </h3>
              <div className="antialiased">
                <div className="flex flex-row mb-3">
                  <div className="flex flex-col mr-4">
                    <label className="capslabel text-gray-400">Lingkungan</label>
                    <Select disabled={true} options={options.optLingkungan} model={resdata} setter={setResdata} path={['rumah', 'linkungan']} style="light"/>
                  </div>
                  <div className="w-20 flex flex-col mr-4">
                    <label className="capslabel text-gray-400">Luas (m2)</label>
                    <Input disabled={true} numeric={true} model={resdata} setter={setResdata} path={['rumah', 'luas']}/>
                  </div>
                  <div className="w-14 flex flex-col mr-4">
                    <label className="capslabel text-gray-400">Ruang</label>
                    <Input disabled={true} numeric={true} model={resdata} setter={setResdata} path={['rumah', 'ruang']}/>
                  </div>
                  <div className="flex flex-col mr-4">
                    <label className="capslabel text-gray-400">Konstruksi</label>
                    <Select disabled={true} options={options.optKonstruksi} model={resdata} setter={setResdata} path={['rumah', 'konstruksi']} style="light"/>
                  </div>
                  <div className="flex flex-col mr-4">
                    <label className="capslabel text-gray-400">Kerusakan</label>
                    <Select disabled={true} options={options.optKerusakan} model={resdata} setter={setResdata} path={['rumah', 'kerusakan']} style="light"/>
                  </div>
                </div>
                <div className="flex flex-row mb-3">
                  <div className="flex flex-col mr-4">
                    <label className="capslabel text-gray-400">Kamar mandi</label>
                    <Select disabled={true} options={options.optWC} model={resdata} setter={setResdata} path={['rumah', 'kamarMandi']} style="light"/>
                  </div>
                  <div className="flex flex-col mr-4">
                    <label className="capslabel text-gray-400">WC</label>
                    <Select disabled={true} options={options.optWC} model={resdata} setter={setResdata} path={['rumah', 'wc']} style="light"/>
                  </div>
                  <div className="flex flex-col mr-4">
                    <label className="capslabel text-gray-400">Lantai</label>
                      <Select disabled={true} options={options.optLantai} model={resdata} setter={setResdata} path={['rumah', 'lantai']} style="light"/>
                  </div>
                  <div className="flex flex-col mr-4">
                    <label className="capslabel text-gray-400">Kepemilikan</label>
                      <Select disabled={true} options={options.optKepemilikan} model={resdata} setter={setResdata} path={['rumah', 'kepemilikan']} style="light"/>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="flex flex-col mr-4">
                    <label className="capslabel text-gray-400">Bukti kepemilikan</label>
                    <Input model={resdata} disabled={true} setter={setResdata} path={['rumah', 'buktiKepemilikan']}/>
                  </div>
                  <div className="flex flex-col mr-4">
                    <label className="capslabel text-gray-400">Prakiraan nilai (Rp)</label>
                    <Input model={resdata} disabled={true} setter={setResdata} path={['rumah', 'nilai']}/>
                  </div>
                  <div className="w-16 flex flex-col mr-4">
                    <label className="capslabel text-gray-400">Sejak thn</label>
                    <Input model={resdata} disabled={true} setter={setResdata} path={['rumah', 'tiggalSejak']}/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* aset bangunan selain rumah */}
          <div className="bg-white text-sm text-gray-700">
            <div className="p-6 antialiased">
              <h3 className="font-bold mb-2">
                Bangunan Selain Rumah Tinggal
              </h3>
              <div className="">
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="bg-gray-200 bg-opacity-75 border-b border-gray-200">
                      <td className="p-2 px-3">#</td>
                      <td className="border-l border-white border-opacity-50 p-2">Jenis/peruntukan</td>
                      <td className="border-l border-white border-opacity-50 p-2">Luas</td>
                      <td className="border-l border-white border-opacity-50 p-2">Sejak</td>
                      <td className="border-l border-white border-opacity-50 p-2">Kepemilikan</td>
                      <td className="border-l border-white border-opacity-50 p-2">Struktur</td>
                      <td className="border-l border-white border-opacity-50 p-2">Nilai</td>
                      <td width="60" className="border-l border-white border-opacity-50 p-2 pr-3">Action</td>
                    </tr>
                    {resdata?.bangunan.map(({jenis, sejak, luas, struktur, status, nilai}, index) => (
                    <tr key={`${jenis}-${index}`} className="hover:bg-gray-50 border-b border-gray-100">
                      <td className="p-2 pl-3">{index +1}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{jenis}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{luas}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{sejak}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{status}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{struktur}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{decimal(nilai)}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2 px-3">

                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>


              </div>
            </div>
          </div>

          {/* aset tanah */}
          <div className="bg-white text-sm text-gray-700">
            <div className="p-6 antialiased">
              <h3 className="font-bold mb-2">
                Tanah Selain Tempat Rumah Tinggal
              </h3>
              <div className="">
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="bg-gray-200 bg-opacity-75 border-b border-gray-200">
                      <td width="30" className="p-2 px-3">#</td>
                      <td className="border-l border-white border-opacity-50 p-2">Jenis/peruntukan</td>
                      <td className="border-l border-white border-opacity-50 p-2">Luas</td>
                      <td className="border-l border-white border-opacity-50 p-2">Status</td>
                      <td className="border-l border-white border-opacity-50 p-2">Nilai</td>
                      <td width="60" className="border-l border-white border-opacity-50 p-2 pr-3">Action</td>
                    </tr>
                    {resdata?.tanah.map(({jenis, luas, status, nilai}, index) => (
                    <tr key={`${jenis}-${index}`} className="hover:bg-gray-50 border-b border-gray-100">
                      <td className="p-2 pl-3">{index +1}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{jenis}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{luas}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{status}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{decimal(nilai)}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2 px-3">

                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>


              </div>
            </div>
          </div>

          {/* tanaman */}
          <div className="bg-white text-sm text-gray-700">
            <div className="p-6 antialiased">
              <h3 className="font-bold mb-2">
                Jenis-jenis Tanaman Pada Lahan
              </h3>
              <div className="">
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="bg-gray-200 bg-opacity-75 border-b border-gray-200">
                      <td width="30" className="p-2 px-3">#</td>
                      <td className="border-l border-white border-opacity-50 p-2">Jenis</td>
                      <td className="border-l border-white border-opacity-50 p-2">Lahan</td>
                      <td className="border-l border-white border-opacity-50 p-2">Tegakan</td>
                      <td className="border-l border-white border-opacity-50 p-2">Sudah panen</td>
                      <td className="border-l border-white border-opacity-50 p-2">Sejak</td>
                      <td width="60" className="border-l border-white border-opacity-50 p-2 pr-3">Action</td>
                    </tr>
                    {resdata?.tanaman.map(({jenis, lahan, tegakan, panen, sejak}, index) => (
                    <tr key={`${jenis}-${index}`} className="hover:bg-gray-50 border-b border-gray-100">
                      <td className="p-2 pl-3">{index +1}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{jenis}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{lahan}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{tegakan}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{panen}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{sejak}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2 px-3">

                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>


              </div>
            </div>
          </div>

          {/* fmTransportasi */}
          <div className="bg-white text-sm text-gray-700">
            <div className="p-6 antialiased">
              <h3 className="font-bold mb-2">
                Alat Transportasi dan Alat Pertanian
              </h3>
              <div className="">
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="bg-gray-200 bg-opacity-75 border-b border-gray-200">
                      <td width="30" className="p-2 px-3">#</td>
                      <td className="border-l border-white border-opacity-50 p-2">Jenis</td>
                      <td className="border-l border-white border-opacity-50 p-2">Umur</td>
                      <td className="border-l border-white border-opacity-50 p-2">Nilai</td>
                      <td width="60" className="border-l border-white border-opacity-50 p-2 pr-3">Action</td>
                    </tr>
                    {resdata?.alatTransportasi.map(({jenis, umur, nilai}, index) => (
                    <tr key={`${jenis}-${index}`} className="hover:bg-gray-50 border-b border-gray-100">
                      <td className="p-2 pl-3">{index +1}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{jenis}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{umur}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{decimal(nilai)}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2 px-3">

                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>


              </div>
            </div>
          </div>






          {/* <div className="h-96 -mx-6 bg-fixed" style="background-image: url(/images/1280-182474476-lion.jpg)"></div> */}
          <div className="flex flex-row h-96 my-80 bg-fixed bg-cover bg-indigo-50" style={{backgroundImage: `url(/images/${getPhoto()})`}}>
            <div className="w-24 bg-white flex-0"></div>
            <div className="flex-grow p-8">
              <div className="h-full border-8 border-white border-opacity-75"></div>
            </div>
            <div className="w-24 bg-white flex-0"></div>
          </div>
          {/* <div className="h-96 -mx-6 bg-green-100"></div> */}






          {/* belanja */}
          <div className="bg-white text-sm text-gray-700">
            <div className="p-6 antialiased">
              <h3 className="font-bold mb-2">
                Belanja Bulanan
              </h3>
              <table>
                <tbody>
                  <tr className="border-b">
                    <td width="110"><label className="capslabel font-bold text-gray-500">Jenis</label></td>
                    <td width="70"><label className="capslabel font-bold  text-gray-500">Nilai</label></td>
                    <td width="300"><label className="capslabel font-bold text-gray-500">Keterangan</label></td>
                  </tr>
                  <tr>
                    <td className="pt-2"><label className="capslabel text-gray-500">Makan-minum</label></td>
                    <td className="pt-2 pb-1 pr-2"><Input width="w-full" numeric={true} model={resdata} disabled={true} setter={setResdata} path={['belanjaMakan']} style="light"/></td>
                    <td className="pt-2 pb-1"><Input width="w-full" numeric={false} model={resdata} disabled={true} setter={setResdata} path={['belanjaMakanInfo']} style="light"/></td>
                  </tr>
                  <tr>
                    <td className="py-1"><label className="capslabel text-gray-500">Pendidikan</label></td>
                    <td className="py-1 pr-2"><Input width="w-full" numeric={true} model={resdata} disabled={true} setter={setResdata} path={['belanjaPendidikan']} style="light"/></td>
                    <td className="py-1"><Input width="w-full" numeric={false} model={resdata} disabled={true} setter={setResdata} path={['belanjaPendidikanInfo']} style="light"/></td>
                  </tr>
                  <tr>
                    <td className="py-1"><label className="capslabel text-gray-500">Kesehatan</label></td>
                    <td className="py-1 pr-2"><Input width="w-full" numeric={true} model={resdata} disabled={true} setter={setResdata} path={['belanjaKesehatan']} style="light"/></td>
                    <td className="py-1"><Input width="w-full" numeric={false} model={resdata} disabled={true} setter={setResdata} path={['belanjaKesehatanInfo']} style="light"/></td>
                  </tr>
                  <tr>
                    <td className="py-1"><label className="capslabel text-gray-500">Pakaian</label></td>
                    <td className="py-1 pr-2"><Input width="w-full" numeric={true} model={resdata} disabled={true} setter={setResdata} path={['belanjaPakaian']} style="light"/></td>
                    <td className="py-1"><Input width="w-full" numeric={false} model={resdata} disabled={true} setter={setResdata} path={['belanjaPakaianInfo']} style="light"/></td>
                  </tr>
                  <tr>
                    <td className="py-1"><label className="capslabel text-gray-500">Listrik</label></td>
                    <td className="py-1 pr-2"><Input width="w-full" numeric={true} model={resdata} disabled={true} setter={setResdata} path={['belanjaListrik']} style="light"/></td>
                    <td className="py-1"><Input width="w-full" numeric={false} model={resdata} disabled={true} setter={setResdata} path={['belanjaListrikInfo']} style="light"/></td>
                  </tr>
                  <tr>
                    <td className="py-1"><label className="capslabel text-gray-500">Pengiriman uang</label></td>
                    <td className="py-1 pr-2"><Input width="w-full" numeric={true} model={resdata} disabled={true} setter={setResdata} path={['belanjaTransfer']} style="light"/></td>
                    <td className="py-1"><Input width="w-full" numeric={false} model={resdata} disabled={true} setter={setResdata} path={['belanjaTransferInfo']} style="light"/></td>
                  </tr>
                  <tr>
                    <td className="py-1"><label className="capslabel text-gray-500">Rokok/tembakau</label></td>
                    <td className="py-1 pr-2"><Input width="w-full" numeric={true} model={resdata} disabled={true} setter={setResdata} path={['belanjaRokok']} style="light"/></td>
                    <td className="py-1"><Input width="w-full" numeric={false} model={resdata} disabled={true} setter={setResdata} path={['belanjaRokokInfo']} style="light"/></td>
                  </tr>
                  <tr>
                    <td className="py-1"><label className="capslabel text-gray-500">Komunikasi</label></td>
                    <td className="py-1 pr-2"><Input width="w-full" numeric={true} model={resdata} disabled={true} setter={setResdata} path={['belanjaKomunikasi']} style="light"/></td>
                    <td className="py-1"><Input width="w-full" numeric={false} model={resdata} disabled={true} setter={setResdata} path={['belanjaKomunikasiInfo']} style="light"/></td>
                  </tr>
                  <tr>
                    <td className="py-1"><label className="capslabel text-gray-500">Transportasi</label></td>
                    <td className="py-1 pr-2"><Input width="w-full" numeric={true} model={resdata} disabled={true} setter={setResdata} path={['belanjaTransportasi']} style="light"/></td>
                    <td className="py-1"><Input width="w-full" numeric={false} model={resdata} disabled={true} setter={setResdata} path={['belanjaTransportasiInfo']} style="light"/></td>
                  </tr>
                  <tr>
                    <td className="py-1"><label className="capslabel text-gray-500">Rekreasi</label></td>
                    <td className="py-1 pr-2"><Input width="w-full" numeric={true} model={resdata} disabled={true} setter={setResdata} path={['belanjaRekreasi']} style="light"/></td>
                    <td className="py-1"><Input width="w-full" numeric={false} model={resdata} disabled={true} setter={setResdata} path={['belanjaRekreasiInfo']} style="light"/></td>
                  </tr>
                  <tr>
                    <td className="py-1"><label className="capslabel text-gray-500">Bayar pinjaman</label></td>
                    <td className="py-1 pr-2"><Input width="w-full" numeric={true} model={resdata} disabled={true} setter={setResdata} path={['belanjaPinjaman']} style="light"/></td>
                    <td className="py-1"><Input width="w-full" numeric={false} model={resdata} disabled={true} setter={setResdata} path={['belanjaPinjamanInfo']} style="light"/></td>
                  </tr>
                  <tr>
                    <td className="py-1"><label className="capslabel text-gray-500">Premi asuransi</label></td>
                    <td className="py-1 pr-2"><Input width="w-full" numeric={true} model={resdata} disabled={true} setter={setResdata} path={['belanjaAsuransi']} style="light"/></td>
                    <td className="py-1"><Input width="w-full" numeric={false} model={resdata} disabled={true} setter={setResdata} path={['belanjaAsuransiInfo']} style="light"/></td>
                  </tr>
                  <tr>
                    <td className="py-1"><label className="capslabel text-gray-500">Biaya-biaya sosial</label></td>
                    <td className="py-1 pr-2"><Input width="w-full" numeric={true} model={resdata} disabled={true} setter={setResdata} path={['belanjaSosial']} style="light"/></td>
                    <td className="py-1"><Input width="w-full" numeric={false} model={resdata} disabled={true} setter={setResdata} path={['belanjaSosialInfo']} style="light"/></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* pendapan kk */}
          <div className="bg-white text-sm text-gray-700">
            <div className="p-6 antialiased">
              <h3 className="font-bold mb-2">
                Pendapatan Utama Kepala Keluarga
              </h3>
              <table>
                <tbody>
                  <tr className="border-b">
                    <td width="110"><label className="capslabel font-bold text-gray-500">Jenis</label></td>
                    <td width="70"><label className="capslabel font-bold  text-gray-500">Nilai</label></td>
                    <td width="300"><label className="capslabel font-bold text-gray-500">Keterangan</label></td>
                  </tr>
                  <tr>
                    <td className="pt-2"><label className="capslabel text-gray-500">Pekerjaan utama</label></td>
                    <td className="pt-2 pb-1 pr-2"><Input width="w-full" numeric={true} model={resdata} disabled={true} setter={setResdata} path={['pendapatanPekerjaan']} style="light"/></td>
                    <td className="pt-2 pb-1"><Input width="w-full" numeric={false} model={resdata} disabled={true} setter={setResdata} path={['pendapatanPekerjaanInfo']} style="light"/></td>
                  </tr>
                  <tr>
                    <td className="py-1"><label className="capslabel text-gray-500">Pekerjaan lain</label></td>
                    <td className="py-1 pr-2"><Input width="w-full" numeric={true} model={resdata} disabled={true} setter={setResdata} path={['pendapatanPekerjaanLain']} style="light"/></td>
                    <td className="py-1"><Input width="w-full" numeric={false} model={resdata} disabled={true} setter={setResdata} path={['pendapatanPekerjaanLainInfo']} style="light"/></td>
                  </tr>
                  <tr>
                    <td className="py-1"><label className="capslabel text-gray-500">Transfer masuk</label></td>
                    <td className="py-1 pr-2"><Input width="w-full" numeric={true} model={resdata} disabled={true} setter={setResdata} path={['pendapatanTransfer']} style="light"/></td>
                    <td className="py-1"><Input width="w-full" numeric={false} model={resdata} disabled={true} setter={setResdata} path={['pendapatanTransferInfo']} style="light"/></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* pendapatan non kk */}
          <div className="bg-white text-sm text-gray-700">
            <div className="p-6 antialiased">
              <h3 className="font-bold mb-2">
                Pendapatan Anggota Keluarga Selain KK
              </h3>
              <div className="">
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="bg-gray-200 bg-opacity-75 border-b border-gray-200">
                      <td width="35" className="p-2 px-3">#</td>
                      <td className="border-l border-white border-opacity-50 p-2">Nama</td>
                      <td className="border-l border-white border-opacity-50 p-2">Nilai</td>
                      <td className="border-l border-white border-opacity-50 p-2">Sumber/keterangan</td>
                      <td width="60" className="border-l border-white border-opacity-50 p-2 pr-3">Action</td>
                    </tr>
                    {resdata?.pendapatanAnggotaNonKK.map(({nama, nilai, keterangan}, index) => (
                    <tr key={`${nama}-${index}`} className="hover:bg-gray-50 border-b border-gray-100">
                      <td className="p-2 pl-3">{index +1}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{nama}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{decimal(nilai)}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{keterangan}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2 px-3">

                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>


              </div>
            </div>
          </div>

          {/* pendapatan pertanian */}
          <div className="bg-white text-sm text-gray-700">
            <div className="p-6 antialiased">
              <div className="flex flex-row items-end">
                <h3 className="flex-grow font-bold mb-2">
                  Pendapatan Pertanian
                </h3>
                <div className=" flex flex-row items-center pb-2">
                  <label className="capslabel text-gray-500 mr-2">Jumlah buruh:</label>
                  <Input disabled={true} width="w-12" numeric={true} model={resdata} setter={setResdata} path={['jumlahBuruh']} style="light"/>
                </div>
              </div>
              <div className="">
                <table className="w-full text-xs overflow-x-auto">
                  <tbody>
                    <tr className="bg-gray-200 bg-opacity-75 border-b border-gray-200">
                      <td width="30" className="p-2 px-3">#</td>
                      <td className="border-l border-white border-opacity-50 p-2">Produk</td>
                      <td className="border-l border-white border-opacity-50 p-2">Luas</td>
                      <td className="border-l border-white border-opacity-50 p-2">Status</td>
                      <td className="border-l border-white border-opacity-50 p-2">Investasi</td>
                      <td className="border-l border-white border-opacity-50 p-2">Dipakai</td>
                      <td className="border-l border-white border-opacity-50 p-2">Dijual</td>
                      <td className="border-l border-white border-opacity-50 p-2">Satuan</td>
                      <td className="border-l border-white border-opacity-50 p-2">Nilai per tahun</td>
                      <td width="60" className="border-l border-white border-opacity-50 p-2 pr-3">Action</td>
                    </tr>
                    {resdata?.pendapatanPertanian.map(({produk, luas, status, investasi, dipakai, dijual, satuan, nilaiPerTahun}, index) => (
                    <tr key={`${produk}-${index}`} className="hover:bg-gray-50 border-b border-gray-100">
                      <td className="p-2 pl-3">{index +1}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{produk}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{luas}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{status}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{investasi}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{dipakai}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{dijual}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{satuan}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{decimal(nilaiPerTahun)}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2 px-3">

                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>


              </div>
            </div>
          </div>

          {/* pendapatan menyewakan tanah */}
          <div className="bg-white text-sm text-gray-700">
            <div className="p-6 antialiased">
              <h3 className="font-bold mb-2">
                Pendapatan Dari Menyewakan Tanah
              </h3>
              <div className="">
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="bg-gray-200 bg-opacity-75 border-b border-gray-200">
                      <td width="30" className="p-2 px-3">#</td>
                      <td className="border-l border-white border-opacity-50 p-2">Luas</td>
                      <td className="border-l border-white border-opacity-50 p-2">Peruntukan</td>
                      <td className="border-l border-white border-opacity-50 p-2">Hasil per tahun</td>
                      <td width="60" className="border-l border-white border-opacity-50 p-2 pr-3">Action</td>
                    </tr>
                    {resdata?.pendapatanMenyewakanTanah.map(({luas, untuk, nilaiPerTahun}, index) => (
                    <tr key={`${untuk}-${index}`} className="hover:bg-gray-50 border-b border-gray-100">
                      <td className="p-2 pl-3">{index +1}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{luas}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{untuk}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{decimal(nilaiPerTahun)}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2 px-3">

                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>


              </div>
            </div>
          </div>

          {/* pendapatan bagi hasil */}
          <div className="bg-white text-sm text-gray-700">
            <div className="p-6 antialiased">
              <h3 className="font-bold mb-2">
                Pendapatan Dari Bagi Hasil Pertanian
              </h3>
              <div className="">
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="bg-gray-200 bg-opacity-75 border-b border-gray-200">
                      <td width="30" className="p-2 px-3">#</td>
                      <td className="border-l border-white border-opacity-50 p-2">Luas</td>
                      <td className="border-l border-white border-opacity-50 p-2">Produk</td>
                      <td className="border-l border-white border-opacity-50 p-2">Hasil per tahun</td>
                      <td width="60" className="border-l border-white border-opacity-50 p-2 pr-3">Action</td>
                    </tr>
                    {resdata?.pendapatanBagihasilPertanian.map(({luas, produk, nilaiPerTahun}, index) => (
                    <tr key={`${produk}-${index}`} className="hover:bg-gray-50 border-b border-gray-100">
                      <td className="p-2 pl-3">{index +1}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{luas}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{produk}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{decimal(nilaiPerTahun)}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2 px-3">

                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>


              </div>
            </div>
          </div>

          {/* pendapatan hasil hutan */}
          <div className="bg-white text-sm text-gray-700">
            <div className="p-6 antialiased">
              <h3 className="font-bold mb-2">
                Pendapatan Dari Hasil Hutan
              </h3>
              <div className="">
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="bg-gray-200 bg-opacity-75 border-b border-gray-200">
                      <td width="30" className="p-2 px-3">#</td>
                      <td className="border-l border-white border-opacity-50 p-2">Produk</td>
                      <td className="border-l border-white border-opacity-50 p-2">Dipakai</td>
                      <td className="border-l border-white border-opacity-50 p-2">Dijual</td>
                      <td className="border-l border-white border-opacity-50 p-2">Satuan</td>
                      <td className="border-l border-white border-opacity-50 p-2">Hasil per tahun</td>
                      <td width="60" className="border-l border-white border-opacity-50 p-2 pr-3">Action</td>
                    </tr>
                    {resdata?.pendapatanHasilHutan.map(({produk, satuan, dipakai, dijual, nilaiPerTahun}, index) => (
                    <tr key={`${produk}-${index}`} className="hover:bg-gray-50 border-b border-gray-100">
                      <td className="p-2 pl-3">{index +1}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{produk}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{dipakai}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{dijual}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{satuan}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{decimal(nilaiPerTahun)}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2 px-3">

                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>


              </div>
            </div>
          </div>

          {/* pendapatan ikan budidaya */}
          <div className="bg-white text-sm text-gray-700">
            <div className="p-6 antialiased">
              <h3 className="font-bold mb-2">
                Pendapatan Dari Budidaya Ikan
              </h3>
              <div className="">
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="bg-gray-200 bg-opacity-75 border-b border-gray-200">
                      <td width="30" className="p-2 px-3">#</td>
                      <td className="border-l border-white border-opacity-50 p-2">Jenis</td>
                      <td className="border-l border-white border-opacity-50 p-2">Dipakai</td>
                      <td className="border-l border-white border-opacity-50 p-2">Dijual</td>
                      <td className="border-l border-white border-opacity-50 p-2">Satuan</td>
                      <td className="border-l border-white border-opacity-50 p-2">Hasil per tahun</td>
                      <td width="60" className="border-l border-white border-opacity-50 p-2 pr-3">Action</td>
                    </tr>
                    {resdata?.pendapatanBudidayaIkan.map(({produk, satuan, dipakai, dijual, nilaiPerTahun}, index) => (
                    <tr key={`${produk}-${index}`} className="hover:bg-gray-50 border-b border-gray-100">
                      <td className="p-2 pl-3">{index +1}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{produk}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{dipakai}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{dijual}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{satuan}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{decimal(nilaiPerTahun)}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2 px-3">

                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>


              </div>
            </div>
          </div>

          {/* pendapatan ikan tangkap */}
          <div className="bg-white text-sm text-gray-700">
            <div className="p-6 antialiased">
              <h3 className="font-bold mb-2">
                Pendapatan Dari Perikanan Tangkap
              </h3>
              <div className="">
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="bg-gray-200 bg-opacity-75 border-b border-gray-200">
                      <td width="30" className="p-2 px-3">#</td>
                      <td className="border-l border-white border-opacity-50 p-2">Jenis</td>
                      <td className="border-l border-white border-opacity-50 p-2">Dipakai</td>
                      <td className="border-l border-white border-opacity-50 p-2">Dijual</td>
                      <td className="border-l border-white border-opacity-50 p-2">Satuan</td>
                      <td className="border-l border-white border-opacity-50 p-2">Hasil per tahun</td>
                      <td width="60" className="border-l border-white border-opacity-50 p-2 pr-3">Action</td>
                    </tr>
                    {resdata?.pendapatanIkanTangkapan.map(({produk, satuan, dipakai, dijual, nilaiPerTahun}, index) => (
                    <tr key={`${produk}-${index}`} className="hover:bg-gray-50 border-b border-gray-100">
                      <td className="p-2 pl-3">{index +1}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{produk}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{dipakai}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{dijual}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{satuan}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{decimal(nilaiPerTahun)}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2 px-3">

                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>


              </div>
            </div>
          </div>

          {/* penyakit */}
          <div className="bg-white text-sm text-gray-700">
            <div className="p-6 antialiased">
              <h3 className="font-bold mb-2">
                Kejadian Serangan Penyakit Setahun Terakhir
              </h3>
              <div className="">
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="bg-gray-200 bg-opacity-75 border-b border-gray-200">
                      <td width="35" className="p-2 px-3">#</td>
                      <td className="border-l border-white border-opacity-50 p-2">Nama</td>
                      <td className="border-l border-white border-opacity-50 p-2">Umur</td>
                      <td className="border-l border-white border-opacity-50 p-2">Penyakit</td>
                      <td className="border-l border-white border-opacity-50 p-2">Kategori</td>
                      <td className="border-l border-white border-opacity-50 p-2">Keterangan</td>
                      <td width="60" className="border-l border-white border-opacity-50 p-2 pr-3">Action</td>
                    </tr>
                    {resdata?.kejadianPenyakit.map(({nama, umur, penyakit, kategori, keterangan}, index) => (
                    <tr key={`${nama}-${index}`} className="hover:bg-gray-50 border-b border-gray-100">
                      <td className="p-2 pl-3">{index +1}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{nama}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{umur}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{penyakit}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{kategori}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{keterangan}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2 px-3">

                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>


              </div>
            </div>
          </div>

          {/* putus sekolah */}

          <div className="mx-6 my-6">
            <table>
              <tbody>
                <tr className="border-b border-t">
                  <td width="350" className="py-2"><label className="capslabel font-bold text-gray-600">Jumlah anggota yang memiliki kartu BPJS</label></td>
                  <td width="70" className="py-2">
                    <Input disabled={true} width="w-10" numeric={false} model={resdata} setter={setResdata} path={['bpjs']} style="light"/>
                  </td>
                </tr>
                <tr className="border-b">
                  <td width="350" className="py-2"><label className="capslabel font-bold text-gray-600">Kepemilikan Kartu KKS/KIP/KIS</label></td>
                  <td width="70" className="py-2">
                    <Select disabled={true} options={options.optKipKis} model={resdata} setter={setResdata} path={['kip']} style="light"/>
                  </td>
                </tr>
                <tr className="border-b">
                  <td width="350" className="py-2"><label className="capslabel font-bold text-gray-600">Kemudahan mengakses layanan kesehatan</label></td>
                  <td width="70" className="py-2">
                    <Select disabled={true} options={options.optKemudahan} model={resdata} setter={setResdata} path={['aksesKesehatan']} style="light"/>
                  </td>
                </tr>
                <tr className="border-b">
                  <td width="350" className="py-2"><label className="capslabel font-bold text-gray-600">Bagimana layanan kesehatan di desa/kecamatan?</label></td>
                  <td width="70" className="py-2">
                    <Select disabled={true} options={options.optKebaikan} model={resdata} setter={setResdata} path={['layananKesehatan']} style="light"/>
                  </td>
                </tr>
                <tr className="border-b"><td colSpan="2" className="h-16">&nbsp;</td></tr>
                <tr className="border-b">
                  <td width="350" className="py-2"><label className="capslabel font-bold text-gray-600">Kebiasaan berobat bila sakit berat</label></td>
                  <td width="70" className="py-2">
                    <Select disabled={true} options={options.optBerobat} model={resdata} setter={setResdata} path={['sakitBerat']} style="light"/>
                  </td>
                </tr>
                <tr className="border-b">
                  <td width="350" className="py-2"><label className="capslabel font-bold text-gray-600">Kebiasaan berobat bila sakit ringan</label></td>
                  <td width="70" className="py-2">
                    <Select disabled={true} options={options.optBerobat} model={resdata} setter={setResdata} path={['sakitRingan']} style="light"/>
                  </td>
                </tr>
                <tr className="border-b">
                  <td width="350" className="py-2"><label className="capslabel font-bold text-gray-600">Kebiasaan menjalani persalinan</label></td>
                  <td width="70" className="py-2">
                    <Select disabled={true} options={options.optBerobat} model={resdata} setter={setResdata} path={['bersalin']} style="light"/>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* putus sekolah */}
          <div className="bg-white text-sm text-gray-700">
            <div className="p-6 antialiased">
              <h3 className="font-bold mb-2">
                Keberadaan Anak Putus Sekolah
              </h3>
              <div className="">
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="bg-gray-200 bg-opacity-75 border-b border-gray-200">
                      <td width="30" className="p-2 px-3">#</td>
                      <td className="border-l border-white border-opacity-50 p-2">Nama</td>
                      <td className="border-l border-white border-opacity-50 p-2">Umur</td>
                      <td className="border-l border-white border-opacity-50 p-2">Sebab/keterangan</td>
                      <td width="60" className="border-l border-white border-opacity-50 p-2 pr-3">Action</td>
                    </tr>
                    {resdata?.putusSekolah.map(({nama, umur, keterangan}, index) => (
                    <tr key={`${nama}-${index}`} className="hover:bg-gray-50 border-b border-gray-100">
                      <td className="p-2 pl-3">{index +1}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{nama}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{umur}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{keterangan}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2 px-3">

                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>


                {getDaftarNamaUsiaSekolah().length == 0 && <p className="mt-3 text-xs text-gray-400">Tidak ada anggota keluarga dengan kategori usia sekolah.</p>}

              </div>
            </div>
          </div>

          {/* program sosial */}
          <div className="bg-white text-sm text-gray-700">
            <div className="p-6 antialiased">
              <h3 className="font-bold mb-2">
                Program Sosial dan Pelatihan Yang Pernah Didapatkan
              </h3>
              <div className="">
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="bg-gray-200 bg-opacity-75 border-b border-gray-200">
                      <td width="30" className="p-2 px-3">#</td>
                      <td width="60" className="border-l border-white border-opacity-50 p-2">Tahun</td>
                      <td width="100" className="border-l border-white border-opacity-50 p-2">Kategori</td>
                      <td className="border-l border-white border-opacity-50 p-2">Nama program</td>
                      <td width="60" className="border-l border-white border-opacity-50 p-2 pr-3">Action</td>
                    </tr>
                    {resdata?.programSosial.map(({tahun, kategori, program}, index) => (
                    <tr key={`${kategori}-${index}`} className="hover:bg-gray-50 border-b border-gray-100">
                      <td className="p-2 pl-3">{index +1}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{tahun}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{kategori}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2">{program}</td>
                      <td className="border-l border-gray-100 border-opacity-75 p-2 px-3">

                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>


              </div>
            </div>
          </div>

          {/* Listrik */}
          <div className="bg-white text-sm text-gray-700">
            <div className="p-6 antialiased">
              <h3 className="font-bold mb-2">
                Listrik dan Penerangan
              </h3>
              <table>
                <tbody>
                  {/* <tr className="border-b">
                    <td width="110"><label className="capslabel font-bold text-gray-500">Jenis</label></td>
                    <td width="70"><label className="capslabel font-bold  text-gray-500">Nilai</label></td>
                    <td width="300"><label className="capslabel font-bold text-gray-500">Keterangan</label></td>
                  </tr> */}
                  <tr>
                    <td width="160" className="pt-2 pr-4"><label className="capslabel text-gray-500">Sumber utama</label></td>
                    <td className="pt-2 pb-1">
                      <Select disabled={true} options={options.optSumberListrik} model={resdata} setter={setResdata} path={['sumberListrik']} style="light"/>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4"><label className="capslabel text-gray-500">Daya terpasang</label></td>
                    <td className="pt-2 pb-1">
                      <Select disabled={true} options={options.optDayaListrik} model={resdata} setter={setResdata} path={['dayaListrik']} style="light"/>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4"><label className="capslabel text-gray-500">Frekuensi gangguan</label></td>
                    <td className="pt-2 pb-1">
                      <Select disabled={true} options={options.optGangguanListrik} model={resdata} setter={setResdata} path={['frekuensiGangguan']} style="light"/>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4"><label className="capslabel text-gray-500">Persepsi gangguan</label></td>
                    <td className="pt-2 pb-1">
                      <Select disabled={true} options={options.optPersepsiListrik} model={resdata} setter={setResdata} path={['persepsiGangguan']} style="light"/>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Sumber air */}
          <div className="bg-white text-sm text-gray-700">
            <div className="p-6 antialiased">
              <h3 className="font-bold mb-2">
                Listrik dan Penerangan
              </h3>
              <table>
                <tbody>
                  <tr className="border-b">
                    <td width="160"><label className="capslabel font-bold text-gray-500">Peruntukan</label></td>
                    <td width="150"><label className="capslabel font-bold  text-gray-500">Sumber utama</label></td>
                    <td width="50"><label className="capslabel font-bold text-gray-500">Jarak (meter)</label></td>
                  </tr>
                  <tr>
                    <td className="pt-2 pr-4"><label className="capslabel text-gray-500">Untuk minum</label></td>
                    <td className="pt-2 pb-1">
                      <Select disabled={true} options={options.optSumberAir} model={resdata} setter={setResdata} path={['sumberAirMinum']} style="light"/>
                    </td>
                    <td className="pt-2 pb-1 pl-3">
                      <Input width="w-20" disabled={true} numeric={true} model={resdata} setter={setResdata} path={['jarakAirMinum']} style="light"/>
                    </td>
                  </tr>
                  <tr>
                    <td className="pt-2 pr-4"><label className="capslabel text-gray-500">Untuk masak</label></td>
                    <td className="pt-2 pb-1">
                      <Select disabled={true} options={options.optSumberAir} model={resdata} setter={setResdata} path={['sumberAirMasak']} style="light"/>
                    </td>
                    <td className="pt-2 pb-1 pl-3">
                      <Input width="w-20" disabled={true} numeric={true} model={resdata} setter={setResdata} path={['jarakAirMasak']} style="light"/>
                    </td>
                  </tr>
                  <tr>
                    <td className="pt-2 pr-4"><label className="capslabel text-gray-500">Untuk mandi</label></td>
                    <td className="pt-2 pb-1">
                      <Select disabled={true} options={options.optSumberAir} model={resdata} setter={setResdata} path={['sumberAirMandi']} style="light"/>
                    </td>
                    <td className="pt-2 pb-1 pl-3">
                      <Input width="w-20" disabled={true} numeric={true} model={resdata} setter={setResdata} path={['jarakAirMandi']} style="light"/>
                    </td>
                  </tr>
                  <tr>
                    <td className="pt-2 pr-4"><label className="capslabel text-gray-500">Untuk cuci</label></td>
                    <td className="pt-2 pb-1">
                      <Select disabled={true} options={options.optSumberAir} model={resdata} setter={setResdata} path={['sumberAirCuci']} style="light"/>
                    </td>
                    <td className="pt-2 pb-1 pl-3">
                      <Input width="w-20" disabled={true} numeric={true} model={resdata} setter={setResdata} path={['jarakAirCuci']} style="light"/>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Sanitasi */}
          <div className="bg-white text-sm text-gray-700">
            <div className="p-6 antialiased">
              <h3 className="font-bold mb-2">
                Sanitasi Rumah Tangga
              </h3>
              <table>
                <tbody>
                  {/* <tr className="border-b">
                    <td width="110"><label className="capslabel font-bold text-gray-500">Jenis</label></td>
                    <td width="70"><label className="capslabel font-bold  text-gray-500">Nilai</label></td>
                    <td width="300"><label className="capslabel font-bold text-gray-500">Keterangan</label></td>
                  </tr> */}
                  <tr>
                    <td className="whitespace-nowrap pt-2 pr-4"><label className="capslabel text-gray-500">Masalah Utama Pemenuhan Air 6 bulan terakhir</label></td>
                    <td className="pt-2 pb-1">
                      <Select disabled={true} options={options.optMasalahAir} model={resdata} setter={setResdata} path={['masalahAir']} style="light"/>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4"><label className="capslabel text-gray-500">Tempat kebiasaan keluarga Buang Air Besar</label></td>
                    <td className="pt-2 pb-1">
                      <Select disabled={true} options={options.optBAB} model={resdata} setter={setResdata} path={['tempatBAB']} style="light"/>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4"><label className="capslabel text-gray-500">Di mana Limbah Tinja keluarga dibuang</label></td>
                    <td className="pt-2 pb-1">
                      <Select disabled={true} options={options.optTinja} model={resdata} setter={setResdata} path={['tempatTinja']} style="light"/>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4"><label className="capslabel text-gray-500">Di mana limbah cair keluarga dibuang</label></td>
                    <td className="pt-2 pb-1">
                      <Select disabled={true} options={options.optLimbahCair} model={resdata} setter={setResdata} path={['limbahCair']} style="light"/>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4"><label className="capslabel text-gray-500">Kebiasaan pengelolaan sampah rumah tangga</label></td>
                    <td className="pt-2 pb-1">
                      <Select disabled={true} options={options.optSampah} model={resdata} setter={setResdata} path={['pengelolaanSampah']} style="light"/>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* rumah sehat */}
          <div className="bg-white text-sm text-gray-700">
            <div className="p-6 antialiased">
              <h3 className="font-bold mb-2">
                Observasi Rumah Sehat
              </h3>
              <table>
                <tbody>
                  <tr>
                    <td className="whitespace-nowrap pt-2 pr-4">
                      <label className="capslabel text-gray-500">Langit-langit</label>
                    </td>
                    <td className="pt-2 pb-1">
                      <Select disabled={true} options={options.optOvsLangit} model={resdata} setter={setResdata} path={['obsPlafon']} style="light"/>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap pt-2 pr-4">
                      <label className="capslabel text-gray-500">Dinding</label>
                    </td>
                    <td className="pt-2 pb-1">
                      <Select disabled={true} options={options.optOvsDinding} model={resdata} setter={setResdata} path={['obsDinding']} style="light"/>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap pt-2 pr-4">
                      <label className="capslabel text-gray-500">Lantai</label>
                    </td>
                    <td className="pt-2 pb-1">
                      <Select disabled={true} options={options.optOvsLantai} model={resdata} setter={setResdata} path={['obsLantai']} style="light"/>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap pt-2 pr-4">
                      <label className="capslabel text-gray-500">Jendela kamar tidur</label>
                    </td>
                    <td className="pt-2 pb-1">
                      <Select disabled={true} options={options.optOvsJendelaKamarTidur} model={resdata} setter={setResdata} path={['obsJendelaKamarTidur']} style="light"/>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap pt-2 pr-4">
                      <label className="capslabel text-gray-500">Jendela ruang keluarga</label>
                    </td>
                    <td className="pt-2 pb-1">
                      <Select disabled={true} options={options.optOvsJendelaRuangKeluarga} model={resdata} setter={setResdata} path={['obsJendelaRuangKeluarga']} style="light"/>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap pt-2 pr-4">
                      <label className="capslabel text-gray-500">Ventilasi</label>
                    </td>
                    <td className="pt-2 pb-1">
                      <Select disabled={true} options={options.optOvsVentilasi} model={resdata} setter={setResdata} path={['obsVentilasi']} style="light"/>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap pt-2 pr-4">
                      <label className="capslabel text-gray-500">Pencahayaan</label>
                    </td>
                    <td className="pt-2 pb-1">
                      <Select disabled={true} options={options.optOvsPencahayaan} model={resdata} setter={setResdata} path={['obsCahaya']} style="light"/>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap pt-2 pr-4">
                      <label className="capslabel text-gray-500">Pembuangan asap dapur</label>
                    </td>
                    <td className="pt-2 pb-1">
                      <Select disabled={true} options={options.optOvsAsapDapur} model={resdata} setter={setResdata} path={['obsAsapDapur']} style="light"/>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap pt-2 pr-4">
                      <label className="capslabel text-gray-500">Kepadatan penghuni</label>
                    </td>
                    <td className="pt-2 pb-1">
                      <Select disabled={true} options={options.optOvsKepadatan} model={resdata} setter={setResdata} path={['obsKepadatan']} style="light"/>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* persepsi */}
          <div className="bg-white text-sm text-gray-700">
            <div className="p-6 antialiased">
              <h3 className="font-bold mb-2">
                Sikap dan Persepsi
              </h3>

              <p className="text-xs mt-4"><span className="border-b pb-1">Apakah Saudara sudah mengetahui rencana pembangunan PLTA Mentarang?</span></p>
              <div className="ml-10 mt-1 p-2 pb-0 border-l">
                <p className="mb-2"><Select disabled={true} options={options.optKonsen} model={resdata} setter={setResdata} path={['psKonsen']} style="yellow"/></p>
                <p><Input width="w-4/5" disabled={true} numeric={false} model={resdata} setter={setResdata} path={['psKonsenInfo']} style="light"/></p>
              </div>

              <p className="text-xs mt-4"><span className="border-b pb-1">Bagaimana pengaruh proyek terhadap perekonomian lokal?</span></p>
              <div className="ml-10 mt-1 p-2 pb-0 border-l">
                <p className="mb-2"><Select disabled={true} options={options.optEkonomiLokal} model={resdata} setter={setResdata} path={['psEkonomiLokal']} style="yellow"/></p>
                <p><Input width="w-4/5" disabled={true} numeric={false} model={resdata} setter={setResdata} path={['psEkonomiLokalInfo']} style="light"/></p>
              </div>

              <p className="text-xs mt-4"><span className="border-b pb-1">Bagaimana pengaruh proyek terhadap lapangan pekerjaan lokal?</span></p>
              <div className="ml-10 mt-1 p-2 pb-0 border-l">
                <p className="mb-2"><Select disabled={true} options={options.optLapanganKerja} model={resdata} setter={setResdata} path={['psLapanganKerja']} style="yellow"/></p>
                <p><Input width="w-4/5" disabled={true} numeric={false} model={resdata} setter={setResdata} path={['psLapanganKerjaInfo']} style="light"/></p>
              </div>

              <p className="text-xs mt-4"><span className="border-b pb-1">Bagaimana pengaruh proyek terhadap lingkungan (air, tanah, udara)?</span></p>
              <div className="ml-10 mt-1 p-2 pb-0 border-l">
                <p className="mb-2"><Select disabled={true} options={options.optPsLingkungan} model={resdata} setter={setResdata} path={['psLingkungan']} style="yellow"/></p>
                <p><Input width="w-4/5" disabled={true} numeric={false} model={resdata} setter={setResdata} path={['psLingkunganInfo']} style="light"/></p>
              </div>

              <p className="text-xs mt-4"><span className="border-b pb-1">Bagaimana pengaruh proyek terhadap kesehatan masyarakat?</span></p>
              <div className="ml-10 mt-1 p-2 pb-0 border-l">
                <p className="mb-2"><Select disabled={true} options={options.optKesmas} model={resdata} setter={setResdata} path={['psKesmas']} style="yellow"/></p>
                <p><Input width="w-4/5" disabled={true} numeric={false} model={resdata} setter={setResdata} path={['psKesmasInfo']} style="light"/></p>
              </div>

              <p className="text-xs mt-4"><span className="border-b pb-1">Bagaimana pengaruh proyek terhadap kepekaan sosial (misalnya dengan adanya tenaga kerja dari luar daerah)?</span></p>
              <div className="ml-10 mt-1 p-2 pb-0 border-l">
                <p className="mb-2"><Select disabled={true} options={options.optKepekaan} model={resdata} setter={setResdata} path={['psKepekaan']} style="yellow"/></p>
                <p><Input width="w-4/5" disabled={true} numeric={false} model={resdata} setter={setResdata} path={['psKepekaanInfo']} style="light"/></p>
              </div>

              <p className="text-xs mt-4"><span className="border-b pb-1">Bagaimana pengaruh proyek terhadap infrastruktur masyarakat lokal (misalnya jalan, fasilitas kesehatan, sekolah)?</span></p>
              <div className="ml-10 mt-1 p-2 pb-0 border-l">
                <p className="mb-2"><Select disabled={true} options={options.optInfrastruktur} model={resdata} setter={setResdata} path={['psInfrastruktur']} style="yellow"/></p>
                <p><Input width="w-4/5" disabled={true} numeric={false} model={resdata} setter={setResdata} path={['psInfrastrukturInfo']} style="light"/></p>
              </div>

              <p className="text-xs mt-4"><span className="border-b pb-1">Apakah adat istiadat masih dijalankan oleh masyarakat di desa ini?</span></p>
              <div className="ml-10 mt-1 p-2 pb-0 border-l">
                <p className="mb-2"><Select disabled={true} options={options.optAdat} model={resdata} setter={setResdata} path={['psAdat']} style="yellow"/></p>
                <p><Input width="w-4/5" disabled={true} numeric={false} model={resdata} setter={setResdata} path={['psAdatInfo']} style="light"/></p>
              </div>

              <p className="text-xs mt-4"><span className="border-b pb-1">Apakah kegiatan kerjasama / gotong royong dan pertemuan masyarakat masih dijalankan di desa ini?</span></p>
              <div className="ml-10 mt-1 p-2 pb-0 border-l">
                <p className="mb-2"><Select disabled={true} options={options.optGotongRoyong} model={resdata} setter={setResdata} path={['psGotongRoyong']} style="yellow"/></p>
                <p><Input width="w-4/5" disabled={true} numeric={false} model={resdata} setter={setResdata} path={['psGotongRoyongInfo']} style="light"/></p>
              </div>

              <p className="text-xs mt-4"><span className="border-b pb-1">Bagaimana sikap bapak/ibu terhadap Rencana PLTA Mentarang di Kabupaten Malinau?</span></p>
              <div className="ml-10 mt-1 p-2 pb-0 border-l">
                <p className="mb-2"><Select disabled={true} options={options.optSikap} model={resdata} setter={setResdata} path={['psSikap']} style="yellow"/></p>
                <p><Input width="w-4/5" disabled={true} numeric={false} model={resdata} setter={setResdata} path={['psSikapInfo']} style="light"/></p>
              </div>
            </div>
          </div>

          {/* larap */}
          <div className="bg-white text-sm text-gray-700">
            <div className="p-6 antialiased">
              <h3 className="font-bold mb-2">
                Pembebasan Lahan dan Relokasi
              </h3>

              <p className="text-xs mt-4"><span className="border-b pb-1">Jika dilakukan pembebasan lahan, kemanakah Saudara ingin direlokasi?</span></p>
              <div className="ml-10 mt-1 p-2 pb-0 border-l">
                <p className="mb-2"><Select disabled={true} options={options.optPrefRelokasi} model={resdata} setter={setResdata} path={['keinginanRelokasi']} style="yellow"/></p>
                <p><Input width="w-4/5" disabled={true} numeric={false} model={resdata} setter={setResdata} path={['keinginanRelokasiInfo']} style="light"/></p>
              </div>

              <p className="text-xs mt-4"><span className="border-b pb-1">Bentuk bantuan relokasi dan transportasi yang dibutuhkan?</span></p>
              <div className="ml-10 mt-1 p-2 pb-0 border-l">
                <p className="mb-2"><Select disabled={true} options={options.optRelokasi} model={resdata} setter={setResdata} path={['bantuanRelokasi']} style="yellow"/></p>
                <p><Input width="w-4/5" disabled={true} numeric={false} model={resdata} setter={setResdata} path={['bantuanRelokasiInfo']} style="light"/></p>
              </div>

              <p className="text-xs mt-4"><span className="border-b pb-1">Jika direlokasi, apakah Anda kehilangan pendapatan?</span></p>
              <div className="ml-10 mt-1 p-2 pb-0 border-l">
                <p className="mb-2"><Select disabled={true} options={options.optYaTidak} model={resdata} setter={setResdata} path={['terdampakRelokasi']} style="yellow"/></p>
                <p><Input width="w-4/5" disabled={true} numeric={false} model={resdata} setter={setResdata} path={['terdampakRelokasiInfo']} style="light"/></p>
              </div>

              <p className="text-xs mt-4"><span className="border-b pb-1">Pelatihan atau bantuan yang diharapkan terkait dengan kehilangan pendapatan</span></p>
              <div className="ml-10 mt-1 p-2 pb-0 border-l">
                <p className="mb-2"><Input width="w-4/5" disabled={true} numeric={false} model={resdata} setter={setResdata} path={['bantuanHilangPendapatan', 0]} style="light"/></p>
                <p className="mb-2"><Input width="w-4/5" disabled={true} numeric={false} model={resdata} setter={setResdata} path={['bantuanHilangPendapatan', 1]} style="light"/></p>
                <p className="mb-2"><Input width="w-4/5" disabled={true} numeric={false} model={resdata} setter={setResdata} path={['bantuanHilangPendapatan', 2]} style="light"/></p>
                <p className="mb-2"><Input width="w-4/5" disabled={true} numeric={false} model={resdata} setter={setResdata} path={['bantuanHilangPendapatan', 3]} style="light"/></p>
              </div>
            </div>
          </div>

          <div className="h-24"></div>
          <div className="h-96 bg-gradient-to-t from-indigo-200"></div>


          {/* <pre className="p-10 text-xs">
          {activeForm}<br/>
          {JSON.stringify(resdata.bantuanHilangPendapatan, null, 2)}<br/>
          {JSON.stringify(resdata?.tanaman, null, 2)}<br/>
          </pre> */}
       </div>
     </div>
    </>
  )
}

export default Responden