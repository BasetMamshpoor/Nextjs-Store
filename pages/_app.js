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
import { useRouter } from "next/router"
import Head from "next/head"
import AuthorizationProvider from "providers/AuthorizationProvider"

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`
// axios.defaults.baseURL = 'http://localhost:6500'
// axios.defaults.baseURL = 'http://192.168.1.105:8000/api'


export default function App({ Component, pageProps }) {
  const isMatch = useMediaQuery('(max-width: 1023.98px)')
  const router = useRouter()
  const authRoutes = ['login', 'password', 'verify']
  const isLogin = authRoutes.find(r => `/auth/${r}` === router.pathname) ? true : false

  return (
    <>
      <FunctionsProvider>
        <CategoriesProvider>
          <AuthorizationProvider>
            <CartContextProvider>
              <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
              </Head>
              {!isLogin && (isMatch ? <MobileNavbar /> : <Navbar />)}
              <NextNProgress />
              <Component {...pageProps} />
              {!isLogin && <Footer />}
              <div id="modal-container"></div>
            </CartContextProvider>
          </AuthorizationProvider>
        </CategoriesProvider>
      </FunctionsProvider>
    </>
  )
}
