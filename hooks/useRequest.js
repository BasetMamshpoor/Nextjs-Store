import axios from 'axios';
import { useEffect, useState } from 'react';

const useRequest = (url, page = 1) => {
    const [data, setData] = useState()
    const [paginations, setPaginations] = useState()
    const [reload, setReload] = useState(Math.random())

    useEffect(() => {
        const get = async () => {
            await axios.get(url, { params: { page } })
                .then(res => {
                    const { data, ...pagination } = res.data
                    setData(res.data.data)
                    setPaginations(pagination)
                })
                .catch(err => console.log(err))
        }
        get()
    }, [url, reload, page])

    return [data, setData, setReload, paginations]
};

export default useRequest;