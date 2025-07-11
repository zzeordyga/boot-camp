'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';

export default function Page() {
  const [advice, setAdvice] = useState(null);

  useEffect(() => {
    fetch('https://api.adviceslip.com/advice')
      .then((res) => res.json())
      .then((data) => setAdvice(data.slip.advice))
      .catch(() => setAdvice('Failed to fetch advice.'));
  }, []);

  const wordCount = useMemo(() => {
    return advice ? advice.split(' ').length : 0;
  }, [advice]);

  return (
    <div className="bg-white p-6 rounded shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-2">Today's Advice</h2>
      <p>{advice || 'Loading advice...'}</p>
      <p className="text-sm text-gray-500 mt-2">Word count: {wordCount}</p>

      <Link href="/views/2501959775/details" className="text-blue-600 hover:underline">
        Go to Details →
      </Link>
    </div>
  );
}

