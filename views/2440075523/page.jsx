import { useState, useEffect, useRef, useMemo } from 'react';
import Layout from 'views/2440075523/layout';
import styles from '.views/2440075523/styles.module.css';
import Link from 'next/link';

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
        const data = await response.json();
        setPokemon(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

const filteredPokemon = useMemo(() => {
  return pokemon.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [pokemon, searchTerm]);

const focusSearch = () => {
  searchRef.current.focus();
};

  return (
    <Layout>
      <div className={styles.searchContainer}>
        <input
          ref={searchRef}
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <button onClick={focusSearch} className={styles.searchButton}>
          🔍
        </button>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <div className={styles.grid}>
          {filteredPokemon.map((p, index) => (
            <Link href={`/12345678/details?id=${index + 1}`} key={p.name}>
              <div className={styles.card}>
                <img 
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} 
                  alt={p.name}
                />
                <h3>{p.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Layout>
  );
}
