'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function DetailsPage() {
  const searchParams = useSearchParams();
  const pokemonName = searchParams.get('name');
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pokemonName) return;

    async function fetchDetails() {
      try {
        setLoading(true);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data = await response.json();
        setPokemonDetails(data);
      } catch (error) {
        console.error("Failed to fetch pokemon details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [pokemonName]); // Dijalankan ulang jika pokemonName berubah

  if (loading) {
    return <p className="text-center text-xl">Loading details...</p>;
  }

  if (!pokemonDetails) {
    return <p className="text-center text-xl">Could not find details for this Pokémon.</p>;
  }

  return (
    <div className="bg-gray-800 p-8 rounded-lg max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center capitalize mb-4">{pokemonDetails.name}</h2>
      <div className="relative w-48 h-48 mx-auto mb-4">
        <Image
          src={pokemonDetails.sprites.front_default}
          alt={`Gambar dari ${pokemonDetails.name}`}
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="text-left">
        <p><span className="font-bold">Height:</span> {pokemonDetails.height * 10} cm</p>
        <p><span className="font-bold">Weight:</span> {pokemonDetails.weight / 10} kg</p>
        <p className="font-bold mt-2">Types:</p>
        <ul className="list-disc list-inside">
          {pokemonDetails.types.map(typeInfo => (
            <li key={typeInfo.type.name} className="capitalize">{typeInfo.type.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
