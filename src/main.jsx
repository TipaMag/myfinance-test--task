import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'

import {Provider} from 'react-redux';
import {store} from './store/store';

import {HashRouter} from 'react-router-dom'
import {CssBaseline} from '@mui/material'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
)
