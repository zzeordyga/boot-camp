'use client';
import React, { useState, useEffect } from 'react';
import Layout from './layout';

const DetailsPage = () => {
  const [facts, setFacts] = useState<string[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('https://catfact.ninja/fact').then(res => res.json()),
      fetch('https://catfact.ninja/fact').then(res => res.json()),
    ]).then(results => setFacts(results.map(r => r.fact)));
  }, []);

  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-3">Fakta Kucing</h2>
      <ul className="list-disc list-inside">
        {facts.map((fact, i) => (
          <li key={i}>{fact}</li>
        ))}
      </ul>
    </Layout>
  );
};

export default DetailsPage;