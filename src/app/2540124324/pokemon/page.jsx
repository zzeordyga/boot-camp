'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function Pokemon() {
  const [pokemonList, setPokemonList] = useState([]);
  const router = useRouter();

  const fetchPokemonList = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100");
      const results = response.data.results;

      const detailPromises = results.map(poke =>
        axios.get(poke.url).then(res => res.data)
      );
      const details = await Promise.all(detailPromises);
      setPokemonList(details);
    } catch (error) {
      console.error("Error fetching Pokémon list:", error);
      setPokemonList([]);
    }
  };

  useEffect(() => {
    fetchPokemonList();
  }, []);

  return (
    <div>
      <h2>Pokémon List</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "1rem",
        }}
      >
        {pokemonList.slice(0, 100).map((poke) => (
          <div
            key={poke.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              textAlign: "center",
              background: "#fafafa",
              cursor: "pointer",
            }}
            onClick={() => router.push(`/2540124324/pokemon/${poke.id}`)}
          >
            <img src={poke.sprites.front_default} alt={poke.name} />
            <p style={{ textTransform: "capitalize", margin: "0.5rem 0 0 0" }}>{poke.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pokemon;
