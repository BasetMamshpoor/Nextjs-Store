import axios from "axios"

export default postPrivateRequest = async (url, data, headers) => {
    const post = await axios.post(url, data, { headers })
        .then(res => res.data)
        .catch(err => {

        })
    return post;
}