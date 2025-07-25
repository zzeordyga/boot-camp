'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react';

const Farah = () => {
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    console.log('Component mounted');
  }, []);

  const doubleCount = useMemo(() => count * 2, [count]);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Farah Putri Yusriyah</h1>
      <h2>NIM: 2502023511</h2>
      <p>Hello there! i am currently joining a front end developer bootcamp.</p>

      <hr />

      <h3>useState + useMemo Example</h3>
      <p>Count: {count}</p>
      <p>Double Count (useMemo): {doubleCount}</p>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>

      <h3>useRef Example</h3>
      <input ref={inputRef} placeholder="Click the button to focus me" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
};

export default Farah;
