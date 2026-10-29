"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import AdminGuard from "@/components/AdminGuard"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email || "")
      }
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    router.push("/login")
  }

  return (
    <AdminGuard>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4 text-white">
        <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-md">
          <h1 className="mb-4 text-center text-2xl font-bold text-purple-400">Admin Dashboard</h1>
          <p className="mb-6 text-center text-gray-300">Welcome, {userEmail}</p>
          <p className="mb-6 text-center text-sm text-gray-400">
            This area is restricted to admins only.
          </p>
          <button
            onClick={handleLogout}
            className="w-full rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </AdminGuard>
  )
}