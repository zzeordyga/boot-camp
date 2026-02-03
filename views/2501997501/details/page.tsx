
'use client'
import { useState, useRef } from 'react'

export default function DetailsPage() {
  const [advice, setAdvice] = useState('')
  const counter = useRef(0)

  const fetchAdvice = async () => {
    const res = await fetch('https://api.adviceslip.com/advice')
    const data = await res.json()
    setAdvice(data.slip.advice)
    counter.current++
  }

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
    }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#333' }}>
        🧠 Random Advice
      </h2>

      <button onClick={fetchAdvice} style={{
        padding: '0.5rem 1rem',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '1rem'
      }}>
        🎲 Dapatkan Nasihat
      </button>

      <p style={{
        fontStyle: 'italic',
        fontSize: '1.1rem',
        color: '#555',
        minHeight: '3rem'
      }}>
        {advice}
      </p>

      <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '1rem' }}>
        Kamu klik {counter.current}x
      </p>
    </div>
  )
}

