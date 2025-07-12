'use client'
import { useState, useEffect, useRef } from 'react'
import { db } from './firebase'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import ErrorBoundary from './ErrorBoundary'

function PostsPageContent() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const inputRef = useRef()

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setPosts(data)
        setLoading(false)
      },
      (err) => {
        console.error("Gagal mengambil data:", err)
        setError("Terjadi kesalahan saat memuat data.")
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (error) {
    return <div className="text-red-600 text-center mt-10">{error}</div>
  }

  if (loading) {
    return <div className="text-center mt-10">Memuat data...</div>
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">📌 Daftar Postingan</h1>

      <input
        type="text"
        ref={inputRef}
        placeholder="Cari judul postingan..."
        className="w-full border px-4 py-2 mb-4 rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredPosts.length === 0 ? (
        <p className="text-center text-gray-500">Tidak ada hasil ditemukan.</p>
      ) : (
        <ul className="space-y-4">
          {filteredPosts.map(post => (
            <li key={post.id} className="p-4 border rounded bg-white shadow">
              <h2 className="font-semibold text-lg">{post.title}</h2>
              <p>{post.content}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(post.createdAt.seconds * 1000).toLocaleString('id-ID')}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// Wrap dengan ErrorBoundary
export default function PostsPage() {
  return (
    <ErrorBoundary>
      <PostsPageContent />
    </ErrorBoundary>
  )
}