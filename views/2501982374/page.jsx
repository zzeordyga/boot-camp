import React, { useState, useEffect, useRef, useMemo } from 'react';
import Layout from './layout';

const MyPage = () => {
  const [count, setCount] = useState(0);
  const inputRef = useRef();
  const doubled = useMemo(() => count * 2, [count]);
  const [advice, setAdvice] = useState('');

  useEffect(() => {
    inputRef.current.focus();
    fetch('https://api.adviceslip.com/advice')
      .then(res => res.json())
      .then(data => setAdvice(data.slip.advice));
  }, []);

  return (
    <Layout>
      <div style={{
        fontFamily: 'Arial',
        maxWidth: 400,
        margin: '2rem auto',
        padding: 20,
        border: '1px solid #ccc',
        borderRadius: 8,
        background: '#fff',
        boxShadow: '0 2px 8px #0001'
      }}>
        <h1>Sebastian Bintang - 2501982374</h1>
        <p>Computer Science</p>
        <input
          ref={inputRef}
          placeholder="Type something..."
          style={{ padding: 8, width: '100%', marginBottom: 12 }}
        />
        <button
          onClick={() => setCount(count + 1)}
          style={{ padding: '8px 16px', marginBottom: 12, display: 'block' }}>
          Click {count} times
        </button>
        <p>Doubled: {doubled}</p>
        <div style={{
          marginTop: 24,
          padding: 12,
          background: '#e0f7fa',
          borderRadius: 6,
          fontStyle: 'italic'
        }}>
          <b>Random Advice:</b> {advice || 'Loading...'}
        </div>
      </div>
    </Layout>
  );
};

export default MyPage;