import axios from "axios"
import Footer from "Components/Footer/Footer"
import Navbar from "Components/Navbar"
import CartContextProvider from "providers/CartContextProvider"
import 'styles/globals.css'
import NextNProgress from 'Components/Progress/index'

axios.defaults.baseURL = 'http://localhost:6500/'

export default function App({ Component, pageProps }) {
  return (
    <>
      <CartContextProvider>
        <Navbar />
        <NextNProgress />
        <Component {...pageProps} />
        <Footer />
      </CartContextProvider>
    </>
  )
}
