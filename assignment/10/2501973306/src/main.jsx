import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
// import './index.css'
import App from './App.jsx'
import Login from './auth/Login.jsx'
import Register from './auth/Register.jsx'
import UserProfile from './auth/UserProfile.jsx'
import AdminDashboard from './auth/AdminDashboard.jsx'

// Determine which page to render based on file path
const path = window.location.pathname.split('/').pop() || 'index.html'

const pages = {
  'index.html': <App />,
  '': <App />,
  'login.html': <Login />,
  'register.html': <Register />,
  'userProfile.html': <UserProfile />,
  'adminDashboard.html': <AdminDashboard />
}

const rootEl = document.getElementById('root')
createRoot(rootEl).render(pages[path] || <App />)
