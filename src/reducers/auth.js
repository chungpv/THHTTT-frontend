import {
    FETCH_AUTH,
    FETCH_AUTH_FAIL,
    FETCH_AUTH_SUCCESS,
    LOGIN,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    SIGNUP,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    REDIRECT_NOT_AUTH,
    REDIRECT_AUTH,
    REDIRECT_NOT_ADMIN,
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
} from "../constants/auth"
import toastNotif from '../helpers/toast'


const initState = {
    isAuth: false,
    token: null,
    username: null,
    role: null,
    error: null
}

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_AUTH: {
            return {
                ...state
            }
        }
        case FETCH_AUTH_SUCCESS: {
            const { token, username, role } = action.payload
            return {
                ...state,
                token,
                username,
                role,
                isAuth: true
            }
        }
        case FETCH_AUTH_FAIL: {
            const { error } = action.payload
            return {
                ...state,
                error,
                isAuth: false
            }
        }
        case LOGIN: {
            return {
                ...state
            }
        }
        case LOGIN_SUCCESS: {
            toastNotif("success", "Logged in successfully")
            const { token, username, role } = action.payload
            return {
                ...state,
                token,
                username,
                role,
                isAuth: true,
                error: null
            }
        }
        case LOGIN_FAIL: {
            const { error } = action.payload
            toastNotif("error", error)
            return {
                ...state,
                error,
                isAuth: false,
                token: null,
                username: null,
                role: null
            }
        }
        case SIGNUP: {
            return {
                ...state
            }
        }
        case SIGNUP_SUCCESS: {
            toastNotif("success", "Please login to access the system")
            const { username, role } = action.payload
            return {
                ...state,
                username,
                role
            }
        }
        case SIGNUP_FAIL: {
            const { error } = action.payload
            toastNotif("error", error)
            return {
                ...state,
                error
            }
        }
        case REDIRECT_NOT_AUTH:
        case REDIRECT_AUTH:
        case REDIRECT_NOT_ADMIN: {
            return state
        }
        case LOGOUT: {
            return {
                ...state
            }
        }
        case LOGOUT_SUCCESS: {
            toastNotif("success", "Logout successfully")
            return {
                ...state,
                isAuth: false,
                token: null,
                username: null,
                role: null,
                error: null
            }
        }
        case LOGOUT_FAIL: {
            const { error } = action.payload
            toastNotif("error", error)
            return {
                ...state,
                error
            }
        }
        default:
            return state
    }
}

export default AuthReducer
