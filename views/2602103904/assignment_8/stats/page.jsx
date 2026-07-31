"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PokemonStats() {
  const searchParams = useSearchParams();
  const pokemonName = searchParams.get("pokemon");
  const [pokemon, setPokemon] = useState(null);

  const getStatBarColor = (value) => {
    if (value >= 80) return "#22c55e";
    if (value >= 60) return "#3b82f6";
    if (value >= 40) return "#f59e0b";
    return "#ef4444";
  };

  useEffect(() => {
    if (!pokemonName) return;

    const fetchPokemon = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
      );
      const data = await response.json();
      setPokemon(data);
    };
    fetchPokemon();
  }, [pokemonName]);

  if (!pokemon) {
    return <div></div>;
  }

  return (
    <div>
      <div
        style={{
          marginBottom: "20px",
          borderBottom: "2px solid #ccc",
          padding: "15px 30px",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
        }}
      >
        <Link
          href={`/2602103904/assignment_8`}
          style={{
            justifySelf: "start",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "26px",
            textDecoration: "none",
            color: "black",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m10 18l-6-6l6-6l1.4 1.45L7.85 11H20v2H7.85l3.55 3.55z"
            />
          </svg>
          Back
        </Link>
        <h1
          style={{
            textTransform: "capitalize",
            fontSize: "34px",
            fontWeight: "bold",
            textAlign: "center",
            margin: 0,
          }}
        >
          {pokemon.name}
          <span style={{ color: "gray", marginLeft: "15px" }}>
            #{pokemon.id}
          </span>
        </h1>
        <div />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <img
          src={pokemon.sprites?.front_default}
          alt={pokemon.name}
          style={{
            height: "300px",
            backgroundColor: "#DCDCDC",
            borderRadius: "10px",
          }}
        />
        <div>
          <div
            style={{
              borderRadius: "12px",
              backgroundColor: "#82EEFD",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              boxShadow: "inset 10px rgba(0, 0, 0, 0.1)",
              fontSize: "20px",
            }}
          >
            <div style={{ display: "flex", gap: "40px" }}>
              <div>
                Height
                <div style={{ fontWeight: "bold", fontSize: "26px" }}>
                  {pokemon.height / 10} m
                </div>
              </div>
              <div style={{ textTransform: "capitalize" }}>
                Ability{" "}
                <div style={{ fontWeight: "bold", fontSize: "26px" }}>
                  {pokemon.abilities[0]?.ability.name}
                </div>
              </div>
            </div>
            <div>
              Weight
              <div style={{ fontWeight: "bold", fontSize: "26px" }}>
                {pokemon.weight / 10} kg
              </div>
            </div>
          </div>

          <div
            style={{ fontSize: "24px", fontWeight: "bold", marginTop: "20px" }}
          >
            Type
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              {pokemon.types?.map((type) => (
                <div
                  key={type.type.name}
                  style={{
                    backgroundColor: "#3b82f6",
                    color: "white",
                    padding: "5px 18px",
                    borderRadius: "15px",
                    textTransform: "capitalize",
                    display: "inline-block",
                    fontSize: "20px",
                  }}
                >
                  {type.type.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          margin: "30px auto 0",
          display: "block",
          width: "fit-content",
          textAlign: "left",
          fontSize: "24px",
          fontWeight: "bold",
          backgroundColor: "#82EEFD",
          padding: "20px 40px",
          borderRadius: "12px",
          boxShadow: "inset 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        Statistics
        <div style={{ marginTop: "12px" }}>
          {pokemon.stats?.map((stat) => {
            const percent = Math.min((stat.base_stat / 100) * 100, 100);

            return (
              <div
                key={stat.stat.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "30px",
                  marginTop: "10px",
                }}
              >
                <div style={{ textTransform: "capitalize", minWidth: "180px" }}>
                  {stat.stat.name}
                </div>

                <div
                  style={{
                    width: "220px",
                    height: "8px",
                    backgroundColor: "#e5e7eb",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${percent}%`,
                      height: "100%",
                      backgroundColor: getStatBarColor(stat.base_stat),
                      borderRadius: "10px",
                    }}
                  />
                </div>

                <div style={{ minWidth: "40px", textAlign: "right" }}>
                  {stat.base_stat}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
