"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import styles from "./styles.module.css";

const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=40";

const spriteOf = (url) => {
  const id = url.split("/").filter(Boolean).pop();
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

export default function Page() {
  const [pokemon, setPokemon] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current?.focus();
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal memuat data");
        return res.json();
      })
      .then((data) => setPokemon(data.results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => pokemon.filter((p) => p.name.includes(query.trim().toLowerCase())),
    [pokemon, query]
  );

  return (
    <>
      <input
        ref={searchRef}
        className={styles.search}
        placeholder="Cari Pokémon..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <p className={styles.message}>Memuat...</p>}
      {error && <p className={styles.message}>{error}</p>}
      <div className={styles.grid}>
        {filtered.map((p) => (
          <Link
            key={p.name}
            href={`/2602187802/details?name=${p.name}`}
            className={styles.card}
          >
            <img src={spriteOf(p.url)} alt={p.name} className={styles.sprite} />
            <span>{p.name}</span>
          </Link>
        ))}
      </div>
    </>
  );
}