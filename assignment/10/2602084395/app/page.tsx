import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-8 text-3xl font-bold">Session 10 Bootcamp</h1>
      <div className="flex space-x-4">
        <Link href="/login" className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
          Login
        </Link>
        <Link href="/register" className="rounded bg-green-600 px-6 py-2 text-white hover:bg-green-700">
          Register
        </Link>
      </div>
    </div>
  )
}