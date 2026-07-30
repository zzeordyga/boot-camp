import React from 'react'

export default function FallbackUI({message, onRetry}) {
  return (
    <div style={{padding:'40px', textAlign:'center'}}>
        <h1>Error</h1>
        <p>{message}</p>
        <button onClick={onRetry}>Try Again</button>
    </div>
  )
}
