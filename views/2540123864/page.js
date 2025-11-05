"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon");
      const data = await res.json();
      setPokemon(data.results);
    }
    fetchData();
  }, []);

  const filteredPokemon = useMemo(() => {
    if (!searchRef.current?.value) return pokemon;
    return pokemon.filter(p =>
      p.name.toLowerCase().includes(searchRef.current.value.toLowerCase())
    );
  }, [pokemon]);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h1 style={{ textAlign: "center", fontSize: 32, marginBottom: 20 }}>Pokémon List</h1>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <input
          ref={searchRef}
          onChange={() => setPokemon([...pokemon])}
          placeholder="Search Pokémon..."
          style={{
            width: "70%",
            padding: 10,
            border: "1px solid #ccc",
            borderRadius: 6,
            fontSize: 16,
          }}
        />
      </div>

        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: 16,
          }}
        >
          {filteredPokemon.map((p) => {
            const id = p.url.split("/").filter(Boolean).pop();
            return(
              <div
                key={id}
                style={{
                backgroundColor: "#fff",
                borderRadius: 10,
                padding: 5,
                paddingBottom: 30,
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                textAlign: "center",
              }}
              >
                <h2 style={{ textTransform: "capitalize", fontWeight: 600 }}>{p.name}</h2>
                <Link
                  href={`/2540123864/details/${id}`}
                  style={{
                  color: "#0070f3",
                  textDecoration: "none",
                  fontSize: 16,
                  }}
                >
                  View Details
                </Link>
              </div>
            );
          })};
        </div>
    </div>
  );
}
