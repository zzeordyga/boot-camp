'use client'
import React from 'react';
import { useState, useEffect, useRef } from 'react';


export function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = useRef(count);

  useEffect(() => {
    prevCount.current = count;
    console.log("Current count: ", count);
  }, [count]);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);

  return (
    <div>
        <h1>2501992343-Vincent</h1>
        <h2>Studying Computer Science </h2>
      <h1>Counter: {count}</h1>
      <p>Previous count: {prevCount.current}</p>
      <button onClick={decrement}>Decrement (-)</button>
      <button onClick={increment}>Increment (+)</button>
    </div>
  );
}

export default Counter;
