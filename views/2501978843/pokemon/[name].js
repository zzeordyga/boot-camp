import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../layout';
import styles from '../pokemon.module.css';

export default function PokemonDetails() {
  const router = useRouter();
  const { name } = router.query;
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    if (name) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(res => res.json())
        .then(data => setPokemon(data))
        .catch(error => console.error('Error fetching Pokémon details:', error));
    }
  }, [name]);

  if (!pokemon) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <Layout>
      <h1 className={styles.title}>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className={styles.image} />
      <p className={styles.types}>Tipe: {pokemon.types.map(type => type.type.name).join(', ')}</p>
    </Layout>
  );
}