import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Init EmailJS
if (window.emailjs) {
  window.emailjs.init('Vgp1Tvu88MeOV6IdI')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
