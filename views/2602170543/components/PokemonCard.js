import { formatPokemonId } from "../lib/utils";

export default function PokemonCard({ pokemon, onClick }) {
  return (
    <div
      onClick={() => onClick(pokemon)}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
    >
      <div className="flex flex-col items-center">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
          alt={pokemon.name}
          className="w-24 h-24"
        />
        <h3 className="text-lg font-semibold capitalize mt-2">
          {pokemon.name}
        </h3>
        <p className="text-sm text-gray-500">#{formatPokemonId(pokemon.id)}</p>
      </div>
    </div>
  );
}
