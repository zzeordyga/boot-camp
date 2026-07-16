'use client' // Error boundaries must be Client Components
 
import { ceil } from 'firebase/firestore/pipelines'
import { useEffect } from 'react'
 
export default function Error({ error, unstable_retry }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div style={{textAlign: 'center', margin: '20vh 0 auto 0'}}>
      <h2 style={{margin: '20px 0'}}>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by re-fetching and re-rendering the segment
          () => unstable_retry()
        }
      >
        Try again
      </button>
    </div>
  )
}