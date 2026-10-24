'use client'
import { useState, useEffect, useRef, useMemo } from 'react';
import styles from './cats.module.css';

const lengthOptions = [
  { label: 'Any length', value: null },
  { label: 'Short', value: 70 },
  { label: 'Medium', value: 140 },
];

export default function FactsPage() {
  const [maxLength, setMaxLength] = useState(null);
  const [requestId, setRequestId] = useState(0);
  const [fact, setFact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    const query = maxLength ? `?max_length=${maxLength}` : '';
    setLoading(true);
    setError('');

    fetch(`https://catfact.ninja/fact${query}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json();
      })
      .then((data) => {
        if (!data.fact) throw new Error('No fact found for that length. Try another filter.');
        setFact(data);
        setHistory((prev) => [data, ...prev.filter((item) => item.fact !== data.fact)]);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [requestId, maxLength]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.repeat || event.target.tagName === 'INPUT') return;
      if (event.key === 'n' || event.key === 'N') setRequestId((id) => id + 1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const stats = useMemo(() => {
    if (history.length === 0) return { seen: 0, average: 0, longest: 0 };
    const lengths = history.map((item) => item.length);
    const total = lengths.reduce((sum, length) => sum + length, 0);
    return {
      seen: history.length,
      average: Math.round(total / history.length),
      longest: Math.max(...lengths),
    };
  }, [history]);

  const copyFact = () => {
    navigator.clipboard.writeText(fact.fact).then(() => {
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 1500);
    });
  };

  const previous = history.slice(1, 9);

  return (
    <>
      <h2 className={styles.title}>Random cat facts</h2>

      <div className={styles.chips}>
        {lengthOptions.map((option) => (
          <button
            key={option.label}
            className={`${styles.chip} ${maxLength === option.value ? styles.chipActive : ''}`}
            onClick={() => setMaxLength(option.value)}
          >
            {option.label}
            {option.value && <span className={styles.chipCount}>≤ {option.value}</span>}
          </button>
        ))}
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <section className={styles.factCard} aria-live="polite">
        <p className={`${styles.factText} ${loading ? styles.factLoading : ''}`}>
          {fact ? fact.fact : 'Fetching a fact…'}
        </p>
        <div className={styles.factMeta}>
          <span>
            {fact ? `${fact.length} characters` : '—'}
            <span className={styles.hideMobile}>
              {' · press '}
              <span className={styles.kbd}>N</span>
              {' for another'}
            </span>
          </span>
          <div className={styles.actions}>
            <button className={styles.ghostButton} onClick={copyFact} disabled={!fact}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              className={styles.button}
              onClick={() => setRequestId((id) => id + 1)}
              disabled={loading}
            >
              {loading ? 'Loading…' : 'New fact'}
            </button>
          </div>
        </div>
      </section>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{stats.seen}</span>
          <span className={styles.statLabel}>facts read</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{stats.average}</span>
          <span className={styles.statLabel}>average length</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{stats.longest}</span>
          <span className={styles.statLabel}>longest fact</span>
        </div>
      </div>

      <h3 className={styles.sectionTitle}>Previously read</h3>
      {previous.length === 0 ? (
        <div className={styles.empty}>Facts you have already read will appear here.</div>
      ) : (
        <ul className={styles.history}>
          {previous.map((item) => (
            <li key={item.fact} className={styles.historyItem}>
              {item.fact}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
