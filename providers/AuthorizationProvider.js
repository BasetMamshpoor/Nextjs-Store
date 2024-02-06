import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { createContext, useState } from 'react';


export const Authorization = createContext()

const AuthorizationProvider = ({ children }) => {
    const [tokens, setTokens] = useState(() => Cookies.get('token') ? JSON.parse(Cookies.get('token')) : null)
    const [user, setUser] = useState(null)
    const router = useRouter()


    const getTokens = (data) => {
        Cookies.set('token', JSON.stringify(data), { expires: 366 })
        setTokens(data)
        setUser({})
        router.push('/profile')
    }

    const logOut = () => {
        setTokens(null)
        setUser(null)
        Cookies.remove('token')
        router.push('/')
    }

    const contextData = {
        tokens,
        user,
        logOut,
        getTokens
    }

    return (
        <>
            <Authorization.Provider value={contextData}>
                {children}
            </Authorization.Provider>
        </>
    );
};

export default AuthorizationProvider;