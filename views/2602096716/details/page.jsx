"use client";

import { useState, useEffect, useRef } from "react";

export default function DetailsPage() {
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(true);
  const clickCount = useRef(0);

  const fetchFact = async () => {
    setLoading(true);
    const res = await fetch("https://catfact.ninja/fact");
    const data = await res.json();
    setFact(data.fact);
    clickCount.current += 1;
    setLoading(false);
  };

  useEffect(() => {
    fetchFact();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Fakta Kucing</h2>

      {loading ? (
        <p className="text-gray-500">Memuat...</p>
      ) : (
        <p className="p-3 border rounded bg-white italic">{fact}</p>
      )}

      <button
        onClick={fetchFact}
        className="px-4 py-2 bg-indigo-700 text-white rounded"
      >
        Ambil Fakta Baru
      </button>

      <p className="text-xs text-gray-400">Diambil: {clickCount.current}x</p>
    </div>
  );
}