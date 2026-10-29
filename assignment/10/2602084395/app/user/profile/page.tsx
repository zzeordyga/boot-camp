"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import AuthGuard from "@/components/AuthGuard"

export default function ProfilePage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState("")
  const [userRole, setUserRole] = useState("")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email || "")
        const userDoc = await getDoc(doc(db, "users", user.uid))
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role)
        }
      }
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    router.push("/login")
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-4 text-center text-2xl font-bold">User Profile</h1>
          <p className="mb-2 text-center text-gray-700">Email: {userEmail}</p>
          <p className="mb-6 text-center text-gray-700">Role: {userRole}</p>
          
          {userRole === "admin" && (
            <a
              href="/admin/dashboard"
              className="mb-4 block w-full rounded bg-purple-600 px-4 py-2 text-center text-white hover:bg-purple-700"
            >
              Go to Admin Dashboard
            </a>
          )}
          
          <button
            onClick={handleLogout}
            className="w-full rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </AuthGuard>
  )
}