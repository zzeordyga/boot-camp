"use client"

import { useRouter } from "next/navigation"
import Link from "next/link";

export default function MainPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col gap-15 items-center justify-center text-center p-5">
      <div className="flex items-center justify-center gap-20">
        <img src="next.svg" className="max-w-64 h-auto" />
        <img src="firebase.svg" className="max-w-64 h-auto" />
      </div>
      <div className="w-full max-w-2xl bg-gray-200 shadow-md rounded-lg px-20 py-7">
        <h1 className="text-3xl font-bold mb-3">Firebase Authentication Demo</h1>
        <h2 className="text-2xl font-semibold mb-7">Auth Assignment</h2>
        <div className="flex items-center gap-5 justify-center">
          <Link href="/login" className="bg-blue-300 rounded-full px-6 py-2 text-xl">Login</Link>
          <Link href="/register" className="bg-blue-300 rounded-full px-6 py-2 text-xl">Register</Link>
        </div>
      </div>
    </div>
  )
}