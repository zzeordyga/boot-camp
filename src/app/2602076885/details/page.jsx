"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

export default function PokemonDetail({ searchParams }) {
  const { name } = searchParams;

  const [pokemon, setPokemon] = useState(null);
  const imageRef = useRef(null);

  useEffect(() => {
    async function fetchPokemon() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      setPokemon(data);
    }

    fetchPokemon();
  }, [name]);

  useEffect(() => {
    if (pokemon && imageRef.current) {
      imageRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [pokemon]);

  const pokemonTypes = useMemo(() => {
    if (!pokemon) return "";

    return pokemon.types.map((type) => type.type.name).join(", ");
  }, [pokemon]);

  if (!pokemon) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  const typeColors = {
    fire: "#ef4444",
    water: "#3b82f6",
    grass: "#22c55e",
    electric: "#facc15",
    poison: "#a855f7",
    bug: "#84cc16",
    normal: "#9ca3af",
    ground: "#a16207",
    rock: "#78716c",
    psychic: "#ec4899",
    ice: "#38bdf8",
    dragon: "#7c3aed",
    ghost: "#6d28d9",
    dark: "#374151",
    fairy: "#f472b6",
    fighting: "#dc2626",
    flying: "#60a5fa",
    steel: "#94a3b8",
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "16px",
        boxShadow: "0 2px 12px rgba(0,0,0,.1)",
        background: "#f9fafb",
      }}
    >
      <Link href="/2602076885">← Back</Link>

      <h1
        style={{
          textTransform: "capitalize",
          textAlign: "center",
          fontSize: "2rem",
        }}
      >
        {pokemon.name}
      </h1>

      <img
        ref={imageRef}
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        style={{
          width: "280px",
          display: "block",
          margin: "20px auto",
        }}
      />

      <hr style={{ margin: "25px 0" }} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "180px 140px",
          rowGap: "18px",
          columnGap: "20px",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <strong>Height</strong>
        <span>{pokemon.height / 10} m</span>

        <strong>Weight</strong>
        <span>{pokemon.weight / 10} kg</span>

        <strong>Base Experience</strong>
        <span>{pokemon.base_experience}</span>

        <strong>Types</strong>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              style={{
                backgroundColor: typeColors[type.type.name] || "#6b7280",
                color: "white",
                padding: "5px 14px",
                borderRadius: "999px",
                fontSize: "14px",
                textTransform: "capitalize",
                fontWeight: "600",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              }}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
