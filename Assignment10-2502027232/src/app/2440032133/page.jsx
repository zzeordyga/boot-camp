'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react';

const MyPage = () => {
  const [count, setCount] = useState(0);
  const inputRef = useRef();
  const doubled = useMemo(() => count * 2 , [count]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="p-6 font-sans">
      <h1 className="text-3xl font-bold mb-2">Jonathan Felim Jhon - 2440032133</h1>
      <p className="text-lg mb-4">
        Computer Science
      </p>
      <input ref={inputRef} placeholder="Type something..."/>
      <button onClick={() => setCount(count + 1)}>
        Click {count} times
      </button>
      <p>Doubled: {doubled}</p>
    </div>
  );
};

export default MyPage;
