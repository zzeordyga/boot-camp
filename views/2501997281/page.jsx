'use client';
import { useState, useEffect, useRef, useMemo } from 'react';

export default function HomePage() {
  const [advice, setAdvice] = useState('');
  const adviceCountRef = useRef(0);

  const fetchAdvice = async () => {
    const res = await fetch('https://api.adviceslip.com/advice');
    const data = await res.json();
    setAdvice(data.slip.advice);
    adviceCountRef.current += 1;
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  const adviceLength = useMemo(() => advice.length, [advice]);

  return (
    <div>
      <h2>Advice</h2>
      <p style={{ fontStyle: 'italic' }}>{advice || 'Loading...'}</p>
      <p>Length: {adviceLength} characters</p>
      <p>Click: {adviceCountRef.current} times</p>
      <button onClick={fetchAdvice} style={styles.button}>Get New Advice</button>
    </div>
  );
}

const styles = {
  button: { textAlign: "center", padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }
};