'use client';

import { useEffect, useState, useRef, useMemo } from 'react';

export default function HomePage() {
  const [advice, setAdvice] = useState('');
  const [catFact, setCatFact] = useState('');
  const renderCount = useRef(0);

  useEffect(() => {
    fetch('https://api.adviceslip.com/advice')
      .then(res => res.json())
      .then(data => setAdvice(data.slip.advice));

    fetch('https://catfact.ninja/fact')
      .then(res => res.json())
      .then(data => setCatFact(data.fact));
  }, []);

  renderCount.current++;

  const combined = useMemo(() => {
    if (!advice || !catFact) return 'Loading...';
    return `${advice} 💡 — Did you know? 🐱 ${catFact}`;
  }, [advice, catFact]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Welcome to Your Page</h2>
      <p className="mb-2">{combined}</p>
      <p className="text-sm text-gray-500">Page rendered {renderCount.current} times</p>
    </div>
  );
}
