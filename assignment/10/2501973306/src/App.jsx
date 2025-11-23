import { useState } from 'react'
import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome — Assignment 10</h1>
      <p>This is the public home page. Use the links below:</p>
      <ul>
        <li><a href="/register.html">Register</a></li>
        <li><a href="/login.html">Login</a></li>
        <li><a href="/userProfile.html">User Profile (protected)</a></li>
        <li><a href="/adminDashboard.html">Admin Dashboard (admin only)</a></li>
      </ul>
    </div>
  )
}
