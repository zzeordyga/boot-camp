import { formatPokemonId, formatStatName } from "../lib/utils";

export default function PokemonDetails({ details, onBack }) {
  if (!details) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <button
        onClick={onBack}
        className="mb-4 text-purple-600 hover:text-purple-800 flex items-center font-medium"
      >
        ← Back to List
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <img
            src={details.sprites.other["official-artwork"].front_default}
            alt={details.name}
            className="w-64 h-64"
          />
          <h2 className="text-3xl font-bold capitalize mt-4">{details.name}</h2>
          <p className="text-gray-500">#{formatPokemonId(details.id)}</p>
        </div>

        <div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Types</h3>
            <div className="flex gap-2">
              {details.types.map((type) => (
                <span
                  key={type.type.name}
                  className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 capitalize font-medium"
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Stats</h3>
            <div className="space-y-2">
              {details.stats.map((stat) => (
                <div key={stat.stat.name}>
                  <div className="flex justify-between mb-1">
                    <span className="capitalize text-sm">
                      {formatStatName(stat.stat.name)}
                    </span>
                    <span className="text-sm font-semibold">
                      {stat.base_stat}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all"
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Abilities</h3>
            <ul className="list-disc list-inside space-y-1">
              {details.abilities.map((ability) => (
                <li key={ability.ability.name} className="capitalize">
                  {ability.ability.name.replace("-", " ")}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Height</p>
              <p className="font-semibold">{details.height / 10} m</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Weight</p>
              <p className="font-semibold">{details.weight / 10} kg</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
