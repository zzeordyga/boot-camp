"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PokemonExplorer() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=20",
      );
      const data = await response.json();
      setPokemon(data.results);

      const detailPokemon = await Promise.all(
        data.results.map(async (item) => {
          const res = await fetch(item.url);
          return res.json();
        }),
      );
      setPokemon(detailPokemon);
    };
    fetchPokemon();
  }, []);

  return (
    <div>
      <header
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "38px",
          fontWeight: "bold",
          borderBottom: "2px solid #ccc",
          padding: "20px",
        }}
      >
        Pokemon Explorer
      </header>

      {pokemon.map((item) => (
        <Link
          href={`/2602103904/assignment_8/stats?pokemon=${item.name}`}
          key={item.name}
          style={{
            backgroundColor: "#E5E5EA",
            borderRadius: "8px",
            color: "white",
            margin: "10px",
            display: "inline-block",
            justifyContent: "center",
          }}
        >
          <img
            src={item.sprites?.front_default}
            alt={item.name}
            style={{ height: "210px", width: "auto", padding: "15px" }}
          />
          <div
            style={{
              backgroundColor: "white",
              color: "black",
              padding: "10px",
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
              border: "2px solid #ccc",
              boxShadow: "inset 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p style={{ margin: 0, fontSize: "24px" }}>#{item.id}</p>
            <p
              style={{
                margin: 0,
                textTransform: "capitalize",
                fontSize: "28px",
                fontWeight: "bold",
                lineHeight: 2,
              }}
            >
              {item.name}
            </p>
            <div>
              {item.types?.map((type) => (
                <div
                  key={type.type.name}
                  style={{
                    backgroundColor: "#3b82f6",
                    color: "white",
                    padding: "5px 18px",
                    borderRadius: "15px",
                    textTransform: "capitalize",
                    display: "inline-block",
                    marginRight: "10px",
                    fontSize: "20px",
                  }}
                >
                  {type.type.name}
                </div>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
