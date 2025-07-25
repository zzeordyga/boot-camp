'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react';

const MyPage = () => {
  const name = "Michelle Valencia Nurdi";
  const nim = "2501959775";

  // useState
  const [clickCount, setClickCount] = useState(0);

  // useEffect 
  useEffect(() => {
    document.title = `Clicked ${clickCount} times`;
  }, [clickCount]);

  // useRef 
  const inputRef = useRef(null);
  const focusInput = () => {
    inputRef.current?.focus();
  };

  // useMemo
  const doubledClicks = useMemo(() => {
    return clickCount * 2;
  }, [clickCount]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>{name} - {nim}</h1>
      <p>
        I am a student of Computer Science specializing in Software Engineering.
        This page demonstrates my understanding of React fundamentals.
      </p>

      <hr style={{ margin: '20px 0' }} />

      <div>
        <button onClick={() => setClickCount(clickCount + 1)}>
          Click Me
        </button>
        <p>You clicked <strong>{clickCount}</strong> times.</p>
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

export default MyPage;
