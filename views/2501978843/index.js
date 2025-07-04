import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Layout from './layout';
import styles from './index.module.css';

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
      .then(res => res.json())
      .then(data => setPokemonList(data.results))
      .catch(error => console.error('Error fetching Pokémon:', error));
  }, []);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const filteredPokemon = useMemo(() => {
    return pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pokemonList, searchTerm]);

  return (
    <Layout>
      <h1 className={styles.title}>Daftar Pokémon</h1>
      <input
        type="text"
        placeholder="Cari Pokémon"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        ref={searchInputRef}
        className={styles.searchInput}
      />
      <ul className={styles.pokemonList}>
        {filteredPokemon.map(pokemon => (
          <li key={pokemon.name} className={styles.pokemonItem}>
            <Link href={`/12345678/pokemon/${pokemon.name}`}>
              {pokemon.name}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}