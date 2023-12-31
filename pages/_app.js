import axios from "axios"
import Footer from "Components/Footer/Footer"
import Navbar from "Components/Navbar"
import CartContextProvider from "providers/CartContextProvider"
import 'styles/globals.css'
import NextNProgress from 'Components/Progress/index'
import useMediaQuery from "hooks/useMediaQuery"
import MobileNavbar from "Components/Navbar/MobileNavbar"
import FunctionsProvider from "providers/FunctionsProvider"
import CategoriesProvider from "providers/CategoriesProvider"

axios.defaults.baseURL = 'http://abm.me/api'
// axios.defaults.baseURL = 'http://localhost:6500'
// axios.defaults.baseURL = 'http://192.168.1.101:8000/api'


export default function App({ Component, pageProps }) {
  const isMatch = useMediaQuery('(max-width: 1023.98px)')
  return (
    <>
      <FunctionsProvider>
        <CategoriesProvider>
          <CartContextProvider>
            {isMatch ? <MobileNavbar /> : <Navbar />}
            <NextNProgress />
            <Component {...pageProps} />
            <Footer />
            <div id="modal-container"></div>
          </CartContextProvider>
        </CategoriesProvider>
      </FunctionsProvider>
    </>
  )
}
