'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react';

const styles = {
  page: {
    position: 'fixed',
    inset: 0,
    width: '100vw',
    height: '100vh',
    boxSizing: 'border-box',
    overflow: 'hidden',
    background: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    fontFamily: 'system-ui, sans-serif',
    color: '#1f2937',
  },
  card: {
    width: '100%',
    maxWidth: '480px',
    background: '#ffffff',
    borderRadius: '12px',
    padding: '32px',
    boxSizing: 'border-box',
  },
  title: { margin: 0, fontSize: '24px' },
  nim: { margin: '4px 0 16px', color: '#6b7280', fontSize: '14px' },
  bio: { lineHeight: 1.6, margin: '0 0 24px' },
  divider: { border: 0, borderTop: '1px solid #e5e7eb', margin: '24px 0' },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
  },
  row: { display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' },
  button: {
    padding: '10px 16px',
    background: '#2563eb',
    color: '#ffffff',
    border: 0,
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  doubled: { margin: 0, color: '#4b5563' },
};

const MyPage = () => {
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);

  const doubled = useMemo(() => count * 2, [count]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Ishvara Pranidhana Lakshmana</h1>
        <p style={styles.nim}>2602181004 · Computer Science</p>
        <p style={styles.bio}>
          I am studying Computer Science, focusing on software development
          and web technologies.
        </p>

        <hr style={styles.divider} />

        <input ref={inputRef} placeholder="Type something..." style={styles.input} />
        <div style={styles.row}>
          <button style={styles.button} onClick={() => setCount(count + 1)}>
            Click {count} times
          </button>
          <p style={styles.doubled}>Doubled: {doubled}</p>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
