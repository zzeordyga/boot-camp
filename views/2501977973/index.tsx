// views/12345678/index.tsx
'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Layout from './layout';
import Link from 'next/link';

const HomePage = () => {
  const [advice, setAdvice] = useState('');
  const renderCount = useRef(0);

  useEffect(() => {
    fetch('https://api.adviceslip.com/advice')
      .then(res => res.json())
      .then(data => setAdvice(data.slip.advice));
  }, []);

  renderCount.current += 1;

  const adviceLength = useMemo(() => advice.length, [advice]);

  return (
    <Layout>
      <p className="mb-4">Saran hidup hari ini:</p>
      <blockquote className="p-4 bg-gray-100 rounded">{advice}</blockquote>
      <p className="mt-2 text-sm text-gray-600">Panjang advice: {adviceLength} karakter</p>
      <p className="text-sm">Render ke-{renderCount.current}</p>
      <Link href="/views/12345678/details" className="text-blue-500 mt-4 block">Lihat detail &rarr;</Link>
    </Layout>
  );
};

export default HomePage;