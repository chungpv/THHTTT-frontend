import {
    actionChannel,
    call,
    delay,
    fork,
    put,
    select,
    take,
    takeLatest
} from "redux-saga/effects"
import {
    fetchAuthFail,
    fetchAuthSuccess,
    loginFail,
    loginSuccess,
    signupFail,
    signupSuccess
} from "../actions/auth"
import { fetchAuthAPI, loginAPI, signupAPI } from "../apis/auth"
import { getCookie, setCookie } from "../common/cookie"
import { ACCESS_TOKEN_NAME, STATUS_CODE } from "../constants"
import {
    LOGIN,
    REDIRECT_AUTH,
    REDIRECT_NOT_AUTH,
    REDIRECT_NOT_ADMIN,
    SIGNUP,
    FETCH_AUTH
} from "../constants/auth"
import _get from "lodash/get"
import _ from "lodash"
import { hideLoading, showLoading } from "../actions/ui"
import { push } from "connected-react-router"


function* fetchAuthAction() {
    while(true) {
        yield take(FETCH_AUTH)
        yield call(watchFetchAuthAction)
    }
}

function* watchFetchAuthAction() {
    try {
        const token = getCookie(ACCESS_TOKEN_NAME)
        if (token) {
            const response = yield call(fetchAuthAPI, token)
            const { status, data } = response
            if (status === STATUS_CODE.SUCCESS) {
                const { username, role } = data
                yield put(fetchAuthSuccess(token, username, role))
            } else {
                throw new Error("Cannot work. Try again")
            }
        }
    } catch (error) {
        let details = _get(error, "response.data", {})
        if (_.isEmpty(details)) {
            details = "Cannot work. Try again"
        }
        yield put(fetchAuthFail(details))
    }
}

function* watchRedirectNotAuth() {
    const redirectNotAuthChan = yield actionChannel(REDIRECT_NOT_AUTH)
    while (true) {
        yield take(redirectNotAuthChan)
        yield call(watchFetchAuthAction)
        const isAuth = yield select(state => state.Auth.isAuth)
        if (!isAuth) {
            yield put(push("/auth/login"))
        }
    }
}

function* watchRedirectAuth() {
    const redirectAuthChan = yield actionChannel(REDIRECT_AUTH)
    while (true) {
        yield take(redirectAuthChan)
        yield call(watchFetchAuthAction)
        const isAuth = yield select(state => state.Auth.isAuth)
        if (isAuth) {
            yield put(push("/"))
        }
    }
}

function* watchRedirectNotAdmin() {
    const redirectNotAdminChan = yield actionChannel(REDIRECT_NOT_ADMIN)
    while (true) {
        yield take(redirectNotAdminChan)
        yield call(watchFetchAuthAction)
        const { isAuth, role } = yield select(state => state.Auth)
        if (!isAuth) {
            yield put(push("/auth/login"))
        } else if (role !== "admin") {
            yield put(push("/"))
        }
    }
}

function* processLogin({ payload }) {
    yield put(showLoading())
    yield delay(800)
    try {
        const response = yield call(loginAPI, payload)
        const { status, data } = response
        if (status === STATUS_CODE.SUCCESS) {
            const { accessToken, username, role } = data
            setCookie(ACCESS_TOKEN_NAME, accessToken)
            yield put(loginSuccess(accessToken, username, role))
            yield put(push("/"))
        } else {
            throw new Error("Cannot work. Try again")
        }
    } catch (error) {
        let details = _get(error, "response.data", {})
        if (_.isEmpty(details)) {
            details = "Cannot work. Try again"
        }
        yield put(loginFail(details))
    } finally {
        yield delay(1000)
        yield put(hideLoading())
    }
}

function* processSignup({ payload }) {
    yield put(showLoading())
    yield delay(800)
    try {
        const response = yield call(signupAPI, payload)
        const { status, data } = response
        if (status === STATUS_CODE.SUCCESS) {
            const { username, role } = data
            yield put(signupSuccess(username, role))
            yield put(push("/auth/login"))
        } else {
            throw new Error("Cannot work. Try again")
        }
    } catch (error) {
        let details = _get(error, "response.data", {})
        if (_.isEmpty(details)) {
            details = "Cannot work. Try again"
        }
        yield put(signupFail(details))
    } finally {
        yield delay(1000)
        yield put(hideLoading())
    }
}

function* authSaga() {
    yield fork(fetchAuthAction)
    yield takeLatest(LOGIN, processLogin)
    yield takeLatest(SIGNUP, processSignup)
    yield fork(watchRedirectNotAuth)
    yield fork(watchRedirectAuth)
    yield fork(watchRedirectNotAdmin)
}

export default authSaga

export {
    watchFetchAuthAction
}
