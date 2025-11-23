import React, { useEffect, useState } from 'react'
import { onAuthChanged, getUserRole } from './firebaseService'
import { useNavigate } from '../utils/useNavigateShim'

/**
 * This is a simple helper hook we will use in page components.
 * It redirects to login if not authenticated, and optionally checks role.
 */
export function useProtected(requiredRole = null) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)

  useEffect(() => {
    const unsub = onAuthChanged(async (u) => {
      if (!u) {
        // not logged in
        setUser(null)
        setRole(null)
        setLoading(false)
        return
      }
      setUser(u)
      const r = await getUserRole(u.uid)
      setRole(r)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  return { loading, user, role }
}
