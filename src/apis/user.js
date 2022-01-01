import AxiosService from '../common/axiosService'
import { ACCESS_TOKEN_NAME, ENDPOINT } from '../constants/index'


const endpoint = `${ENDPOINT}/users`
AxiosService.removeHeader(ACCESS_TOKEN_NAME)

const fetchProfileAPI = username => {
    return AxiosService.get(`${endpoint}/${username}`)
}

export {
    fetchProfileAPI
}
