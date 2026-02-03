import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../layout';
import styles from './pokemon.module.css';

export default function PokemonDetails() {
  const router = useRouter();
  const { name } = router.query;
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (name) {
      setIsLoading(true);
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(res => res.json())
        .then(data => {
          setPokemon(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching Pokémon details:', error);
          setIsLoading(false);
        });
    }
  }, [name]);

  if (isLoading) {
    return (
      <Layout>
        <div className={styles.loader}>Loading...</div>
      </Layout>
    );
  }

  if (!pokemon) {
    return (
      <Layout>
        <p className={styles.error}>Pokémon not found!</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.card}>
        <h1 className={styles.title}>{pokemon.name}</h1>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} className={styles.image} />
        <div className={styles.types}>
          {pokemon.types.map(type => (
            <span key={type.type.name} className={`${styles.typeBadge} ${styles[type.type.name]}`}>
              {type.type.name}
            </span>
          ))}
        </div>
        <p className={styles.info}>Height: {pokemon.height / 10} m</p>
        <p className={styles.info}>Weight: {pokemon.weight / 10} kg</p>
      </div>
    </Layout>
  );
}