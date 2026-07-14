"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";

export default function KevinProfile() {
  const [likes, setLikes] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const searchRef = useRef(null);
  const sortedPokemon = useMemo(() => {
    return [...pokemon].sort((a, b) => a.name.localeCompare(b.name));
  }, [pokemon]);

  useEffect(() => {
    const now = new Date();
    setCurrentTime(now.toLocaleString());
  }, []);
  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=10",
        );

        const data = await response.json();

        setPokemon(data.results);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPokemon();
  }, []);

  return (
    <div>
      <p>
        I'm a Computer Science student at BINUS University. I'm so passionate
        about tech, gaming industry, automotive, and continuously learning new
        skills in IT.
      </p>

      <h3>My Hobbies</h3>

      <ul>
        <li>🚗 Automotive</li>
        <li>💻 Technology</li>
        <li>🎮 Gaming</li>
        <li>⚽ Sports</li>
      </ul>

      <hr />

      <p>
        <strong>Page opened at:</strong> {currentTime}
      </p>

      <button
        onClick={() => setLikes(likes + 1)}
        style={{
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          backgroundColor: "#2563eb",
          color: "white",
          cursor: "pointer",
        }}
      >
        👍 Like ({likes})
      </button>

      <hr style={{ margin: "30px 0" }} />

      <h2 ref={searchRef}>Pokémon Explorer</h2>

      <button
        onClick={() =>
          searchRef.current?.scrollIntoView({ behavior: "smooth" })
        }
        style={{
          padding: "8px 16px",
          marginBottom: "15px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Go to Pokémon List
      </button>
      <ul>
        {sortedPokemon.map((item) => (
          <div
            key={item.name}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#fafafa",
            }}
          >
            <div>
              <h3 style={{ textTransform: "capitalize", marginBottom: "6px" }}>
                {item.name}
              </h3>

              <small>{item.url}</small>
            </div>

            <Link
              href={`/2602076885/details?name=${item.name}`}
              style={{
                background: "#2563eb",
                color: "white",
                padding: "8px 16px",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              View Detail
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
}
