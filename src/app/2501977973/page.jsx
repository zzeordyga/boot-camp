'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react';

// Main component for your React page
const MyNIMPage = () => {
  
  const [name] = useState('Zidane Wicaksono');

  const [nim] = useState('2501977973');


  const inputRef = useRef(null);


  useEffect(() => {

    if (inputRef.current) {
      inputRef.current.focus();
    }

    console.log(`Halaman ${name} (${nim}) telah dimuat dan input siap!`);


    return () => {
      console.log(`Halaman ${name} (${nim}) akan di-unmount.`);
    };
  }, [name, nim]); 


  const [clickCount, setClickCount] = useState(0);


  const memoizedDescription = useMemo(() => {

    const description = `Saya adalah seorang mahasiswa/i jurusan [Nama Program Studi Anda] di [Nama Universitas Anda]. 
    Minat saya berfokus pada [misalnya: pengembangan web, data science, machine learning] 
    dan saya bersemangat untuk belajar serta berkontribusi dalam proyek-proyek inovatif.`;
    return description;
  }, []); 


  const handleButtonClick = () => {
    setClickCount(prevCount => prevCount + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        {}
        <h1 className="text-3xl font-bold text-gray-800 mb-4 rounded-md">
          {name} - {nim}
        </h1>

        {}
        <p className="text-gray-700 text-lg mb-6 leading-relaxed rounded-md">
          {memoizedDescription}
        </p>

        {}
        <input
          ref={inputRef}
          type="text"
          placeholder="Ketik sesuatu di sini..."
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {}
        <button
          onClick={handleButtonClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Klik Saya ({clickCount} kali)
        </button>

        {}
        {clickCount > 0 && (
          <p className="mt-4 text-green-600 font-medium">
            Anda telah mengklik tombol {clickCount} kali!
          </p>
        )}
      </div>
    </div>
  );
};

export default MyNIMPage;
