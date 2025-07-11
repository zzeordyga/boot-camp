// views/12345678/details/page.jsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function DetailsPage() {
  const [advice, setAdvice] = useState("");
  const counterRef = useRef(0);

  const fetchAdvice = async () => {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
    counterRef.current += 1;
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-700">💡 Saran Hidup Hari Ini</h2>

      <blockquote className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-gray-800 italic rounded shadow-sm">
        {advice}
      </blockquote>

      <button
        onClick={fetchAdvice}
        className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded transition"
      >
        Ambil Saran Baru
      </button>

      <p className="text-sm text-gray-600">Jumlah klik: <span className="font-semibold">{counterRef.current}</span></p>
    </div>
  );
}

