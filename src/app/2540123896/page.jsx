'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react';

const MyPage = () => {
  const [count, setCount] = useState(0);
  const inputRef = useRef();
  const doubled = useMemo(() => count * 2, [count]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <h1>Bintang Satria Khanafi - 2540123896</h1>
      <p><strong>Computer Science - BINUS University</strong></p>
      <p>
        The Computer Science program at BINUS University equips students with a strong foundation
        in software engineering, data structures, algorithms, and problem-solving. It prepares us
        to build innovative technology solutions for real-world challenges.
      </p>
      <input ref={inputRef} placeholder="Type something..." />
      <button onClick={() => setCount(count + 1)}>
        Click {count} times
      </button>
      <p>Doubled: {doubled}</p>
    </div>
  );
};

export default MyPage;
