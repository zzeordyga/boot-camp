'use client';
import { useState, useEffect } from 'react';

export default function DetailsPage() {
  const [advices, setAdvices] = useState([]);

  useEffect(() => {
    const fetchMultipleAdvice = async () => {
      const results = [];
      for (let i = 0; i < 10; i++) {
        const res = await fetch('https://api.adviceslip.com/advice');
        const data = await res.json();
        results.push(data.slip.advice);
      }
      setAdvices(results);
    };
    fetchMultipleAdvice();
  }, []);

  return (
    <div>
      <h2>10 Random Advice For Today</h2>
      <ul>
        {advices.map((advice, index) => (
          <li key={index}>{advice}</li>
        ))}
      </ul>
      <a href="/views/2501997281" style={styles.button}>Back</a>
    </div>
    
  );
}

const styles = {
  button: { textAlign: "center", padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }
};