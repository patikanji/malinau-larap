import '../styles/index.css'
import Head from 'next/head'
const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Larap Mentarang</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
