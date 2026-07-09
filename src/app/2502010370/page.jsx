'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

function App() {
  const [clicks, setClicks] = useState(0);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  // useEffect to focus input on load
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // useMemo to compute length of input
  const inputLength = useMemo(() => {
    return input.length;
  }, [input]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h1>Nicholas Theodore – 2502010370</h1>
      <p>Studying computer science and video editing is my passion</p>

      <hr />

      <div style={{ marginTop: '1rem' }}>
        <label htmlFor="input">Type something: </label>
        <input
          ref={inputRef}
          id="input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ padding: '0.5rem', marginLeft: '0.5rem' }}
        />
        <p>You typed: <strong>{input}</strong></p>
        <p>Input length (computed using useMemo): {inputLength} characters</p>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => setClicks(clicks + 1)} style={{ padding: '0.5rem 1rem' }}>
          Click Me!
        </button>
        <p>You've clicked the button {clicks} times.</p>
      </div>
    </div>
  )
}

export default App;