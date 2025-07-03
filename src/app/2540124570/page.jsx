'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'

const MyPage = () => {
  const [posts, setPosts] = useState([])
  const [count, setCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const postsPerPage = 5

  useEffect(() => {
    document.title = `Clicked ${count} times`
  }, [count])

  const doubled = useMemo(() => count * 2, [count])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
  }, [])

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  const totalPages = Math.ceil(posts.length / postsPerPage)

  const getVisiblePageNumbers = () => {
    const maxVisible = 5
    let start = Math.max(currentPage - Math.floor(maxVisible / 2), 1)
    let end = start + maxVisible - 1
    if (end > totalPages) {
      end = totalPages
      start = Math.max(end - maxVisible + 1, 1)
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <p>Click count: {count}</p>
        <p>Doubled count (via useMemo): {doubled}</p>
        <button onClick={() => setCount(count + 1)} className="px-4 py-2 bg-blue-500 text-white rounded mt-2">Click Me</button>
      </div>

      <h2 className="text-lg font-semibold mb-2">Posts (Page {currentPage}):</h2>

      <table className="min-w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2 text-left">Title</th>
            <th className="border px-4 py-2 text-left">Body</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map(post => (
            <tr key={post.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{post.title}</td>
              <td className="border px-4 py-2">{post.body}</td>
              <td className="border px-4 py-2 text-center">
                <Link href={`/2540124570/details?id=${post.id}`}>
                  <button className="text-blue-600 underline">View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-center mt-6 gap-2 flex-wrap">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
        {getVisiblePageNumbers().map((num) => (
          <button
            key={num}
            onClick={() => goToPage(num)}
            className={`px-3 py-1 border rounded ${currentPage === num ? 'bg-blue-500 text-white' : ''}`}
          >
            {num}
          </button>
        ))}
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  )
}

export default MyPage
