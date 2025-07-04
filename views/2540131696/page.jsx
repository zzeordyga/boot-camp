'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';

export default function PokemonListPage() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await res.json();
        setPokemons(data.results);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  const filteredPokemons = useMemo(() => {
    if (!searchTerm) {
      return pokemons;
    }
    return pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pokemons, searchTerm]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Daftar Pokemon</h2>
      <div style={{ marginBottom: '2rem' }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Cari Pokemon..."
          onChange={e => setSearchTerm(e.target.value)}
          style={{ padding: '0.5rem' }}
        />
        <button onClick={() => inputRef.current.focus()} style={{ marginLeft: '0.5rem', padding: '0.5rem' }}>
          Focus Search
        </button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {filteredPokemons.map(pokemon => (
          <Link key={pokemon.name} href={`/views/2540131696/details/${pokemon.name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "1rem", width: "150px", textAlign: "center", textTransform: "capitalize", cursor: 'pointer' }}>
              <p>{pokemon.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}