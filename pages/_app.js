import WordContextProvider from '../context/WordContext'
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <WordContextProvider>
      <Component {...pageProps} />
    </WordContextProvider>
  )
}

export default MyApp
