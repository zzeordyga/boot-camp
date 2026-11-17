"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { API_BASE, NIM, artwork, idFromUrl } from "./config";
import useFavorites from "./useFavorites";
import styles from "./styles.module.css";

const PAGE_SIZE = 24;

export default function HomePage() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("id");
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const searchRef = useRef(null);
  const { favorites, toggle } = useFavorites();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(`${API_BASE}/pokemon?limit=151`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Request gagal (${res.status})`);
        return res.json();
      })
      .then((data) =>
        setPokemon(
          data.results.map((p) => ({ name: p.name, id: idFromUrl(p.url) }))
        )
      )
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [reloadKey]);

  useEffect(() => {
    const onKey = (e) => {
      const typing = ["INPUT", "TEXTAREA", "SELECT"].includes(
        document.activeElement?.tagName
      );
      if (e.key === "/" && !typing) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = pokemon.filter(
      (p) =>
        (!q || p.name.includes(q) || String(p.id) === q) &&
        (!onlyFavs || favorites.includes(p.id))
    );
    list = [...list].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "name-desc") return b.name.localeCompare(a.name);
      return a.id - b.id;
    });
    return list;
  }, [pokemon, query, sort, onlyFavs, favorites]);

  useEffect(() => setVisible(PAGE_SIZE), [query, sort, onlyFavs]);

  const shown = filtered.slice(0, visible);

  return (
    <section>
      <div className={styles.hero}>
        <h2>Cari Pokémon generasi 1</h2>
        <p>
          {loading
            ? "Memuat data…"
            : `${pokemon.length} Pokémon · ${favorites.length} favorit`}
        </p>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <input
            ref={searchRef}
            type="search"
            className={styles.input}
            placeholder='Cari nama atau nomor… (tekan "/")'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Cari Pokémon"
          />
        </div>

        <select
          className={styles.select}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Urutkan"
        >
          <option value="id">Nomor</option>
          <option value="name">Nama A → Z</option>
          <option value="name-desc">Nama Z → A</option>
        </select>

        <button
          type="button"
          className={`${styles.chip} ${onlyFavs ? styles.chipOn : ""}`}
          onClick={() => setOnlyFavs((v) => !v)}
          aria-pressed={onlyFavs}
        >
          ★ Favorit saja
        </button>
      </div>

      {error && (
        <div className={styles.notice} role="alert">
          <p>Gagal memuat data: {error}</p>
          <button
            type="button"
            className={styles.btn}
            onClick={() => setReloadKey((k) => k + 1)}
          >
            Coba lagi
          </button>
        </div>
      )}

      {loading && (
        <div className={styles.grid} aria-busy="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={`${styles.card} ${styles.skeleton}`} />
          ))}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className={styles.notice}>
          <p>
            {onlyFavs && favorites.length === 0
              ? "Belum ada favorit. Klik ☆ pada kartu untuk menambahkan."
              : `Tidak ada hasil untuk “${query}”.`}
          </p>
        </div>
      )}

      {!loading && (
        <ul className={styles.grid}>
          {shown.map((p) => {
            const isFav = favorites.includes(p.id);
            return (
              <li key={p.id} className={styles.card}>
                <button
                  type="button"
                  className={`${styles.star} ${isFav ? styles.starOn : ""}`}
                  onClick={() => toggle(p.id)}
                  aria-label={
                    isFav ? `Hapus ${p.name} dari favorit` : `Favoritkan ${p.name}`
                  }
                  aria-pressed={isFav}
                >
                  {isFav ? "★" : "☆"}
                </button>

                <Link
                  href={`/${NIM}/details?name=${p.name}`}
                  className={styles.cardLink}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={artwork(p.id)}
                    alt={p.name}
                    loading="lazy"
                    width={160}
                    height={160}
                    className={styles.art}
                  />
                  <span className={styles.num}>
                    #{String(p.id).padStart(3, "0")}
                  </span>
                  <span className={styles.name}>{p.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {!loading && shown.length < filtered.length && (
        <div className={styles.more}>
          <button
            type="button"
            className={styles.btn}
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
          >
            Tampilkan lebih banyak ({filtered.length - shown.length} lagi)
          </button>
        </div>
      )}
    </section>
  );
}
