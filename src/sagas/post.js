import {
    call,
    fork,
    put,
    take,
    delay,
    takeLatest,
    select,
    actionChannel
} from 'redux-saga/effects'
import {
    createPostFail,
    createPostSuccess,
    fetchPostEdittingFail,
    fetchPostFail,
    fetchPostsFail,
    fetchPostsSuccess,
    fetchPostSuccess,
    filterPostsSuccess,
    fetchPostEdittingSuccess,
    updatePostFail,
    updatePostSuccess,
    fetchProfileFail,
    fetchProfileSuccess,
    deletePostFail,
    deletePostSuccess,
    fetchPostsRe,
    fetchPostsReFail,
    fetchPostsReSuccess
} from '../actions/post'
import {
    fetchTagSuccess,
    fetchTagFail
} from '../actions/tag'
import { showLoading, hideLoading } from '../actions/ui'
import {
    createPostAPI,
    fetchPostAPI,
    fetchPosts,
    fetchPostEdittingAPI,
    updatePostAPI,
    deletePostAPI,
    fetchPostsReAPI
} from '../apis/post'
import { STATUS_CODE } from '../constants'
import {
    CREATE_POST,
    DELETE_POST,
    FETCH_POST,
    FETCH_POSTS,
    FETCH_POST_EDITTING,
    FETCH_POST_RE,
    FETCH_PROFILE,
    FILTER_POSTS,
    UPDATE_POST
} from '../constants/post'
import _get from "lodash/get"
import _ from "lodash"
import { push } from 'connected-react-router'
import { watchFetchAuthAction } from './auth'
import { fetchProfileAPI } from '../apis/user'
import { FETCH_TAG } from '../constants/tag'
import { fetchTagAPI } from '../apis/tag'


function* watchFetchPostsAction() {
    while (true) {
        yield take(FETCH_POSTS)
        yield delay(1000)
        try {
            const page = yield select(state => state.Post.page)
            const response = yield call(fetchPosts, page)
            const { data, status } = response
            if (status === STATUS_CODE.SUCCESS) {
                const { items } = data
                yield put(fetchPostsSuccess(items, page + 1))
            } else {
                yield put(fetchPostsFail("Cannot work. Try again"))
            }
        } catch (error) {
            yield put(fetchPostsFail("Cannot work. Try again"))
        }
    }
}

function* filterPosts({ payload }) {
    yield delay(800)
    const { keyword } = payload
    const posts = yield select(state => state.Post.posts)
    const filledPosts = posts.filter(p =>
        p.name.trim().toLowerCase().includes(keyword)
    )
    yield put(filterPostsSuccess(filledPosts))
}

function* processCreatePost({ payload }) {
    yield put(showLoading())
    yield delay(800)
    try {
        const token = yield select(state => state.Auth.token)
        const response = yield call(createPostAPI, payload, token)
        const { status } = response
        if (status === STATUS_CODE.SUCCESS) {
            yield put(createPostSuccess())
            yield put(push(`/posts/${response.data.id}`))
        } else {
            throw new Error("Cannot work. Try again")
        }
    } catch (error) {
        let details = _get(error, "response.data", {})
        if (_.isEmpty(details)) {
            details = "Cannot work. Try again"
        }
        yield put(createPostFail(details))
    } finally {
        yield delay(1000)
        yield put(hideLoading())
    }
}

function* watchSinglePost() {
    while (true) {
        const { payload } = yield take(FETCH_POST)
        yield put(showLoading())
        try {
            const { postId } = payload
            const response = yield call(fetchPostAPI, postId)
            const { data, status } = response
            if (status === STATUS_CODE.SUCCESS) {
                const { post, author } = data
                yield put(fetchPostSuccess(post, author))
            } else {
                throw new Error("Cannot work. Try again")
            }
        } catch (error) {
            let details = _get(error, "response.data", {})
            if (_.isEmpty(details)) {
                details = "Cannot work. Try again"
            }
            yield put(fetchPostFail(details))
            yield put(push("/"))
        } finally {
            yield delay(1000)
            yield put(hideLoading())
        }
    }
}

function* watchPostsRecommend() {
    while (true) {
        const { payload } = yield take(FETCH_POST_RE)
        yield delay(3000)
        try {
            const { postId } = payload
            const response = yield call(fetchPostsReAPI, postId)
            const { data, status } = response
            if (status === STATUS_CODE.SUCCESS) {
                const { items } = data
                yield put(fetchPostsReSuccess(items))
            } else {
                throw new Error("Cannot work. Try again")
            }
        } catch (error) {
            let details = _get(error, "response.data", {})
            if (_.isEmpty(details)) {
                details = "Cannot work. Try again"
            }
            yield put(fetchPostsReFail(details))
            yield put(push("/"))
        }
    }
}

