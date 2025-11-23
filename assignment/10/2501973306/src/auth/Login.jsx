import React, { useState } from 'react'
import { loginUser } from './firebaseService'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await loginUser(email, password)
      // After login, redirect to user profile by default
      window.location.href = '/userProfile.html'
    } catch (err) {
      console.error(err)
      setError(err.message || 'Failed to login.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label><br/>
          <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label><br/>
          <input type="password" required value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <div style={{ marginTop: 10 }}>
          <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <p><a href="/register.html">Don't have an account? Register</a></p>
    </div>
  )
}
