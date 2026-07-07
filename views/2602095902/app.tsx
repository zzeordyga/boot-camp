// app/page.tsx
'use client';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

interface PokemonItem {
    name: string;
    url: string;
}

export default function HomePage() {
    const [pokemonList, setPokemonList] = useState<PokemonItem[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchPokemon() {
            try {
                const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
                if (!res.ok) throw new Error('Failed to fetch data');
                const data = await res.json();
                setPokemonList(data.results);
            } catch (err: any) {
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        }
        fetchPokemon();
    }, []);

    const filteredPokemon = useMemo(() => {
        return pokemonList.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [pokemonList, searchQuery]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight">Kanto Region Database</h2>
                    <p className="text-gray-500">Select a specimen to view hyper-specific cellular and combat data.</p>
                </div>
                <input
                    type="text"
                    placeholder="Search species..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredPokemon.map((pokemon, index) => {
                    const urlParts = pokemon.url.split('/');
                    const id = urlParts[urlParts.length - 2];

                    return (
                        <Link
                            key={pokemon.name}
                            href={`/2602095902/details/${id}`}
                            className="group p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all text-center flex flex-col items-center"
                        >
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                                <img
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                                    alt={pokemon.name}
                                    className="w-16 h-16 object-contain"
                                    loading="lazy"
                                />
                            </div>
                            <span className="text-xs font-mono text-gray-400 font-bold">#{id.padStart(3, '0')}</span>
                            <h3 className="capitalize font-semibold text-gray-800 group-hover:text-blue-600 transition-colors mt-1">
                                {pokemon.name}
                            </h3>
                        </Link>
                    );
                })}
            </div>

            {filteredPokemon.length === 0 && (
                <p className="text-center text-gray-400 py-12">No match found for "{searchQuery}"</p>
            )}
        </div>
    );
}