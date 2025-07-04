import axios from "axios";
import Link from "next/link";


// ✅ Required for static export
export async function generateStaticParams() {
  const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100");
  const results = response.data.results;

  // Extract IDs from each Pokémon detail
  const detailPromises = results.map(poke =>
    axios.get(poke.url).then(res => res.data)
  );
  const details = await Promise.all(detailPromises);

  return details.map(poke => ({
    id: poke.id.toString(), // Must be string
  }));
}

// ✅ Page component
export default async function PokemonDetails({ params }) {
  const { id } = params;
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon = response.data;

  return (
    <div style={{ padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2 style={{ textTransform: "capitalize" }}>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} style={{ width: '16rem' }}/>
      <p><strong>Height:</strong> {pokemon.height}</p>
      <p><strong>Weight:</strong> {pokemon.weight}</p>
      <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>
      <Link href={'/2540124324/pokemon'}><p>Back</p></Link>
    </div>
  );
}
