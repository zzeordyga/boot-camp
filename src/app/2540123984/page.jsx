'use client'
import React, { useState, useEffect, useRef } from 'react';

function MyProfile() {
  const [message, setMessage] = useState('Welcome to my React page!');
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      console.log('Component mounted!');
    }
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Stephanie Aurelia - 2540123984</h1>
      <p>I am a Computer Science student at Bina Nusantara University.</p>
      <p>{message}</p>
      <button onClick={() => setMessage('Thanks for visiting!')}>
        Click me!
      </button>
    </div>
  );
}

export default MyProfile;
