'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react';

const MyPage = () => {
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    document.title = `Clicked ${count} times`;
  }, [count]);

  const doubledCount = useMemo(() => count * 2, [count]);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Raditya Tamam - 2502049353</h1>
      <p>Mahasiswa Computer Science Binus yang sedang mengikuti Bootcamp Front-End</p>

      <div style={{ marginTop: '1.5rem' }}>
        <button onClick={() => setCount(count + 1)}>
          Klik ({count})
        </button>
        <p>Nilai yang dikali dua: {doubledCount}</p>

        <input
          ref={inputRef}
          placeholder="Klik tombol di samping biar fokus ke input ini"
          style={{ padding: '0.5rem',
              borderRadius: '5px',
              width: '200px',
              textAlign: 'center' }}
        />
        <button onClick={handleFocus} style={{ marginTop: '0.5rem' }}>
          Fokuskan ke Input
        </button>
      </div>
    </div>
  );
};

export default Index;
