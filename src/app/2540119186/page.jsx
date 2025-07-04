'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react';

const CecilProfile = () => {
  const [clicks, setClicks] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    document.title = `You clicked ${clicks} times`;
  }, [clicks]);

  const doubleClicks = useMemo(() => clicks * 2, [clicks]);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Cecilia Ariani Dewi. - 2540119156</h1>
      <p>I am a student in the Computer Science program with a strong interest in front-end development and artificial intelligence.</p>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => setClicks(clicks + 1)}>
          Click me ({clicks})
        </button>
        <p>Double your clicks (useMemo): {doubleClicks}</p>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <input ref={inputRef} placeholder="Focus me using the button!" />
        <button onClick={handleFocus} style={{ marginLeft: '0.5rem' }}>
          Focus Input
        </button>
      </div>
    </div>
  );
};

export default CecilProfile;
