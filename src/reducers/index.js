import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { connectRouter } from 'connected-react-router'
import Post from './post'
import Ui from './ui'
import Auth from './auth'


const rootReducer = history => combineReducers({
    Post,
    Ui,
    Auth,
    form: formReducer,
    router: connectRouter(history)
})

export default rootReducer
