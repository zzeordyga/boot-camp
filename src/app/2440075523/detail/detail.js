import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from 'views/2440075523/layout';
import styles from 'views/2440075523/styles.module.css';

export default function PokemonDetails() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (loading) return <Layout><div className={styles.loading}>Loading...</div></Layout>;
  if (!pokemon) return <Layout><div>Pokémon not found</div></Layout>;

  return (
    <Layout>
      <div className={styles.detailsContainer}>
        <h1>{pokemon.name}</h1>
        <img 
          src={pokemon.sprites.front_default} 
          alt={pokemon.name}
          className={styles.detailImage}
        />
        
        <div className={styles.detailsSection}>
          <h2>Details</h2>
          <p>Height: {pokemon.height / 10}m</p>
          <p>Weight: {pokemon.weight / 10}kg</p>
          <p>Base Experience: {pokemon.base_experience}</p>
        </div>

        <div className={styles.detailsSection}>
          <h2>Abilities</h2>
          <ul>
            {pokemon.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>

        <div className={styles.detailsSection}>
          <h2>Stats</h2>
          <ul>
            {pokemon.stats.map((stat, index) => (
              <li key={index}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
