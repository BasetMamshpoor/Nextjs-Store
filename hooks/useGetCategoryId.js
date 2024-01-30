import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const useGetCategoryId = () => {
    const router = useRouter()
    const { slug } = router.query
    const [category, setCategory] = useState()

    const getCategory = useCallback(async () => {
        await axios.get(`/categories/${slug}`)
            .then(res => {
                setCategory(res.data.data)
            })
            .catch(err => console.log(err))
    }, [slug])

    useEffect(() => {
        getCategory()
    }, [slug])

    return [category]
};

export default useGetCategoryId;