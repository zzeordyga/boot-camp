"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PokemonDetails() {
  const { slug } = useParams();
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    const fetchDetails =  async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);
      const data = await res.json();
      setPokemon(data);
    };
    fetchDetails();
  }, [slug]);

  if (!pokemon) return <p style={{ textAlign: "center" }}>Loading details...</p>;

  return (
    <div 
    style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: 24, textTransform: "capitalize", marginBottom: 10 }}>{pokemon && pokemon.name}</h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        style={{ width: 150, height: 150 }}
      />
      <p style={{ marginTop: 1 }}>
        Type: {pokemon && pokemon.types.map(t => t.type.name).join(", ")}
      </p>
      <p>Height: {pokemon && pokemon.height}</p>
      <p>Weight: {pokemon && pokemon.weight}</p>

      <Link
        href="/2540123864"
        style={{ display: "block", marginTop: 20, marginBottom: 20, color: "#0070f3" }}
      >
        ← Back to list
      </Link>
    </div>
  );
}
