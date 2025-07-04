'use client';

import { useEffect, useState, useRef, useMemo } from 'react';

export default function MainPage() {
  const [fact, setFact] = useState('');
  const fetchCount = useRef(0);

  useEffect(() => {
    fetch('https://catfact.ninja/fact')
      .then(res => res.json())
      .then(data => {
        setFact(data.fact);
        fetchCount.current += 1;
      });
  }, []);

  const wordCount = useMemo(() => fact.split(' ').length, [fact]);

  return (
    <div>
      <h2>Cat Fact</h2>
      <p>{fact}</p>
      <p><strong>Word Count:</strong> {wordCount}</p>
      <p><em>Fetched {fetchCount.current} times</em></p>
    </div>
  );
}