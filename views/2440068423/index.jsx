import React, { useState, useEffect, useRef, useMemo } from 'react';

const MyPage = () => {
  const [count, setCount] = useState(0);
  const inputRef = useRef();

  // useMemo to calculate doubled value
  const doubled = useMemo(() => count * 2, [count]);

  // Autofocus input when component mounts
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Pearla Zahra M. - 2440068423</h1>
      <p>Saya adalah mahasiswa program Computer Science di Universitas Bina Nusantara.</p>

      <input
        ref={inputRef}
        placeholder="Ketik sesuatu..."
        style={{ marginTop: '1rem', padding: '0.5rem', width: '100%' }}
      />

      <button
        onClick={() => setCount(count + 1)}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#4F46E5',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Klik {count} kali
      </button>

      <p style={{ marginTop: '1rem' }}>Nilai setelah dikali dua: {doubled}</p>
    </div>
  );
};

export default MyPage;
