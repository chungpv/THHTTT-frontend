import AxiosService from '../common/axiosService'
import { ACCESS_TOKEN_NAME, ENDPOINT } from '../constants/index'


const endpoint = `${ENDPOINT}/tags`
AxiosService.removeHeader(ACCESS_TOKEN_NAME)

const fetchTagAPI = tagId => {
    return AxiosService.get(`${endpoint}/${tagId}`)
}

export {
    fetchTagAPI
}
