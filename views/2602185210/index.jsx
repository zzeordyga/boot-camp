
import React, { useState, useEffect, useRef, useMemo } from 'react';

const MyPage = () => {
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);

  const doubled = useMemo(() => count * 2, [count]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div style={{
      maxWidth: '600px',
      margin: '50px auto',
      padding: '30px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      border: '1px solid #ddd',
      borderRadius: '12px'
    }}>
      <h1>Anton Wijaya Tjong - 2602185210</h1>

      <p>
        I am a Computer Science student interested in
        software development and web technologies.
      </p>

      <input
        ref={inputRef}
        type="text"
        placeholder="Type something..."
        style={{ padding: '10px', margin: '10px' }}
      />

      <div>
        <button onClick={() => setCount(count + 1)}>
          Click {count} times
        </button>
      </div>

      <p>Doubled: {doubled}</p>
    </div>
  );
};

export default MyPage;
