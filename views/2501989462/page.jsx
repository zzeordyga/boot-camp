"use client";
import React, { useEffect, useState, useMemo, useRef } from "react";
import Layout from "./layout";
import Link from "next/link";

const PokemonPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const listRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
      const data = await res.json();
      setPokemonList(data.results);
      setLoading(false);
    };
    fetchData();
  }, []);

  const sortedPokemon = useMemo(() => {
    return [...pokemonList].sort((a, b) => a.name.localeCompare(b.name));
  }, [pokemonList]);

  return (
    <Layout>
      <h2>List of Pokémon</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div ref={listRef} style={{ display: "grid", gap: "10px" }}>
          {sortedPokemon.map((poke, index) => (
            <div key={index}>
              <Link
                href={`/views/12345678/details?name=${poke.name}`}
                style={{ color: "#0070f3" }}
              >
                {poke.name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default PokemonPage;
