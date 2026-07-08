'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react';

const DetailsPage = () => {
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  const fetchCountRef = useRef(0);

  const loadAdvice = async () => {
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
  };

 
  useEffect(() => {
    loadAdvice();
  }, []);


  const adviceLabel = useMemo(() => {
    if (!advice) return "";
    return `Advice #${advice.id}`;
  }, [advice]);

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
        Random Advice
      </h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
        Nested route /12345678/details — data from api.adviceslip.com
      </p>

      <div style={{
        background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0',
        padding: '1.5rem', minHeight: '140px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
      }}>
        {loading && <p style={{ color: '#64748b' }}>Fetching advice…</p>}

        {error && (
          <p style={{ color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '0.75rem' }}>
            Failed to load advice: {error}
          </p>
        )}

        {!loading && !error && advice && (
          <>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#059669', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {adviceLabel}
            </span>
            <p style={{ fontSize: '1.1rem', fontStyle: 'italic', lineHeight: '1.5' }}>
              "{advice.advice}"
            </p>
          </>
        )}

        <button
          onClick={loadAdvice}
          disabled={loading}
          style={{
            marginTop: '1rem', alignSelf: 'flex-start', background: '#0f172a', color: '#fff',
            border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.85rem',
            cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.5 : 1
          }}
        >
          Get new advice
        </button>
      </div>

      <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '1rem' }}>
        Fetched {fetchCountRef.current} time(s) this session.
      </p>
    </div>
  );
};

export default DetailsPage;
