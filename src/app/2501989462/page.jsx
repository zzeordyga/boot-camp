"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";

const MyPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const listRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        const data = await res.json();
        setPokemonList(data.results);
      } catch (error) {
        console.error("Failed to fetch Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sortedPokemon = useMemo(() => {
    return [...pokemonList].sort((a, b) => a.name.localeCompare(b.name));
  }, [pokemonList]);

  return (
    <>
      <h2 style={{ marginBottom: "20px" }}>List of Pokémon</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div
          ref={listRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "20px",
          }}
        >
          {sortedPokemon.map((poke, index) => (
            <Link
              key={index}
              href={`/2501989462/details?name=${poke.name}`}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "10px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
                textAlign: "center",
                textDecoration: "none",
                color: "#333",
                fontWeight: "bold",
                textTransform: "capitalize",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 4px 10px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 2px 5px rgba(0, 0, 0, 0.05)";
              }}
            >
              {poke.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default MyPage;
