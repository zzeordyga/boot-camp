import React, { useState } from 'react'
import { registerUser } from './firebaseService'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    try {
      await registerUser(email, password, role)
      alert('Registration successful. Redirecting to login.')
      window.location.href = '/login.html'
    } catch (err) {
      console.error(err)
      setError(err.message || 'Failed to register.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label><br />
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label><br />
          <input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Role</label><br />
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </div>
        <div style={{ marginTop: 10 }}>
          <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
        </div>
        {error && <p style={{ color:'red' }}>{error}</p>}
      </form>
      <p><a href="/login.html">Already have an account? Login</a></p>
    </div>
  )
}
