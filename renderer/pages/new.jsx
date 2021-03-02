import electron from 'electron'
import { React, useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as options from '../lib/options'

const ipcRenderer = electron.ipcRenderer || false


const NewResponden = () => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [tanggal, setTanggal] = useState('')
  const [bulan, setBulan] = useState('')
  const [nama, setNama] = useState('')
  const [hubungan, setHubungan] = useState('')
  const [dusun, setDusun] = useState('')
  const [desa, setDesa] = useState('')
  const [kecamatan, setKecamatan] = useState('')

  useEffect(() => {
    if (ipcRenderer) {
      setUser( ipcRenderer.sendSync('get-user') )
    }

    return () => {}
  }, [])

  function isReady() {
    return (
      tanggal && bulan && nama.length > 3 && hubungan.length > 3 && dusun && desa
    )
  }

  const handleSubmit = (e) => {
    const data = {
      enumerator: user.name,
      tanggal: ['2021', bulan, tanggal].join('-'),
      nama: nama,
      hubungan: hubungan,
      dusun: dusun,
      desa: desa,
      kecamatan: kecamatan
    }
    if (ipcRenderer) {
      const response = ipcRenderer.sendSync('new-responden', data)
      if (response) router.push('/responden?id=' + response.id)
    }
  }

  return (
    <>
      <Head>
        <title>Form Sensus</title>
      </Head>

      <div className="relative pt-28 min-h-screen bg-gray-600 shadow-lg max-w-5xl mx-auto antialiased">

        {/* fixed header */}

        <div className="fixed w-full left-0 top-0 z-50">
          <div className="max-w-5xl mx-auto">
            {/* header */}
            <div className="bg-yellow-100 bg-opacity-25 text-sm text-gray-700">
              <div className="flex flex-row items-center bg-gray-800 px-6 pt-8 pb-4">
                <h1 className="flex-grow text-xl h-7 text-blue-400 font-bold">
                  New Responden
                </h1>
                <p className="text-blue-300 uppercase">
                  Larap Mentarang 2021
                </p>
              </div>
            </div>
            {/* ribbon */}
            <div className="shadow-lg bg-yellow-200 border-bs border-gray-400">
              <div className="flex flex-row items-center px-6 py-2">
                <p className="flex-grow">
                  <Link href="/home">
                    <a>👨🏽‍🚀 &nbsp; {user?.name}</a>
                  </Link>
                </p>
                <p className="text-xs font-mono">
                  {/*  */}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div id="content-wrap" className="fixed w-full left-0 bottom-0 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            {/*  */}
            <div className="text-sm text-gray-700 mt-10">
              <div className="px-20 py-4">
                <h3 className="text-white font-bold ml-1s mb-2">
                  Responden & Lokasi Wawancara
                </h3>
                <div className="rounded shadow-lg border border-white border-opacity-50 px-6 pt-6 pb-4">

                  <div className="flex flex-col mb-4">
                    <label className="capslabel text-gray-400">Tanggal wawancara</label>
                    <div className="flex flex-row">
                      <select
                        onChange={e => setTanggal(e.target.value)}
                        className="px-2 py-1 mr-1 border-l border-b border-transparent bg-gray-400 text-gray-800 hover:border-gray-300 focus:bg-gray-300 focus:border-white focus:outline-none">
                        <option></option>
                        {options.optTanggal.map(v => (
                          <option key={v} value={v}>{v}</option>
                        ))}
                      </select>
                      <select
                      onChange={e => setBulan(e.target.value)}
                      className="px-2 py-1 mr-1 border-l border-b border-transparent bg-gray-400 text-gray-800 hover:border-gray-300 focus:bg-gray-300 focus:border-white focus:outline-none">
                        <option></option>
                        {options.optBulan.map(([k, v]) => (
                          <option key={v} value={k}>{v}</option>
                        ))}
                      </select>
                      <input
                        disabled
                        type="text"
                        value="2021"
                        className="w-12 bg-gray-500 text-gray-800 px-2 py-1 border-b border-l border-transparent hover:border-gray-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-9 gap-4 mb-4">
                    <div className="col-span-4 flex flex-col">
                      <label className="capslabel text-gray-400">Nama lengkap responden</label>
                      <input
                          type="text"
                          onChange={e => setNama(e.target.value)}
                          className="w-full bg-gray-400 text-gray-800 px-2 py-1 border-b border-l border-transparent hover:border-gray-300 focus:bg-gray-300 focus:border-white focus:outline-none"
                        />
                    </div>
                    <div className="col-span-2 flex flex-col">
                      <label className="capslabel text-gray-400">Hubungan *</label>
                      <select
                        onChange={e => setHubungan(e.target.value)}
                        className="w-full px-2 py-1 mr-1 border-l border-b border-transparent bg-gray-400 text-gray-800 hover:border-gray-300 focus:bg-gray-300 focus:border-white focus:outline-none">
                        <option></option>
                        {options.optHubungan.map(([k, v]) => (
                          <option key={v} value={k}>{v}</option>
                        ))}
                      </select>
                    </div>
                    <p className="col-span-3 text-xs text-gray-200 pt-4">* Kolom Hubungan tidak bisa diubah setelah tersimpan.</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="flex flex-col">
                      <label className="capslabel text-gray-400">Dusun</label>
                      <input
                        type="text"
                        onChange={e => setDusun(e.target.value)}
                        className="w-full bg-gray-400 text-gray-800 px-2 py-1 border-b border-l border-transparent hover:border-gray-300 focus:bg-gray-300 focus:border-white focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="capslabel text-gray-400">Desa</label>
                      <input
                        type="text"
                        onChange={e => setDesa(e.target.value)}
                        className="w-full bg-gray-400 text-gray-800 px-2 py-1 border-b border-l border-transparent hover:border-gray-300 focus:bg-gray-300 focus:border-white focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="capslabel text-gray-400">Kecamatan</label>
                      <input
                        type="text"
                        onChange={e => setKecamatan(e.target.value)}
                        className="w-full bg-gray-400 text-gray-800 px-2 py-1 border-b border-l border-transparent hover:border-gray-300 focus:bg-gray-300 focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-5 -mx-6 px-6 pt-5 pb-1 border-t border-gray-400 text-center">
                    <button onClick={e => router.push('/home')}
                    className="border border-gray-400 text-gray-400 hover:shadow hover:bg-gray-400 hover:text-gray-600 focus:outline-none px-6 py-2"
                    >Cancel</button>

                    {!isReady() && <button disabled
                    className="border border-gray-500 text-gray-500 px-8 py-2 ml-4"
                    >Save</button>}

                    {isReady() && <button onClick={handleSubmit}
                    className="border border-gray-400 text-gray-400 hover:shadow hover:bg-gray-400 hover:text-gray-600 focus:outline-none px-8 py-2 ml-4"
                    >Save</button>}
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default NewResponden