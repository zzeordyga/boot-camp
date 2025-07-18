'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [duckUrl, setDuckUrl] = useState('');
  const counterRef = useRef(0);

  const fetchDuck = async () => {
    const res = await fetch('https://random-d.uk/api/v2/random');
    const data = await res.json();
    setDuckUrl(data.url);
    counterRef.current += 1;
  };

  useEffect(() => {
    fetchDuck();
  }, []);

  const memoizedDuck = useMemo(() => duckUrl, [duckUrl]);

  return (
    <div>
      <img src={memoizedDuck} alt="Random Duck" style={{ maxWidth: '100%', borderRadius: '12px' }} />
      <p>You’ve seen {counterRef.current} ducks.</p>
      <button onClick={fetchDuck} style={{ marginTop: '1rem' }}>Get Another Duck</button>
      <div style={{ marginTop: '2rem' }}>
        <Link href="/2540115540/details">Go to Duck Details →</Link>
      </div>
    </div>
  );
}
