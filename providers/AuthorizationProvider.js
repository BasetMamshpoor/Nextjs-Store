import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import { Functions } from './FunctionsProvider';


export const Authorization = createContext()

const AuthorizationProvider = ({ children }) => {
    const [tokens, setTokens] = useState(() => Cookies.get('token') ? JSON.parse(Cookies.get('token')) : null)
    const [user, setUser] = useState({})
    const { SwalStyled } = useContext(Functions)
    const router = useRouter()

    const getUserInformation = async (token) => {
        const data = await axios.get('/profile/information',
            { headers: { Authorization: `${token.token_type} ${token.access_token}` } })
            .then(({ data }) => {
                setUser(data.data)
                return data.data
            })
            .catch((err) => {
                console.log(err);
                SwalStyled.fire('پیدا نشد', 'اطلاعات کاربر پیدا نشد', 'error')
            })
        return data
    }

    useEffect(() => {
        if (tokens) getUserInformation(tokens)
    }, [tokens])



    const getTokens = async (data) => {
        Cookies.set('token', JSON.stringify(data), { expires: 366 })
        setTokens(data)
        getUserInformation(data)
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
        getTokens,
        getUserInformation
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