import React, { useState, useEffect, useRef, useMemo } from 'react';

const MyPage = () => {
 const [count, setCount] = useState(0);
  const inputRef = useRef();
  const doubled = useMemo(() => count * 2, [count]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div style={{ fontFamily: 'Arial', maxWidth: 400, margin: '2rem auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h1>Nuroyan Muhammad Senoadji - 2501977506</h1>
      <p>Computer Science</p>
      <input
        ref={inputRef}
        placeholder="Type something..."/>
      <button onClick={() => setCount(count + 1)}>
        Click {count} times
      </button>
      <p>Doubled: {doubled}</p>
    </div>
  );
};

export default MyPage;