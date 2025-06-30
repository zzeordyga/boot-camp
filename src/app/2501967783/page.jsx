'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react';

const MyPage = () => {
  const [clickCount, setClickCount] = useState(0);
  const nameRef = useRef(null);

  useEffect(() => {
    console.log("Komponen dimuat");
    if (nameRef.current) {
      nameRef.current.style.color = "blue";
    }
  }, []);

  const doubled = useMemo(() => clickCount * 2, [clickCount]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1 ref={nameRef}>Yoko Hermanto - 2501967783</h1>
      <p>Saya mahasiswa program studi Computer Science.</p>
      
      <p>Jumlah klik: {clickCount}</p>
      <p>Hasil dikali dua (useMemo): {doubled}</p>
      
      <button onClick={() => setClickCount(prev => prev + 1)}>
        Tambah Klik
      </button>
    </div>
  );
};

export default MyPage;
