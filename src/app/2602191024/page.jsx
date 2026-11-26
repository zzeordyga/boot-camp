
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'

const MyPage = () => {
  const [pokemon, setPokemon] = useState([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const inputRef = useRef(null)

  const pokemonPerPage = 12

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=151'
        )
        const data = await response.json()

        const detailedPokemon = await Promise.all(
          data.results.map(async (item, index) => {
            const res = await fetch(item.url)
            const details = await res.json()

            return {
              id: index + 1,
              name: item.name,
              image: details.sprites.other['official-artwork'].front_default,
              types: details.types.map((t) => t.type.name),
            }
          })
        )

        setPokemon(detailedPokemon)
      } catch (error) {
        console.error('Failed to fetch Pokemon:', error)
      }
    }

    fetchPokemon()
  }, [])

  const filteredPokemon = useMemo(() => {
    return pokemon.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      String(p.id).includes(search)
    )
  }, [pokemon, search])

  const totalPages = Math.ceil(filteredPokemon.length / pokemonPerPage)

  const currentPokemon = filteredPokemon.slice(
    (currentPage - 1) * pokemonPerPage,
    currentPage * pokemonPerPage
  )

  const handleSearch = (value) => {
    setSearch(value)
    setCurrentPage(1)
  }

  const typeColors = {
    fire: 'bg-orange-100 text-orange-700',
    water: 'bg-blue-100 text-blue-700',
    grass: 'bg-green-100 text-green-700',
    electric: 'bg-yellow-100 text-yellow-700',
    poison: 'bg-purple-100 text-purple-700',
    bug: 'bg-lime-100 text-lime-700',
    normal: 'bg-gray-100 text-gray-700',
    flying: 'bg-sky-100 text-sky-700',
    ground: 'bg-amber-100 text-amber-700',
    fairy: 'bg-pink-100 text-pink-700',
    fighting: 'bg-red-100 text-red-700',
    psychic: 'bg-fuchsia-100 text-fuchsia-700',
    rock: 'bg-stone-100 text-stone-700',
    ghost: 'bg-indigo-100 text-indigo-700',
    ice: 'bg-cyan-100 text-cyan-700',
    dragon: 'bg-violet-100 text-violet-700',
    dark: 'bg-slate-200 text-slate-700',
    steel: 'bg-zinc-200 text-zinc-700',
  }

  return (
    <main className="min-h-screen bg-[#f5f6f8] text-gray-900">

      {/* Hero */}
      <section className="bg-red-600 px-6 py-12 text-white">
        <div className="mx-auto max-w-6xl">

          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-red-200">
                Pokédex Explorer
              </p>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                Discover Pokémon
              </h1>

              <p className="mt-3 max-w-lg text-red-100">
                Explore, search, and learn about your favorite Pokémon.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 px-6 py-4 backdrop-blur-sm">
              <p className="text-sm text-red-100">Pokémon Database</p>
              <p className="mt-1 text-3xl font-bold">Generation I</p>
              <p className="text-sm text-red-100">151 Pokémon</p>
            </div>
          </div>

        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-6xl px-6 py-10">

        {/* Search */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row">

          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔎
            </span>

            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search Pokémon by name or number..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 shadow-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
            />
          </div>

          <button
            onClick={() => {
              setSearch('')
              setCurrentPage(1)
              inputRef.current?.focus()
            }}
            className="rounded-xl border border-gray-200 bg-white px-5 py-3 font-medium text-gray-600 transition hover:bg-gray-100"
          >
            Clear
          </button>

        </div>

        {/* Results information */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Pokémon Collection</h2>
            <p className="mt-1 text-sm text-gray-500">
              Showing {filteredPokemon.length} Pokémon
            </p>
          </div>

          <span className="rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-red-600">
            Page {currentPage} / {Math.max(totalPages, 1)}
          </span>
        </div>

        {/* Pokemon Cards */}
        {pokemon.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <p className="text-gray-500">Loading Pokémon...</p>
          </div>
        ) : currentPokemon.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <p className="text-lg font-semibold">No Pokémon found</p>
            <p className="mt-2 text-gray-500">
              Try searching for another Pokémon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {currentPokemon.map((p) => (
              <Link
                key={p.id}
                href={`/2602191024/details?id=${p.id}`}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="relative bg-gray-50 p-6">

                  <span className="absolute right-4 top-4 text-sm font-bold text-gray-400">
                    #{String(p.id).padStart(3, '0')}
                  </span>

                  <img
                    src={p.image}
                    alt={p.name}
                    className="mx-auto h-40 w-40 object-contain transition duration-300 group-hover:scale-110"
                  />

                </div>

                <div className="p-5">

                  <h3 className="text-lg font-bold capitalize">
                    {p.name}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.types.map((type) => (
                      <span
                        key={type}
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                          typeColors[type] || 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {type}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">

                    <span className="text-sm text-gray-400">
                      View details
                    </span>

                    <span className="font-semibold text-red-500 transition group-hover:translate-x-1">
                      →
                    </span>

                  </div>

                </div>

              </Link>
            ))}

          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">

            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 font-medium transition hover:bg-gray-100 disabled:opacity-40"
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) =>
                page === 1 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 1
              )
              .map((page, index, arr) => (
                <div key={page} className="contents">
                  {index > 0 && arr[index - 1] !== page - 1 && (
                    <span className="px-1 text-gray-400">...</span>
                  )}

                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-lg px-4 py-2 font-semibold transition ${
                      currentPage === page
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'border border-gray-200 bg-white hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                </div>
              ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 font-medium transition hover:bg-gray-100 disabled:opacity-40"
            >
              Next →
            </button>

          </div>
        )}

      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-400">
        Pokédex Explorer · Powered by PokéAPI
      </footer>

    </main>
  )
}

export default MyPage
