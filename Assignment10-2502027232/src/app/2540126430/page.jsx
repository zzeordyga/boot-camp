'use client'
import React, { useState, useMemo, useRef, useEffect } from 'react';

const MyPage = () => {
  const [count, setCount] = useState(0);
  const doubled = useMemo(() => count * 2, [count]);
  const boxRef = useRef(null);

  useEffect(() => {
    if (boxRef.current) {
      const original = boxRef.current.style.backgroundColor;
      boxRef.current.style.backgroundColor = '#e3f2fd';
      const timeout = setTimeout(() => {
        boxRef.current.style.backgroundColor = original;
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [count]);

  return (
    <div
      ref={boxRef}
      style={{
        maxWidth: 420,
        margin: '48px auto',
        padding: '32px 28px',
        borderRadius: 18,
        boxShadow: '0 4px 24px rgba(60,72,100,0.13)',
        background: 'linear-gradient(135deg, #f8fafc 60%, #e3f2fd 100%)',
        fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
        transition: 'background 0.3s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1 style={{
        color: '#1a237e',
        fontWeight: 700,
        fontSize: '1.7rem',
        marginBottom: 8,
        letterSpacing: 1,
        textAlign: 'center',
      }}>
        Valentinus Gilbert Sanjaya
        <span style={{
          display: 'block',
          fontWeight: 400,
          fontSize: '1rem',
          color: '#3949ab',
          marginTop: 2,
        }}>
          2540126430
        </span>
      </h1>
      <p style={{
        fontSize: '1.13em',
        color: '#374151',
        marginBottom: 24,
        textAlign: 'center',
      }}>
        Computer Science
      </p>
      <button
        onClick={() => setCount(count + 1)}
        style={{
          padding: '10px 28px',
          borderRadius: 8,
          border: 'none',
          background: 'linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)',
          color: '#fff',
          fontWeight: 600,
          fontSize: '1.08em',
          cursor: 'pointer',
          marginBottom: 18,
          boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)',
          transition: 'background 0.2s, transform 0.1s',
        }}
        onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(90deg, #1565c0 60%, #64b5f6 100%)'}
        onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)'}
        onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
        onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        Click {count} times
      </button>
      <p style={{
        color: '#1976d2',
        fontWeight: 500,
        fontSize: '1.1em',
        margin: 0,
      }}>
        Doubled: <b>{doubled}</b>
      </p>
    </div>
  );
};

export default MyPage;
