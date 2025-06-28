'use client';
import { useEffect, useState, useMemo, useRef } from 'react';
import Link from 'next/link';

export default function MainPage() {
  const [fact, setFact] = useState('');
  const loadCount = useRef(0);

  useEffect(() => {
    fetch('https://catfact.ninja/fact')
      .then(res => res.json())
      .then(data => setFact(data.fact));
  }, []);

  const wordCount = useMemo(() => fact.split(' ').length, [fact]);

  return (
    <div>
      <h2>Cat Fact</h2>
      <p>{fact}</p>
      <p><strong>Word Count:</strong> {wordCount}</p>
      <Link href="/views/2502023890/details">Go to Details</Link>
    </div>
  );
}
