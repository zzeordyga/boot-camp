'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div
      style={{
        background: '#fff3f3',
        border: '1px solid #ffcccc',
        borderRadius: '8px',
        padding: '2rem',
        maxWidth: '400px',
        margin: '2rem auto',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(255,0,0,0.08)'
      }}
    >
      <h2 style={{ color: '#d32f2f', marginBottom: '1rem' }}>
        Something went wrong!
      </h2>
      <p style={{ color: '#b71c1c', marginBottom: '1.5rem' }}>
        {error?.message || 'An unexpected error occurred.'}
      </p>
      <button
        onClick={() => reset()}
        style={{
          background: '#d32f2f',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          padding: '0.5rem 1.5rem',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '1rem',
          transition: 'background 0.2s'
        }}
      >
        Try again
      </button>
    </div>
  )
}