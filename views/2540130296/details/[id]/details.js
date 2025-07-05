import React, { useEffect, useState, useRef } from 'react';
import Layout from '../../layout';

export default function DetailsPage() {
  const [pokemon, setPokemon] = useState(null);
  const loadCount = useRef(0); 

  const fetchRandomPokemon = async () => {
    const id = Math.floor(Math.random() * 151) + 1;
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json(); 
      setPokemon(data);
      loadCount.current += 1;
    } catch (error) {
      console.error("Error fetching random Pokémon:", error);
      setPokemon(null);
    }
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  return (
    <Layout>
      <h1>Random Pokémon Details</h1>
      <p>Loaded {loadCount.current} times</p>
      <button onClick={fetchRandomPokemon}>Get Another Pokémon</button>
      {pokemon && (
        <div style={{ marginTop: 20 }}>
          <h2>{pokemon.name.toUpperCase()}</h2>
          {}
          {pokemon.sprites && pokemon.sprites.front_default && (
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          )}
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          {}
          <p>Type: {pokemon.types && pokemon.types.map((t) => t.type.name).join(', ')}</p>
        </div>
      )}
    </Layout>
  );
}