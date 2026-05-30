import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Init EmailJS
if (window.emailjs) {
  window.emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
}

if (import.meta.env.VITE_MAINTENANCE_MODE === 'true') {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <div style={{ width: '100vw', height: '100vh', background: '#0a030c' }}></div>
  )
} else {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
