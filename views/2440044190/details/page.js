'use client';

import { useEffect, useState } from 'react';

export default function DetailsPage() {
  const [fact, setFact] = useState('');
  const [codes] = useState([
    { code: 100, description: 'Continue' },
    { code: 200, description: 'OK' },
    { code: 201, description: 'Created' },
    { code: 204, description: 'No Content' },
    { code: 301, description: 'Moved Permanently' },
    { code: 302, description: 'Found' },
    { code: 400, description: 'Bad Request' },
    { code: 401, description: 'Unauthorized' },
    { code: 403, description: 'Forbidden' },
    { code: 404, description: 'Not Found' },
    { code: 418, description: "I'm a teapot" },
    { code: 500, description: 'Internal Server Error' },
    { code: 502, description: 'Bad Gateway' },
    { code: 503, description: 'Service Unavailable' },
  ]);

  useEffect(() => {
    fetch('https://catfact.ninja/fact')
      .then((res) => res.json())
      .then((data) => setFact(data.fact));
  }, []);

  return (
    <main style={{ padding: '2rem' }}>
      <h2>📖 HTTP Status Codes</h2>
      <ul>
        {codes.map((entry) => (
          <li key={entry.code}>
            <strong>{entry.code}</strong> — {entry.description}
          </li>
        ))}
      </ul>

      <hr style={{ margin: '2rem 0' }} />

      <h3>🐾 Random Cat Fact</h3>
      <p>{fact || 'Loading cat fact...'}</p>
    </main>
  );
}