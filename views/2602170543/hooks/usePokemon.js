"use client";
import { useState, useEffect } from "react";
import { fetchPokemonList } from "../lib/api";

export default function usePokemon() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        const data = await fetchPokemonList(50);
        setPokemonList(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching Pokémon:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, []);

  return { pokemonList, loading, error };
}
