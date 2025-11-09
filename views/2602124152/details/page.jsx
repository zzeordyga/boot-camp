// views/2602124152/details/page.jsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function DetailsPage() {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const clicksRef = useRef(0);
  const buttonRef = useRef(null);

  const fetchAdvice = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("https://api.adviceslip.com/advice", {
        headers: { "Cache-Control": "no-cache" },
      });
      if (!res.ok) throw new Error("Failed to fetch advice");
      const data = await res.json();
      setAdvice(data.slip?.advice ?? "No advice available");
      clicksRef.current += 1;
    } catch (e) {
      setError(e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  useEffect(() => {
    buttonRef.current?.focus();
  }, [advice]);

  const adviceLength = useMemo(() => advice.length, [advice]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-2xl font-bold text-indigo-700">Details</h2>
        <a href="/2602124152" className="text-sm text-gray-600 hover:text-gray-800">← Kembali ke Home</a>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded">{error}</div>
      )}

      <blockquote className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded text-gray-800 italic shadow-sm">
        {loading ? "Memuat saran..." : advice}
      </blockquote>
      <p className="text-sm text-gray-600">Panjang teks: <span className="font-semibold">{adviceLength} karakter</span></p>

      <div className="flex items-center gap-3">
        <button
          ref={buttonRef}
          onClick={fetchAdvice}
          disabled={loading}
          className="px-5 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Mengambil..." : "Ambil Saran Baru"}
        </button>
        <span className="text-sm text-gray-600">Jumlah fetch: <span className="font-semibold">{clicksRef.current}</span></span>
      </div>
    </div>
  );
}
