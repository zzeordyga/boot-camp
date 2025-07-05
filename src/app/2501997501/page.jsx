'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react';

function MyComponent() {
  const name = "Trixie Theodora";
  const nim = "2501997501";

  // useState example
  const [clicks, setClicks] = useState(0);

  // useEffect example
  useEffect(() => {
    document.title = `Clicked ${clicks} times`;
  }, [clicks]);

  // useRef example
  const inputRef = useRef(null);
  const focusInput = () => {
    inputRef.current?.focus();
  };

  // useMemo example
  const doubledClicks = useMemo(() => {
    return clicks * 2;
  }, [clicks]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>{name} - {nim}</h1>
      <p>
        I am a student of Computer Science specializing in Interactive and User Experience Design.
        This page demonstrates my understanding of React fundamentals.
      </p>

      <hr style={{ margin: '20px 0' }} />

      <div>
        <button onClick={() => setClicks(clicks + 1)}>
          Click Me
        </button>
        <p>You clicked <strong>{clicks}</strong> times.</p>
        <p>Doubled value (useMemo): <strong>{doubledClicks}</strong></p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <input ref={inputRef} type="text" placeholder="Try focusing me" />
        <button onClick={focusInput} style={{ marginLeft: '10px' }}>
          Focus Input (useRef)
        </button>
      </div>
    </div>
  );
}

export default MyComponent;
