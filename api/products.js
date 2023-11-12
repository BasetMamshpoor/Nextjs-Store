import axios from 'axios'

export const getProducts = async (categoryId, page = 1) => {
    const data = await axios.get(`/products/filter/${categoryId}`, { params: { page } })
        .then(res => res.data)
        .catch(err => console.log(err))

    return data
}
