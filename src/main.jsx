import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import 'locomotive-scroll/dist/locomotive-scroll.css'

import { HelmetProvider } from 'react-helmet-async'
import { LocalizationProvider } from './context/LocalizationContext.jsx'
import './i18n'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <LocalizationProvider>
        <App />
      </LocalizationProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
