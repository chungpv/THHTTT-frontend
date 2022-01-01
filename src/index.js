import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App/App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import configStore, { history } from './redux/configStore'
import { ConnectedRouter } from 'connected-react-router'


const store = configStore()

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
                <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
)

reportWebVitals()
