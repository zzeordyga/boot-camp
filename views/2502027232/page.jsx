'use client';

import { useState, useEffect, useRef, useMemo } from 'react';

export default function Page() {
  const [name, setName] = useState("Walid Fernando Sastriana");
  const [nim] = useState("2502027232");
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const inputRef = useRef(null);

  // useEffect untuk update waktu setiap detik
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // useMemo untuk hitung panjang karakter nama (contoh pemakaian)
  const nameLength = useMemo(() => {
    return name.length;
  }, [name]);

  return (
    <main className="min-h-screen flex flex-col justify-center items-center text-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-2">{name}</h1>
      <p className="mb-4 text-gray-600">NIM: {nim}</p>
      <p className="mb-4 max-w-md">
        Saya adalah mahasiswa Program Studi Teknik Informatika yang tertarik pada pengembangan web dan teknologi modern seperti React dan Next.js.
      </p>
      <p className="mb-4 text-sm text-blue-700">Waktu sekarang: {time}</p>

      <input
        ref={inputRef}
        type="text"
        placeholder="Ganti nama..."
        className="border p-2 rounded mb-2"
        onChange={(e) => setName(e.target.value)}
      />
      <p className="text-sm text-gray-500">Jumlah karakter nama: {nameLength}</p>
    </main>
  );
}
