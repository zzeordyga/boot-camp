"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";

function MyPage() {
  const [count, setCount] = useState(0);
  const buttonRef = useRef(null);
  useEffect(() => {
    console.log("Count: ", count);
  }, [count]);

  const doubleCount = useMemo(() => count * 2, [count]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Berliana Angelica Hutajulu - 2501997281</h1>
      <p>
        Computer Science is the study of how computers work and how we can use
        them to solve problems.
      </p>
      <input placeholder="Input..." />
      <p>Double Count : {doubleCount}</p>
      <button ref={buttonRef} onClick={() => setCount(count + 1)}>
        Click {count} times
      </button>
    </div>
  );
}

export default MyPage;
