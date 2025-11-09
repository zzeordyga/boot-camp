"use client";
import { useState, useEffect } from "react";
import { fetchPokemonDetails } from "../lib/api";

export default function usePokemonDetails(pokemonId) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemonId) return;

    const loadDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchPokemonDetails(pokemonId);
        setDetails(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching details:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [pokemonId]);

  return { details, loading, error };
}
