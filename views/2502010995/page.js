'use client'; // Komponen ini interaktif, jadi kita tandai sebagai Client Component

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';

export default function MainPage() {
  // useState: Untuk menyimpan daftar pokemon dan status loading
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  // useRef: Untuk menyimpan referensi ke elemen input
  const inputRef = useRef(null);

  // useEffect: Untuk mengambil data dari API saat komponen pertama kali dimuat
  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        const data = await response.json();
        setPokemonList(data.results);
      } catch (error) {
        console.error("Failed to fetch pokemon list:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPokemon();
  }, []); // Array dependensi kosong berarti efek ini hanya berjalan sekali

  // useEffect: Untuk fokus ke input saat halaman dimuat
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // useMemo: Untuk memfilter daftar pokemon tanpa menghitung ulang setiap saat
  const filteredPokemon = useMemo(() => {
    if (!filter) return pokemonList;
    return pokemonList.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));
  }, [pokemonList, filter]); // Hanya dihitung ulang jika pokemonList atau filter berubah

  if (loading) {
    return <p className="text-center text-xl">Loading data...</p>;
  }

  return (
    <div className="text-center">
      <input
        ref={inputRef}
        type="text"
        placeholder="Cari Pokemon..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full max-w-md p-2 mb-8 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredPokemon.map((pokemon) => (
          <Link key={pokemon.name} href={`/views/12345678/details?name=${pokemon.name}`}>
            <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors capitalize">
              {pokemon.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
