import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import store from '../redux/store'

const history = createHistory()

ReactDOM.render(
<Provider store = {store}>
    <Router history={history}>
        <App />
    </Router>
</Provider>,
document.getElementById('app'))