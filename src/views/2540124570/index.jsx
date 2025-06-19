import React from 'react'
import { useState, useEffect, useMemo } from 'react'

const MyPage = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `Clicked ${count} times`
  }, [count])

  const doubled = useMemo(() => count * 2, [count])

  return (
    <div>
      <h1 className="font-bold text-xl">Devani Marcellina Calista - 2540124570</h1>
      <p>Fresh Graduate Computer Science from Binus University</p>
      <p>Click count: {count}</p>
      <p>Doubled count (via useMemo): {doubled}</p>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
    </div>
  );
};

export default MyPage
