import axios from 'axios'

export const getCategories = async () => {
    const { data } = await axios.get('/categories')
        .then(res => res.data)
        .catch(err => console.log(err))

    return data
}
