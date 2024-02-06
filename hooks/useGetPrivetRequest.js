import axios from 'axios';
import { Authorization } from 'providers/AuthorizationProvider';
import { Functions } from 'providers/FunctionsProvider';
import { useContext, useEffect, useState } from 'react';

const useGetRequest = (url, page = 1, obj) => {
    const [data, setData] = useState()
    const [paginations, setPaginations] = useState()
    const [reload, setReload] = useState(Math.random())
    const { token } = useContext(Authorization)
    const { SwalStyled } = useContext(Functions)

    useEffect(() => {
        const get = async () => {
            await axios.get(url, { params: { ...obj, page }, headers: { Authorization: `${token.token_type} ${token.access_token}` } })
                .then(res => {
                    const { data, ...pagination } = res.data
                    setData(res.data.data)
                    setPaginations(pagination)
                })
                .catch(err => SwalStyled.fire('ایراد در سرور', 'مشکلی به وجود آمده لطفا با پشتیبانی تماس بگیرید', 'error'))
        }
        get()
    }, [url, reload, page])

    return [data, setData, setReload, paginations, setPaginations]
};

export default useGetRequest;