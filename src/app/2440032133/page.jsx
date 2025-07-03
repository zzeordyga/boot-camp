'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';

export default function Page() {
  const [count, setCount] = useState(0);
  const [fact, setFact] = useState('');
  const [advice, setAdvice] = useState('');
  const inputRef = useRef();
  const doubled = useMemo(() => count * 2, [count]);

  useEffect(() => {
    inputRef.current.focus();

    fetch('https://catfact.ninja/fact')
      .then(res => res.json())
      .then(data => setFact(data.fact));

    fetch('https://api.adviceslip.com/advice')
      .then(res => res.json())
      .then(data => setAdvice(data.slip.advice));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-800">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Jonathan Felim Jhon - 2440032133</h1>
        <p className="text-lg">Computer Science</p>
        <nav className="mt-4 flex space-x-8">
          <a href="/2440032133" className="text-blue-600 hover:underline">Home</a>
          <a href="/2440032133/details" className="text-blue-600 hover:underline">Details</a>
        </nav>
      </header>

      <main className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <label className="block mb-1 font-medium">Input: </label>
          <input
            ref={inputRef}
            className="border p-2 rounded w-full"
            placeholder="Type something..."
          />
        </div>

        <div>
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Clicked {count} times
          </button>
          <p className="mt-2">Doubled: {doubled}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">🐱 Cat Fact:</h2>
          <p>{fact || 'Loading cat fact...'}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">💡 Advice:</h2>
          <p>{advice || 'Loading advice...'}</p>
        </div>
      </main>
    </div>
  );
}
