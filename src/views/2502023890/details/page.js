'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function DetailsPage() {
  const [input, setInput] = useState('');

  return (
    <div>
      <h2>Details Page</h2>
      <input
        placeholder="Type something"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <p>Your input: {input}</p>
      <Link href="/views/2502023890">Back to Home</Link>
    </div>
  );
}
