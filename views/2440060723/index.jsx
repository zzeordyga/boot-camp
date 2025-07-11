import React, { useState, useEffect, useRef, useMemo } from 'react';

const MyPage = () => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  
  useEffect(() => {
    document.title = `Count is ${count}`;
  }, [count]);

  const doubleCount = useMemo(() => count * 2, [count]);

  return (
    <div ref={ref}>
      <h1>Raymond - 2440060723</h1>
      <p>I am studying Computer Science at Bina Nusantara University.</p>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <p>Double: {doubleCount}</p>
    </div>
  );
};

export default MyPage;
