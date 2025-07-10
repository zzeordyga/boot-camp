'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [fact, setFact] = useState(null)
  const fetchCount = useRef(0)

  useEffect(() => {
    fetchFact()
  }, [])

  const fetchFact = async () => {
    const res = await fetch('https://catfact.ninja/fact')
    const data = await res.json()
    setFact(data.fact)
    fetchCount.current += 1
  }

  const wordCount = useMemo(() => {
    return fact ? fact.split(' ').length : 0
  }, [fact])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Random Cat Fact 🐱</h2>
      {fact ? (
        <p className="mb-2">{fact}</p>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
      <p className="text-sm text-gray-500 mb-4">
        Word Count: {wordCount} | API calls: {fetchCount.current}
      </p>
      <button
        onClick={fetchFact}
        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
      >
        Get New Fact
      </button>

      <div className="mt-6">
        <Link href="/views/2501995912/details" className="text-blue-500 underline">
          Go to Details Page →
        </Link>
      </div>
    </div>
  )
}
