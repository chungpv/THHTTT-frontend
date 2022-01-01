import {
    FETCH_AUTH,
    FETCH_AUTH_FAIL,
    FETCH_AUTH_SUCCESS,
    LOGIN,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REDIRECT_AUTH,
    REDIRECT_NOT_ADMIN,
    REDIRECT_NOT_AUTH,
    SIGNUP,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS
} from "../constants/auth"

const fetchAuth = () => {
    return {
        type: FETCH_AUTH
    }
}

const fetchAuthSuccess = (token, username, role) => {
    return {
        type: FETCH_AUTH_SUCCESS,
        payload: {
            token,
            username,
            role
        }
    }
}

const fetchAuthFail = error => {
    return {
        type: FETCH_AUTH_FAIL,
        payload: {
            error
        }
    }
}

const login = (username, password) => {
    return {
        type: LOGIN,
        payload: {
            username,
            password
        }
    }
}

const loginSuccess = (token, username, role) => {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            token,
            username,
            role
        }
    }
}

const loginFail = error => {
    return {
        type: LOGIN_FAIL,
        payload: {
            error
        }
    }
}

const signup = (username, email, password, passwordConfirmation) => {
    return {
        type: SIGNUP,
        payload: {
            username,
            email,
            password,
            passwordConfirmation
        }
    }
}

const signupSuccess = (username, role) => {
    return {
        type: SIGNUP_SUCCESS,
        payload: {
            username,
            role
        }
    }
}

const signupFail = error => {
    return {
        type: SIGNUP_FAIL,
        payload: {
            error
        }
    }
}

const redirectNotAuth = () => {
    return {
        type: REDIRECT_NOT_AUTH
    }
}

const redirectAuth = () => {
    return {
        type: REDIRECT_AUTH
    }
}

const redirectNotAdmin = () => {
    return {
        type: REDIRECT_NOT_ADMIN
    }
}

export {
    fetchAuth,
    fetchAuthSuccess,
    fetchAuthFail,
    login,
    loginSuccess,
    loginFail,
    signup,
    signupSuccess,
    signupFail,
    redirectNotAuth,
    redirectAuth,
    redirectNotAdmin
}
