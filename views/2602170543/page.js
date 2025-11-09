"use client";
import { useState, useRef, useMemo, useEffect } from "react";
import Layout from "./components/Layout";
import PokemonCard from "./components/PokemonCard";
import PokemonDetails from "./components/PokemonDetails";
import SearchBar from "./components/SearchBar";
import LoadSpinner from "./components/LoadSpinner";
import usePokemon from "./hooks/usePokemon";
import usePokemonDetails from "./hooks/usePokemonDetails";

export default function Page() {
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);

  const { pokemonList, loading } = usePokemon();
  const { details, loading: detailsLoading } =
    usePokemonDetails(selectedPokemonId);

  const filteredPokemon = useMemo(() => {
    return pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pokemonList, searchTerm]);

  useEffect(() => {
    if (!selectedPokemonId && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [selectedPokemonId]);

  const handleSelectPokemon = (pokemon) => {
    setSelectedPokemonId(pokemon.id);
  };

  const handleBack = () => {
    setSelectedPokemonId(null);
  };

  if (selectedPokemonId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Layout>
          {detailsLoading ? (
            <LoadSpinner />
          ) : (
            <PokemonDetails details={details} onBack={handleBack} />
          )}
        </Layout>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Layout>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Pokémon Explorer
          </h2>
          <p className="text-gray-600 mb-4">
            Browse and explore Pokémon. Click on any card to view detailed
            information.
          </p>

          <SearchBar
            ref={searchInputRef}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            resultCount={filteredPokemon.length}
          />
        </div>

        {loading ? (
          <LoadSpinner />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredPokemon.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  onClick={handleSelectPokemon}
                />
              ))}
            </div>

            {filteredPokemon.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No Pokémon found matching "
                  <span className="font-semibold">{searchTerm}</span>"
                </p>
              </div>
            )}
          </>
        )}
      </Layout>
    </div>
  );
}
