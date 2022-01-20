import AxiosService from '../common/axiosService'
import { ACCESS_TOKEN_NAME, ENDPOINT } from '../constants/index'


const endpoint = `${ENDPOINT}/posts`
AxiosService.removeHeader(ACCESS_TOKEN_NAME)

const fetchPosts = page => {
    return AxiosService.get(`${endpoint}?page=${page}`)
}

const fetchPostAPI = id => {
    return AxiosService.get(`${endpoint}/${id}`)
}

const fetchPostsReAPI = id => {
    return AxiosService.get(`${endpoint}/${id}/recommend`)
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
    fetchPostsReAPI,
    fetchPostEdittingAPI,
    updatePostAPI,
    deletePostAPI
}
