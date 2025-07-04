
'use client'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'

export default function MainPage() {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then((res) => res.json())
      .then((data) => setPosts(data))
  }, [])

  const postTitles = useMemo(() => posts.map((p) => p.title.toUpperCase()), [posts])

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{
        fontSize: '1.8rem',
        marginBottom: '1rem',
        color: '#333'
      }}>📄 Post List</h2>

      <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
        {postTitles.map((title, index) => (
          <li key={index} style={{ marginBottom: '0.5rem', lineHeight: '1.4' }}>
            {title}
          </li>
        ))}
      </ul>

      <Link href="/YOUR_NIM/details" passHref>
        <button style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          ➤ Lihat Detail
        </button>
      </Link>
    </div>
  )
}

