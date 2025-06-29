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
      <h1>Charles Yansen - 2501978843</h1>
      <p>Computer Science.</p>
      <input ref={inputRef} placeholder="Type something..." />
      <button onClick={() => setCount(count + 1)}>click {count} times</button>
      <p>Doubled: {doubled}</p>
    </div>
  );
};

export default MyPage;