'use client'

import { useEffect, useState } from 'react'

export default function DetailsPage() {
  const [advice, setAdvice] = useState('')

  useEffect(() => {
    fetch('https://api.adviceslip.com/advice')
      .then(res => res.json())
      .then(data => setAdvice(data.slip.advice))
  }, [])

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Life Advice 💡</h2>
      {advice ? <p>{advice}</p> : <p>Loading advice...</p>}
    </div>
  )
}
