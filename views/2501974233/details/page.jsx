'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function DetailsPage() {
  const [advice, setAdvice] = useState('');
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    fetch('https://api.adviceslip.com/advice')
      .then((res) => res.json())
      .then((data) => setAdvice(data.slip.advice));
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [advice]);

  return (
    <div>
      <h2 ref={ref}>Advice</h2>
      <p style={{ fontStyle: 'italic' }}>{advice || 'Loading...'}</p>
    </div>
  );
}