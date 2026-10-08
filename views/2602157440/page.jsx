'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './style.module.css';

const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151';
const spriteUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export default function Page() {
  const [pokemon, setPokemon] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('id');
  const [reloadKey, setReloadKey] = useState(0);
  const searchRef = useRef(null);

  // Ambil data dari API saat halaman dibuka (atau saat tombol "Coba lagi" ditekan).
  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');

    fetch(API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        const list = json.results.map((item) => ({
          name: item.name,
          // URL berbentuk .../pokemon/25/ -> ambil angka terakhir sebagai id
          id: Number(item.url.split('/').filter(Boolean).pop()),
        }));
        setPokemon(list);
        setStatus('ready');
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setStatus('error');
      });

    return () => controller.abort();
  }, [reloadKey]);

  // Fokuskan kolom pencarian begitu halaman tampil.
  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  // Hasil filter + urutan hanya dihitung ulang kalau data, kata kunci, atau urutan berubah.
  const visible = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    const filtered = pokemon.filter(
      (p) => p.name.includes(keyword) || String(p.id) === keyword
    );
    return [...filtered].sort((a, b) =>
      sort === 'name' ? a.name.localeCompare(b.name) : a.id - b.id
    );
  }, [pokemon, query, sort]);

  const clearSearch = () => {
    setQuery('');
    searchRef.current?.focus();
  };

  return (
    <section>
      <h1 className={styles.title}>Pokemon Generasi Pertama</h1>

      <div className={styles.toolbar}>
        <input
          ref={searchRef}
          className={styles.input}
          type="search"
          placeholder="Cari nama atau nomor..."
          aria-label="Cari pokemon"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className={styles.select}
          aria-label="Urutkan"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="id">Urut nomor</option>
          <option value="name">Urut nama</option>
        </select>
        <button className={styles.button} onClick={clearSearch} disabled={!query}>
          Hapus
        </button>
      </div>

      {status === 'loading' && <p className={styles.note}>Memuat data...</p>}

      {status === 'error' && (
        <div className={styles.note}>
          <p>Gagal memuat data.</p>
          <button className={styles.button} onClick={() => setReloadKey((k) => k + 1)}>
            Coba lagi
          </button>
        </div>
      )}

      {status === 'ready' && (
        <>
          <p className={styles.count}>
            Menampilkan {visible.length} dari {pokemon.length} pokemon
          </p>
          {visible.length === 0 ? (
            <p className={styles.note}>Tidak ada pokemon yang cocok dengan "{query}".</p>
          ) : (
            <ul className={styles.grid}>
              {visible.map((p) => (
                <li key={p.id}>
                  <Link href={`/2602157440/details?name=${p.name}`} className={styles.card}>
                    <img src={spriteUrl(p.id)} alt={p.name} loading="lazy" width="96" height="96" />
                    <span className={styles.number}>#{String(p.id).padStart(3, '0')}</span>
                    <span className={styles.name}>{p.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
