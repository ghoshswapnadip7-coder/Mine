import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initEmailNotifications } from './lib/emailNotifications'

// Initialize EmailJS once (no-op when unavailable)
initEmailNotifications()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
