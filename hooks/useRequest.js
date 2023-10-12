import axios from 'axios';
import { useEffect, useState } from 'react';

const useRequest = (url) => {
    const [data, setData] = useState()

    useEffect(() => {
        const get = async () => {
            await axios.get(url)
                .then(res => setData(res.data))
                .catch(err => console.log(err))
        }
        get()
    }, [url])

    return [data, setData]
};

export default useRequest;