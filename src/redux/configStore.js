import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'


export const history = createBrowserHistory()

const composeEnhancers = typeof window === "object" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
    }) : compose

const sagaMiddleware = createSagaMiddleware()

const configStore = () => {
    const middlewares = [sagaMiddleware, routerMiddleware(history)]
    const enhancers = [applyMiddleware(...middlewares)]
    const store = createStore(
        rootReducer(history),
        composeEnhancers(...enhancers)
    )
    sagaMiddleware.run(rootSaga)
    return store
}

export default configStore
