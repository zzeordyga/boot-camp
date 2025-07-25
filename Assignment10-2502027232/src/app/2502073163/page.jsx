'use client'
import React, { useState, useEffect, useRef, useMemo } from "react";

const MyPage = () => {
  const [count, setCount] = useState(0);
  const nameRef = useRef(null);

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.style.color = "purple";
    }
  }, []);

  const doubled = useMemo(() => count * 2, [count]);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 ref={nameRef}>Ethan Leonard Christopher - 2502073163</h1>
      <p>A Game Application & Technology student at BINUS.</p>

      <p>Count: {count}</p>
      <p>Doubled (via useMemo): {doubled}</p>
      <button onClick={() => setCount(count + 1)}>Add</button>
    </div>
  );
};

export default MyPage;
