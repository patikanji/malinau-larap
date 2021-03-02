import electron from 'electron'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import peribahasa from '../lib/peribahasa'

const ipcRenderer = electron.ipcRenderer || false

const Onboarding = () => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!ready()) return

    const arg = {
      name: name,
      password: password
    }

    if (ipcRenderer) {
      const response = ipcRenderer.sendSync('create-user', arg)
      setUser(response)
      console.log('Response:', response)
      document.getElementById('password').value = ''
    } else {
      console.log('Can\'t submit')
    }

  }

  const handleLogin = (e) => {
    e.preventDefault()

    if (ipcRenderer) {
      const response = ipcRenderer.sendSync('verify-password', password)
      if (response) {
        router.push('/home')
      } else {
        setMessage(getMessage())
      }
    }
  }

  function getMessage() {
    const m = peribahasa[Math.floor(Math.random() * peribahasa.length)]
    return new Date().getTime() + ' - ' + m
  }

  function ready() {
    if (user) return true
    return name.trim().length > 4 && password.trim().length > 5
  }

  const btnText = user ? 'Siap menggunakan aplikasi' : 'Simpan nama dan password saya'

  return (
    <>
      <Head>
        <title>Larap Mentarang</title>
      </Head>
      <div className="flex items-center min-h-screen bg-gray-600 shadow-lg max-w-5xl mx-auto antialiased">
        <div className="w-4/6 mx-auto text-gray-400">
          <div className="w-full rounded-lg shadow-lg border border-gray-400 border-opacity-50 px-8 pt-6 pb-4">
            <p className="text-sm font-bolds uppercase text-gray-800 opacity-75">
              Aplikasi Pencatatan Data
            </p>
            <p className={`text-3xl font-light mb-4 ` + (user ? 'text-blue-300' : '')}>Larap Mentarang</p>
            {!user && <p className="bg-gray-700 -mx-8 px-8 py-3 text-sm mb-6">
              <span className="text-gray-500">Masukkan nama lengkap Anda dan buatlah password minimal enam karakter.</span>
            </p>}
            {(user && !message) && <p className="bg-gray-700 -mx-8 px-8 py-3 text-sm mb-6 text-gray-300 opacity-75">
              <span className="text-yellow-300">Nama dan password tersimpan.</span> Silakan gunakan password Anda untuk masuk.
            </p>}
            {(message) && <p className="bg-gray-700 -mx-8 px-8 py-3 text-sm mb-6 text-gray-300 opacity-75">
              <span className="text-yellow-400">{message}</span>
            </p>}
            <form onSubmit={user ? handleLogin : handleSubmit }>
              <div className="flex flex-row items-center mb-4">
                <div className="w-36 text-right">
                  Nama Lengkap:
                </div>
                <div className="flex-grow pl-6">
                  <input type="text" disabled={user}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-gray-700 text-gray-300 bg-opacity-25 border-b border-transparent hover:border-gray-500 focus:border-gray-400 focus:text-white px-2 py-2 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-row items-center mb-8">
                <div className="w-36 text-right">
                  Password:
                </div>
                <div className="flex-grow pl-6">
                  <input type="text" id="password"
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-gray-700 text-gray-300 bg-opacity-25 border-b border-transparent hover:border-gray-500 focus:border-gray-400 focus:text-white px-2 py-2 focus:outline-none"
                  />
                </div>
              </div>
              <div className="mb-6">
                <div className="mb-3">
                  {!ready() && <button disabled className="w-full font-bold rounded border border-gray-500 text-gray-500 opacity-50 py-3"
                  >{btnText}</button>}
                  {ready() && <button className="w-full font-bold rounded border border-gray-500 border-opacity-50 hover:shadow hover:border-gray-400 focus:bg-gray-700  focus:outline-none py-3"
                  >{btnText}</button>}
                </div>
              </div>
            </form>
          </div>
          <p className="mt-6 text-xs text-gray-700 text-center font-bold">ICSD 2021</p>
          {/* <pre className="mt-8 text-xs">
            name:{name}   password:{password}     ready:{ready() ? 'yes' : 'no'}
          </pre> */}
        </div>
      </div>
    </>
  )
}

export default Onboarding