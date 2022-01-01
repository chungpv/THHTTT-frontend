import AxiosService from '../common/axiosService'
import { ACCESS_TOKEN_NAME, ENDPOINT } from '../constants/index'


const endpoint = `${ENDPOINT}/posts`
AxiosService.removeHeader(ACCESS_TOKEN_NAME)

const fetchPosts = () => {
    return AxiosService.get(endpoint)
}

const fetchPostAPI = id => {
    return AxiosService.get(`${endpoint}/${id}`)
}

const fetchPostEdittingAPI = (id, token) => {
    AxiosService.setHeader(ACCESS_TOKEN_NAME, token)
    return AxiosService.get(`${endpoint}/${id}/edit`)
}

const createPostAPI = (data, token) => {
    AxiosService.setHeader(ACCESS_TOKEN_NAME, token)
    return AxiosService.post(`${endpoint}/new`, data)
}

const updatePostAPI = ({ postId, ...remainData }, token) => {
    AxiosService.setHeader(ACCESS_TOKEN_NAME, token)
    return AxiosService.put(`${endpoint}/${postId}`, remainData)
}

const deletePostAPI = (postId, token) => {
    AxiosService.setHeader(ACCESS_TOKEN_NAME, token)
    return AxiosService.delete(`${endpoint}/${postId}`)
}

export {
    fetchPosts,
    createPostAPI,
    fetchPostAPI,
    fetchPostEdittingAPI,
    updatePostAPI,
    deletePostAPI
}
