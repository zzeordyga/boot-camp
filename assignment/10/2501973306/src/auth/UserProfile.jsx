import React, { useEffect, useState } from 'react'
import { onAuthChanged, getUserRole, logoutUser } from './firebaseService'

export default function UserProfile() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)

  useEffect(() => {
    const unsub = onAuthChanged(async (u) => {
      if (!u) {
        // not logged in -> redirect to login
        window.location.href = '/login.html'
        return
      }
      setUser(u)
      const r = await getUserRole(u.uid)
      setRole(r)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const handleLogout = async () => {
    await logoutUser()
    window.location.href = '/login.html'
  }

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>

  return (
    <div style={{ padding: 20 }}>
      <h2>User Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>UID:</strong> {user.uid}</p>
      <p><strong>Role:</strong> {role}</p>

      <button onClick={() => { window.location.href = '/' }}>Home</button>
      <button onClick={handleLogout} style={{ marginLeft: 10 }}>Logout</button>

      {role === 'admin' && (
        <div style={{ marginTop: 20 }}>
          <a href="/adminDashboard.html">Go to Admin Dashboard</a>
        </div>
      )}
    </div>
  )
}
