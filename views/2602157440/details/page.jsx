'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import styles from '../style.module.css';

function Details() {
  const params = useSearchParams();
  const name = (params.get('name') || 'pikachu').toLowerCase();

  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [shiny, setShiny] = useState(false);
  const headingRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');
    setShiny(false);

    fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name)}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setData(json);
        setStatus('ready');
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setStatus('error');
      });

    return () => controller.abort();
  }, [name]);

  // Setelah data tampil, pindahkan fokus ke judul agar pembaca layar langsung membacanya.
  useEffect(() => {
    if (status === 'ready') headingRef.current?.focus();
  }, [status]);

  const totalStats = useMemo(
    () => (data ? data.stats.reduce((sum, s) => sum + s.base_stat, 0) : 0),
    [data]
  );

  if (status === 'loading') return <p className={styles.note}>Memuat detail...</p>;

  if (status === 'error') {
    return (
      <div className={styles.note}>
        <p>Pokemon "{name}" tidak ditemukan atau gagal dimuat.</p>
        <Link href="/2602157440" className={styles.back}>Kembali ke daftar</Link>
      </div>
    );
  }

  const image =
    (shiny ? data.sprites.front_shiny : data.sprites.other['official-artwork'].front_default) ||
    data.sprites.front_default;

  return (
    <article className={styles.detail}>
      <Link href="/2602157440" className={styles.back}>&larr; Kembali ke daftar</Link>

      <div className={styles.detailTop}>
        <img src={image} alt={data.name} width="200" height="200" className={styles.art} />
        <div>
          <span className={styles.number}>#{String(data.id).padStart(3, '0')}</span>
          <h1 ref={headingRef} tabIndex={-1} className={styles.title}>{data.name}</h1>
          <div className={styles.types}>
            {data.types.map((t) => (
              <span key={t.type.name} className={styles.type}>{t.type.name}</span>
            ))}
          </div>
          <p>Tinggi {data.height / 10} m &middot; Berat {data.weight / 10} kg</p>
          <button className={styles.button} onClick={() => setShiny((v) => !v)}>
            {shiny ? 'Lihat versi biasa' : 'Lihat versi shiny'}
          </button>
        </div>
      </div>

      <h2 className={styles.subtitle}>Statistik dasar (total {totalStats})</h2>
      <ul className={styles.stats}>
        {data.stats.map((s) => (
          <li key={s.stat.name}>
            <span className={styles.statName}>{s.stat.name}</span>
            <span className={styles.bar}>
              <span style={{ width: `${Math.min(100, (s.base_stat / 160) * 100)}%` }} />
            </span>
            <span className={styles.statValue}>{s.base_stat}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Page() {
  // useSearchParams wajib dibungkus Suspense karena project memakai output: 'export'.
  return (
    <Suspense fallback={<p className={styles.note}>Memuat detail...</p>}>
      <Details />
    </Suspense>
  );
}
