'use client';

import { useState, useEffect } from 'react';

export default function DetailsPage() {
  const [advice, setAdvice] = useState('');

  useEffect(() => {
    fetch('https://api.adviceslip.com/advice')
      .then(res => res.json())
      .then(data => setAdvice(data.slip.advice));
  }, []);

  return (
    <div>
      <h2>Random Advice</h2>
      <blockquote>{advice}</blockquote>
    </div>
  );
}