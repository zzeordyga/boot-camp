import React, { useState, useEffect, useRef, useMemo } from 'react';

const MyPage = () => {
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);
  const doubled = useMemo(() => count * 2, [count]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#2c3e50' }}>Howen Antonio - 2602123622</h1>
      <p style={{ fontSize: '1.1rem', color: '#34495e' }}>Computer Science</p>
      
      <div style={{ margin: '1.5rem 0' }}>
        <input
          ref={inputRef}
          placeholder="Type something..."
          style={{
            padding: '0.6rem',
            marginRight: '1rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '1rem'
          }}
        />
        <button
          onClick={() => setCount(prev => prev + 1)}
          style={{
            padding: '0.6rem 1.2rem',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Clicked {count} times
        </button>
      </div>

      <p style={{ fontSize: '1rem', color: '#7f8c8d' }}>
        Doubled count: <strong>{doubled}</strong>
      </p>
    </div>
  );
};

export default MyPage;
