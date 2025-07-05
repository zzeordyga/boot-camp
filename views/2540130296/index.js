import React, { useEffect, useState, useMemo } from 'react';
import Layout from './layout';

export default function HomePage() {
  const [pokemonList, setPokemonList] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
      .then((res) => res.json())
      .then((json) => { 
        setPokemonList(json.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon list:", error);
        setLoading(false);
      });
  }, []);

  const totalPokemon = useMemo(() => pokemonList.length, [pokemonList]);

  return (
    <Layout>
      <h1>Pokémon List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Total: {totalPokemon} Pokémon</p>
          <ul>
            {pokemonList.map((pokemon, index) => (
              <li key={index}>{pokemon.name}</li>
            ))}
          </ul>
        </>
      )}
    </Layout>
  );
}