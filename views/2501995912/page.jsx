import { useState, useEffect, useRef } from 'react'

export default function MyPage() {
  const [clicks, setClicks] = useState(0)
  const [greeting, setGreeting] = useState('')
  const nameRef = useRef(null)

  useEffect(() => {
    setGreeting('Welcome to my React page!')
  }, [])

  const handleClick = () => {
    setClicks(clicks + 1)
    nameRef.current?.focus()
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Michael Surya – 2501995912</h1>
      <p>I am a Computer Science student with a strong interest in Front-End Web Development, currently learning modern frameworks like React.</p>

      <h2 style={{ marginTop: '1rem', color: '#007acc' }}>{greeting}</h2>

      <div style={{ marginTop: '1rem' }}>
        <input ref={nameRef} type="text" placeholder="Type your name..." />
      </div>

      <button
        onClick={handleClick}
        style={{
          marginTop: '1rem',
          padding: '10px 20px',
          backgroundColor: '#007acc',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Click Me!
      </button>

      <p>You clicked {clicks} times.</p>
    </div>
  )
}
