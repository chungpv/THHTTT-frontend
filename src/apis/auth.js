import AxiosService from '../common/axiosService'
import { ACCESS_TOKEN_NAME, ENDPOINT } from '../constants/index'


const endpoint = `${ENDPOINT}/auth`
AxiosService.removeHeader(ACCESS_TOKEN_NAME)

const fetchAuthAPI = token => {
    AxiosService.setHeader(ACCESS_TOKEN_NAME, token)
    return AxiosService.post(`${endpoint}/current_user`)
}

const loginAPI = data => {
    return AxiosService.post(`${endpoint}/login`, data)
}

const signupAPI = data => {
    return AxiosService.post(`${endpoint}/register`, data)
}

export {
    fetchAuthAPI,
    loginAPI,
    signupAPI
}
