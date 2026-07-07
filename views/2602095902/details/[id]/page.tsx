'use client';
import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface PokemonDetails {
    name: string;
    id: number;
    height: number;
    weight: number;
    sprites: { front_default: string };
    abilities: Array<{ ability: { name: string } }>;
    stats: Array<{ base_stat: number; stat: { name: string } }>;
}

export default function DetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id;

    const [details, setDetails] = useState<PokemonDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // useRef keeps track of how many times this component renders for metric analytics
    const renderCounter = useRef(0);
    renderCounter.current += 1;

    useEffect(() => {
        if (!id) return;

        async function fetchDetails() {
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                if (!res.ok) throw new Error('Failed to fetch data for this specimen.');
                const data = await res.json();
                setDetails(data);
            } catch (err: any) {
                setError(err.message || 'Network anomaly detected.');
            } finally {
                setLoading(false);
            }
        }

        fetchDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-pulse text-gray-500 font-mono">Parsing encryption stream...</div>
            </div>
        );
    }

    if (error || !details) {
        return (
            <div className="text-center max-w-md mx-auto py-12 space-y-4">
                <div className="p-4 bg-red-50 rounded-lg text-red-700 border border-red-100">{error || 'Specimen missing.'}</div>
                <button onClick={() => router.push('/')} className="text-blue-600 hover:underline text-sm font-medium">
                    Return to safe database
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <button
                onClick={() => router.push('/')}
                className="flex items-center text-sm font-medium text-red-600 hover:text-blue-600 transition-colors"
            >
                Back to full list
            </button>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-3">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
                    <img
                        src={details.sprites.front_default}
                        alt={details.name}
                        className="w-32 h-32 object-contain filter drop-shadow-md"
                    />
                    <span className="text-xs font-mono font-bold text-indigo-400 mt-2">ID: #{details.id}</span>
                    <h2 className="text-2xl font-bold text-gray-800 capitalize mt-1">{details.name}</h2>
                </div>

                <div className="p-8 md:col-span-2 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <span className="text-xs text-gray-400 block font-medium uppercase tracking-wider">Height</span>
                            <span className="text-lg font-bold text-gray-700">{details.height / 10} m</span>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <span className="text-xs text-gray-400 block font-medium uppercase tracking-wider">Weight</span>
                            <span className="text-lg font-bold text-gray-700">{details.weight / 10} kg</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Innate Abilities</h3>
                        <div className="flex flex-wrap gap-2">
                            {details.abilities.map(({ ability }) => (
                                <span key={ability.name} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md capitalize tracking-wide border border-blue-100">
                                    {ability.name.replace('-', ' ')}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Core Matrices</h3>
                        <div className="space-y-2">
                            {details.stats.map((statItem) => (
                                <div key={statItem.stat.name} className="flex items-center text-sm">
                                    <span className="w-24 text-gray-500 capitalize text-xs truncate">{statItem.stat.name.replace('-', ' ')}</span>
                                    <div className="flex-grow bg-gray-100 h-2 rounded-full overflow-hidden mx-3">
                                        <div
                                            className="bg-blue-500 h-full rounded-full transition-all duration-500"
                                            style={{ width: `${Math.min((statItem.base_stat / 150) * 100, 100)}%` }}
                                        />
                                    </div>
                                    <span className="w-8 text-right font-mono font-bold text-gray-700">{statItem.base_stat}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-right">
                <span className="text-[10px] font-mono text-gray-300">
                    State View Renders: {renderCounter.current}
                </span>
            </div>
        </div>
    );
}