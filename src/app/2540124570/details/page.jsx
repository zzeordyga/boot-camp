'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const DetailsPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [post, setPost] = useState(null)

  useEffect(() => {
    if (id) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(res => res.json())
        .then(data => setPost(data))
    }
  }, [id])

  if (!post) return <p>Loading...</p>

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Post Detail (ID: {id})</h2>

      <div className="p-4 border rounded mb-4">
        <h3 className="font-bold text-xl mb-2">{post.title}</h3>
        <p>{post.body}</p>
      </div>

      <Link href="/2540124570">
        <button className="text-blue-600 underline">← Back to Main</button>
      </Link>
    </div>
  )
}

export default DetailsPage
