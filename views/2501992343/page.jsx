

'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';

export default function Page() {

  const [catFact, setCatFact] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const factDisplayRef = useRef(null);

  useEffect(() => {
    const fetchCatFact = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setCatFact('');

        const response = await fetch('https://catfact.ninja/fact');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCatFact(data.fact);
      } catch (e) {
        setError(`Gagal mengambil fakta kucing: ${e.message}`);
        console.error("Error mengambil fakta kucing:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCatFact();
  }, []); 

  const formattedFactLength = useMemo(() => {
    if (catFact) {
      return `Panjang fakta: ${catFact.length} karakter.`;
    }
    return 'Panjang fakta: N/A';
  }, [catFact]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-4 font-sans text-gray-800">
      <div className="bg-white rounded-xl shadow-2xl p-8 md:p-10 w-full max-w-2xl transform transition-all duration-300 hover:scale-105">

        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-700 mb-6 drop-shadow-lg">
            Fakta Kucing Lucu dan Keren
        </h1>
        <div className="flex justify-center mb-8">
           <Link href="/views/2501992343/details" className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition duration-200 ease-in-out transform hover:-translate-y-1">
                Klik details ini
            </Link>
        </div>


        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200 min-h-[150px] flex flex-col justify-center items-center text-center">
          {isLoading && (
            <div className="flex items-center text-purple-600 text-xl">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-purple-500" xmlns="http://www.w3.    org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memuat fakta yang sempurna...
            </div>
          )}

          {error && (
            <p className="text-red-500 text-lg font-medium">{error}</p>
          )}

          {catFact && !isLoading && (
            <>
              <p
                ref={factDisplayRef} 
                tabIndex="0"
                className="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-md p-2"
              >
                "{catFact}"
              </p>
              <p className="text-lg text-purple-700 font-semibold mt-2">
                {formattedFactLength}
              </p>
            </>
          )}
        </div>

      </div>
    </div>
  );
};


