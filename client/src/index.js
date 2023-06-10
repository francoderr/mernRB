import React from 'react'
import ReactDOM from 'react-dom'
import { store } from './store/store'
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import './index.css'

import App from './App'

let persistor = persistStore(store);

ReactDOM.render(
    <React.Fragment>
        <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
        </ReduxProvider>
    </React.Fragment>,
    document.getElementById('root')
)