function* watchPostEditting() {
    const fetchPostEditting = yield actionChannel(FETCH_POST_EDITTING)
    while (true) {
        const { payload } = yield take(fetchPostEditting)
        yield put(showLoading())
        yield delay(1000)
        yield call(watchFetchAuthAction)
        const token = yield select(state => state.Auth.token)
        if (!token) {
            yield put(push("/"))
        }
        try {
            const { postId } = payload
            const response = yield call(fetchPostEdittingAPI, postId, token)
            const { data, status } = response
            let { post, tags } = data
            post.tags = tags.map(tag => tag.content)
            const postEditting = post
            if (status === STATUS_CODE.SUCCESS) {
                yield put(fetchPostEdittingSuccess(postEditting))
            } else {
                throw new Error("Cannot work. Try again")
            }
        } catch (error) {
            let details = _get(error, "response.data", {})
            if (_.isEmpty(details)) {
                details = "Cannot work. Try again"
            }
            yield put(fetchPostEdittingFail(details))
            yield put(push("/"))
        } finally {
            yield delay(1000)
            yield put(hideLoading())
        }
    }
}

function* processUpdatePost({ payload }) {
    yield put(showLoading())
    yield delay(800)
    try {
        const token = yield select(state => state.Auth.token)
        const response = yield call(updatePostAPI, payload, token)
        const { status } = response
        if (status === STATUS_CODE.SUCCESS) {
            yield put(updatePostSuccess())
            yield put(push(`/posts/${response.data.id}`))
        } else {
            throw new Error("Cannot work. Try again")
        }
    } catch (error) {
        let details = _get(error, "response.data", {})
        if (_.isEmpty(details)) {
            details = "Cannot work. Try again"
        }
        yield put(updatePostFail(details))
    } finally {
        yield delay(1000)
        yield put(hideLoading())
    }
}

function* watchProfile() {
    while (true) {
        const { payload } = yield take(FETCH_PROFILE)
        yield delay(1000)
        try {
            const { username } = payload
            const response = yield call(fetchProfileAPI, username)
            const { status, data } = response
            if (status === STATUS_CODE.SUCCESS) {
                yield put(fetchProfileSuccess(data.posts, data.author))
            } else {
                throw new Error("Cannot work. Try again")
            }
        } catch (error) {
            let details = _get(error, "response.data", {})
            if (_.isEmpty(details)) {
                details = "Cannot work. Try again"
            }
            yield put(fetchProfileFail(details))
        }
    }
}

function* processDeletePost() {
    while (true) {
        const { payload } = yield take(DELETE_POST)
        try {
            const { postId } = payload
            const { token, username } = yield select(state => state.Auth)
            const response = yield call(deletePostAPI, postId, token)
            const { status } = response
            if (status === STATUS_CODE.SUCCESS) {
                yield put(deletePostSuccess())
                yield put(push(`/users/${username}`))
            } else {
                throw new Error("Cannot work. Try again")
            }
        } catch (error) {
            let details = _get(error, "response.data", {})
            if (_.isEmpty(details)) {
                details = "Cannot work. Try again"
            }
            yield put(deletePostFail(details))
        } finally {
            yield delay(1000)
            yield put(hideLoading())
        }
    }
}

function* watchFetchTagAction() {
    while (true) {
        const { payload } = yield take(FETCH_TAG)
        yield delay(1000)
        try {
            const { tagId } = payload
            const response = yield call(fetchTagAPI, tagId)
            const { status, data } = response
            if (status === STATUS_CODE.SUCCESS) {
                yield put(fetchTagSuccess(data.items))
            } else {
                throw new Error("Cannot work. Try again")
            }
        } catch (error) {
            let details = _get(error, "response.data", {})
            if (_.isEmpty(details)) {
                details = "Cannot work. Try again"
            }
            yield put(fetchTagFail(details))
        }
    }
}

function* postSaga() {
    yield fork(watchFetchPostsAction)
    yield takeLatest(FILTER_POSTS, filterPosts)
    yield takeLatest(CREATE_POST, processCreatePost)
    yield fork(watchSinglePost)
    yield fork(watchPostEditting)
    yield takeLatest(UPDATE_POST, processUpdatePost)
    yield fork(watchProfile)
    yield fork(processDeletePost)
    yield fork(watchFetchTagAction)
    yield fork(watchPostsRecommend)
}

export default postSaga
