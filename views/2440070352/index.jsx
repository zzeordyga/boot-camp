import Layout from './layout'
import { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [fact, setFact] = useState('')
  const renderCount = useRef(0)

  useEffect(() => {
    fetch('https://catfact.ninja/fact')
      .then(res => res.json())
      .then(data => setFact(data.fact))
  }, [])

  renderCount.current += 1

  const factLength = useMemo(() => fact.length, [fact])

  return (
    <Layout>
      <p>Fact: {fact}</p>
      <p>Length: {factLength}</p>
      <p>Page rendered: {renderCount.current} times</p>
      <Link href="/2440070352/detail">Back to Detail</Link>
    </Layout>
  )
}