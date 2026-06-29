"use client";

import { useState, useEffect, useRef, useMemo } from "react";

export default function DetailsPage() {
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useRef: track number of fetches without causing extra re-renders
  const fetchCountRef = useRef(0);

  async function loadAdvice() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("https://api.adviceslip.com/advice");
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      fetchCountRef.current += 1;
      setAdvice(data.slip);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // useEffect: load the first piece of advice on mount
  useEffect(() => {
    loadAdvice();
  }, []);

  // useMemo: a derived label that only recomputes when the advice id changes
  const adviceLabel = useMemo(() => {
    if (!advice) return "";
    return `Advice #${advice.id}`;
  }, [advice]);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-2">Random Advice</h2>
      <p className="text-slate-500 mb-6">
        Nested route at <code className="bg-slate-200 px-1 rounded">/12345678/details</code>{" "}
        — data from <code className="bg-slate-200 px-1 rounded">api.adviceslip.com</code>
      </p>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 min-h-[140px] flex flex-col justify-between">
        {loading && <p className="text-slate-500 animate-pulse">Fetching advice…</p>}

        {error && (
          <p className="text-red-600 bg-red-50 border border-red-200 rounded p-3">
            Failed to load advice: {error}
          </p>
        )}

        {!loading && !error && advice && (
          <>
            <span className="text-xs uppercase tracking-wide text-emerald-600 font-semibold mb-2">
              {adviceLabel}
            </span>
            <p className="text-lg leading-relaxed italic">"{advice.advice}"</p>
          </>
        )}

        <button
          onClick={loadAdvice}
          disabled={loading}
          className="mt-4 self-start rounded-lg bg-slate-900 text-white px-4 py-2 text-sm
                     hover:bg-slate-700 disabled:opacity-50 transition-colors"
        >
          Get new advice
        </button>
      </div>

      <p className="text-xs text-slate-400 mt-4">
        Fetched {fetchCountRef.current} time(s) this session.
      </p>
    </section>
  );
}
