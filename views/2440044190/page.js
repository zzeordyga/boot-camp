'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MainPage() {
  const [code, setCode] = useState('404');

  return (
    <main style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>🐱 HTTP Cat Viewer</h1>

      <img
        src={`https://http.cat/${code}`}
        alt={`HTTP Cat ${code}`}
        style={{ maxWidth: '100%', height: 'auto', margin: '1rem 0' }}
      />

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="code">Enter an HTTP Status Code: </label>
        <input
          id="code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{ padding: '0.3rem', marginRight: '0.5rem' }}
        />
      </div>

      <Link href="/2440044190/details" style={{ color: 'blue' }}>
        → Go to Details Page
      </Link>
    </main>
  );
}