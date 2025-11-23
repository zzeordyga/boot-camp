import React, { useEffect, useState } from 'react'
import { onAuthChanged, getUserRole, logoutUser } from './firebaseService'

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)

  useEffect(() => {
    const unsub = onAuthChanged(async (u) => {
      if (!u) {
        window.location.href = '/login.html'
        return
      }
      setUser(u)
      const r = await getUserRole(u.uid)
      setRole(r)
      if (r !== 'admin') {
        alert('Unauthorized: admin only')
        window.location.href = '/'
        return
      }
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
      <h2>Admin Dashboard</h2>
      <p>Welcome, admin {user.email}</p>

      <div style={{ marginTop: 10 }}>
        <button onClick={() => { window.location.href = '/' }}>Home</button>
        <button onClick={handleLogout} style={{ marginLeft: 10 }}>Logout</button>
      </div>

      <div style={{ marginTop: 20 }}>
        <p>This area is protected by role-checking both on the frontend and should be validated by Firestore Security Rules.</p>
      </div>
    </div>
  )
}
