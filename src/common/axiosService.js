import axios from "axios"
import { ACCESS_TOKEN_NAME } from "../constants"
import { setCookie } from "./cookie"

class AxiosService {
    constructor() {
        const instance = axios.create({
            headers: {}
        })
        instance.interceptors.response.use(this.handleSuccess, this.handleError)
        this.instance = instance
    }

    setHeader(name, value) {
        this.instance.defaults.headers.common[name] = value
    }

    removeHeader(name) {
        delete this.instance.defaults.headers.common[name]
    }

    handleSuccess(response) {
        return response
    }

    handleError(error) {
        switch (error.response.status) {
            case 400:
                console.log(error.response.data)
                // window.location.replace("/auth/login")
                setCookie(ACCESS_TOKEN_NAME, "")
                break
            default:
                return Promise.reject(error)
        }
    }

    get(url) {
        return this.instance.get(url)
    }

    post(endpoint, data) {
        return this.instance.request({
            method: "POST",
            url: endpoint,
            responseType: "json",
            data
        })
    }

    put(endpoint, data) {
        return this.instance.request({
            method: "PUT",
            url: endpoint,
            responseType: "json",
            data
        })
    }

    delete(endpoint, data) {
        return this.instance.request({
            method: "DELETE",
            url: endpoint,
            responseType: "json",
            data
        })
    }
}

export default new AxiosService()
