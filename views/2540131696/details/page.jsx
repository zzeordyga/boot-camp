'use client';

import { useState, useEffect } from 'react';

export default function DetailPage() {
  const [advice, setAdvice] = useState('');

  useEffect(() => {
    fetch('https://api.adviceslip.com/advice')
      .then((res) => res.json())
      .then((data) => {
        setAdvice(data.slip.advice);
      });
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial', textAlign: 'center' }}>
      <h2>Random Advice Page</h2>
      <blockquote style={{ 
        margin: '2rem 0', 
        padding: '1.5rem', 
        backgroundColor: '#f9f9f9', 
        borderLeft: '5px solid #ccc', 
        fontSize: '1.2rem' 
      }}>
        <p>"{advice}"</p>
      </blockquote>
      <p style={{ color: '#777' }}>Ini adalah contoh halaman nested route.</p>
    </div>
  );
}