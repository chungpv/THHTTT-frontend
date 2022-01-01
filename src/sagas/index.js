import { fork, all } from 'redux-saga/effects'
import authSaga from './auth'
import postSaga from './post'


function* rootSaga() {
    yield all([
        yield fork(authSaga),
        yield fork(postSaga)
    ])
}

export default rootSaga
