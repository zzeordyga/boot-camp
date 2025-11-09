const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemonList(limit = 50) {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon list");
  }

  const data = await response.json();

  const pokemonWithIds = data.results.map((pokemon, index) => ({
    ...pokemon,
    id: index + 1,
  }));

  return pokemonWithIds;
}

export async function fetchPokemonDetails(id) {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon details");
  }

  return await response.json();
}
