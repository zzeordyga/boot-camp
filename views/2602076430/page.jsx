'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import './style.css'

const Index = () => {
    const [pokemonList, setPokemonList] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)

    const searchInputRef = useRef(null)
    const headingRef = useRef(null)

    useEffect(() => {
        if (headingRef.current) {
            headingRef.current.style.color = 'coral'
        }

        if (searchInputRef.current) {
            searchInputRef.current.focus()
        }

        const fetchPokemon = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
                const data = await response.json()
                setPokemonList(data.results)
                setLoading(false)
            } catch (error) {
                console.error('Gagal mengambil data Pokemon:', error)
                setLoading(false)
            }
        }

        fetchPokemon()
    }, [])

    const filteredPokemon = useMemo(() => {
        console.log('Menjalankan filter Pokemon via useMemo...')
        return pokemonList.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(search.toLowerCase())
        )
    }, [pokemonList, search])

    return (
        <div className="page p-6 max-w-4xl mx-auto space-y-6">
            <div className="card border p-6 rounded-xl bg-foreground/5 space-y-4 shadow-sm">
                <h1 ref={headingRef} className="text-2xl font-bold transition-colors">
                    Ferry Febrian - 2602076430
                </h1>

                <p className="description opacity-80 leading-relaxed">
                    Hello, I'm a fresh graduate with valuable experience as
                    an Intern @Kawan Lama and currently working as a
                    Developer @NTT.
                </p>

                <div className="space-y-2 pt-4">
                    <label htmlFor="pokemon-search" className="block text-sm font-semibold">
                        Cari Pokemon Kamu:
                    </label>
                    <input
                        id="pokemon-search"
                        ref={searchInputRef}
                        type="text"
                        placeholder="Ketik nama Pokemon (misal: bulbasaur)..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-3 rounded-lg bg-foreground text-primary border border-transparent focus:outline-none focus:ring-2 focus:ring-coral/50"
                    />
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">List Kanto Pokemon</h2>
                    <span className="text-sm opacity-70">
                        Menampilkan: <strong>{filteredPokemon.length}</strong> / {pokemonList.length}
                    </span>
                </div>

                {loading ? (
                    <p className="text-center py-10 opacity-70 animate-pulse">Sedang mengambil data dari PokeAPI...</p>
                ) : filteredPokemon.length === 0 ? (
                    <p className="text-center py-10 opacity-60">Pokemon "{search}" tidak ditemukan.</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {filteredPokemon.map((pokemon) => {
                            const pokemonId = pokemon.url.split('/').filter(Boolean).pop()
                            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`

                            return (
                                <div
                                    key={pokemon.name}
                                    className="p-4 border border-primary/10 rounded-xl bg-foreground/5 flex flex-col items-center text-center gap-2 hover:scale-105 transition-all shadow-sm"
                                >
                                    <img
                                        src={imageUrl}
                                        alt={pokemon.name}
                                        className="w-24 h-24 object-contain"
                                        loading="lazy"
                                    />
                                    <p className="capitalize font-semibold text-sm truncate w-full">
                                        {pokemon.name}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Index