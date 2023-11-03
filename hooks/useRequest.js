import axios from 'axios';
import { useEffect, useState } from 'react';

const useRequest = (url) => {
    const [data, setData] = useState()
    const [paginations, setPaginations] = useState()

    useEffect(() => {
        const get = async () => {
            await axios.get(url)
                .then(res => {
                    const { data, ...pagination } = res.data
                    setData(res.data.data)
                    setPaginations(pagination)
                })
                .catch(err => console.log(err))
        }
        get()
    }, [url])

    return [data, setData, paginations]
};

export default useRequest;