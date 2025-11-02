// src/app/2440011961/details/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MyNIMDetailsPage() {
  const [catFact, setCatFact] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCatFact = async () => {
      try {
        const response = await fetch('https://catfact.ninja/fact');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCatFact(data.fact);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCatFact();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px', fontSize: '1.2em', color: '#555' }}>Fetching a fascinating cat fact...</div>;
  }

  if (error) {
    return <div style={{ color: '#d32f2f', textAlign: 'center', padding: '40px', fontWeight: 'bold' }}>Error fetching cat fact: {error}</div>;
  }

  return (
    <div style={{ padding: '0px' }}>
      <h2 style={{ fontSize: '1.8em', marginBottom: '25px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        About This Page
      </h2>
      <p style={{ fontSize: '1.05em', color: '#555', marginBottom: '30px' }}>
        This is a nested route designed to showcase additional content and API integration.
      </p>
      <div style={{
        background: '#e8f3ff',
        borderLeft: '6px solid #0070f3',
        padding: '25px',
        margin: '30px 0',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#0056b3', fontSize: '1.5em' }}>🐾 Fun Cat Fact of the Day:</h3>
        <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>{catFact}</p>
      </div>
      <p style={{ marginTop: '30px' }}>
        <Link href="/2440011961" style={{
          display: 'inline-block',
          padding: '10px 18px',
          backgroundColor: '#0070f3',
          color: 'white',
          borderRadius: '5px',
          textDecoration: 'none',
          transition: 'background-color 0.3s ease, transform 0.2s ease',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}>
          ← Back to Main Page
        </Link>
      </p>
    </div>
  );
}