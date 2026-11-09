"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../layout";

export default function PokemonDetails() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPokemonDetails() {
      try {
        const params = new URLSearchParams(window.location.search);
        const pokemonName = params.get("pokemon");

        if (!pokemonName) {
          throw new Error("Pokémon name was not provided.");
        }

        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
        );

        if (!response.ok) {
          throw new Error("Pokémon not found.");
        }

        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonDetails();
  }, []);

  if (loading) {
    return (
      <Layout>
        <p className="text-center text-slate-400 py-20">
          Loading Pokémon details...
        </p>
      </Layout>
    );
  }

  if (error || !pokemon) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Pokémon Not Found</h2>
          <p className="text-slate-400 mt-3">{error}</p>

          <Link
            href="/2602083814"
            className="inline-block mt-6 bg-yellow-400 text-slate-950 px-6 py-3 rounded-lg font-semibold"
          >
            Back to Pokédex
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Link
        href="/2602083814"
        className="text-yellow-400 hover:text-yellow-300"
      >
        ← Back to Pokédex
      </Link>

      <div className="grid md:grid-cols-2 gap-10 mt-8">
        {/* Pokémon Image */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center p-8">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-full max-w-sm object-contain"
          />
        </div>

        {/* Pokémon Information */}
        <div>
          <p className="text-yellow-400 font-semibold">
            #{String(pokemon.id).padStart(3, "0")}
          </p>

          <h2 className="text-4xl font-bold capitalize mt-2">
            {pokemon.name}
          </h2>

          <div className="flex gap-2 mt-4">
            {pokemon.types.map((item) => (
              <span
                key={item.type.name}
                className="bg-yellow-400 text-slate-950 px-4 py-1 rounded-full text-sm font-semibold capitalize"
              >
                {item.type.name}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-slate-900 rounded-xl p-4">
              <p className="text-slate-400 text-sm">Height</p>
              <p className="text-xl font-bold mt-1">
                {pokemon.height / 10} m
              </p>
            </div>

            <div className="bg-slate-900 rounded-xl p-4">
              <p className="text-slate-400 text-sm">Weight</p>
              <p className="text-xl font-bold mt-1">
                {pokemon.weight / 10} kg
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold mt-8 mb-4">
            Base Stats
          </h3>

          <div className="space-y-4">
            {pokemon.stats.map((item) => (
              <div key={item.stat.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize text-slate-400">
                    {item.stat.name.replace("-", " ")}
                  </span>

                  <span className="font-semibold">
                    {item.base_stat}
                  </span>
                </div>

                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{
                      width: `${Math.min(item.base_stat, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}