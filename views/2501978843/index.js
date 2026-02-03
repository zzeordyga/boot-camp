import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Layout from './layout';
import styles from './index.module.css';

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const searchInputRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
      .then(res => res.json())
      .then(data => {
        setPokemonList(data.results);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching Pokémon:', error);
        setIsLoading(false);
      });
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
        placeholder="Cari Pokémon..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        ref={searchInputRef}
        className={styles.searchInput}
      />
      {isLoading ? (
        <div className={styles.loader}>Loading...</div>
      ) : filteredPokemon.length === 0 ? (
        <p className={styles.noResults}>No Pokémon found!</p>
      ) : (
        <div className={styles.pokemonGrid}>
          {filteredPokemon.map(pokemon => (
            <Link href={`/2501978843/pokemon/${pokemon.name}`} key={pokemon.name}>
              <div className={styles.pokemonCard}>
                <h3 className={styles.pokemonName}>{pokemon.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Layout>
  );
}