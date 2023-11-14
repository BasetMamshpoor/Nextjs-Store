import decodeQueryData from 'Functions/decodeQueryData'
import axios from 'axios'

export const getProducts = async (categoryId, queries, page = 1) => {

    const data = await axios.get(`/products/filter/${categoryId}?${decodeQueryData(queries)}`, { params: { page } })
        .then(res => res.data)
        .catch(err => console.log(err))

    return data
}
