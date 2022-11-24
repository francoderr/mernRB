import React from 'react'
import ReactDOM from 'react-dom'
import { store } from './store/store'
import { Provider } from 'react-redux'

import './index.css'

import App from './App'

ReactDOM.render(
    <React.Fragment>
        <Provider store={store}>
            <App />
        </Provider>
    </React.Fragment>,
    document.getElementById('root')
)