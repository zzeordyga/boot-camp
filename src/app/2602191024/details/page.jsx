'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const DetailsPage = () => {
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id')

    if (!id) {
      setError('Pokemon ID not found.')
      setLoading(false)
      return
    }

    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        )

        if (!response.ok) {
          throw new Error('Pokemon not found')
        }

        const data = await response.json()
        setPokemon(data)
      } catch (err) {
        setError('Unable to load Pokémon details.')
      } finally {
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [])

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg font-semibold text-gray-500">
          Loading Pokémon...
        </p>
      </main>
    )
  }

  if (error || !pokemon) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50">
        <p className="text-red-600">{error}</p>

        <Link
          href="/2602191024"
          className="rounded-lg bg-red-600 px-5 py-2 text-white"
        >
          Back to Pokémon
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-red-600 px-6 py-8 text-white">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/2602191024"
            className="text-sm text-red-100 hover:text-white"
          >
            ← Back to Pokémon Explorer
          </Link>

          <h1 className="mt-4 text-3xl font-bold capitalize">
            {pokemon.name}
          </h1>

          <p className="mt-2 text-red-100">
            #{String(pokemon.id).padStart(3, '0')}
          </p>
        </div>
      </header>

      {/* Details */}
      <section className="mx-auto max-w-5xl px-6 py-10">

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

          {/* Pokemon Image */}
          <div className="flex items-center justify-center rounded-2xl bg-white p-8 shadow-sm">
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              className="w-full max-w-sm object-contain"
            />
          </div>

          {/* Pokemon Information */}
          <div className="rounded-2xl bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold">
              Information
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-4">

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Height</p>
                <p className="mt-1 text-xl font-bold">
                  {pokemon.height / 10} m
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Weight</p>
                <p className="mt-1 text-xl font-bold">
                  {pokemon.weight / 10} kg
                </p>
              </div>

            </div>

            {/* Types */}
            <div className="mt-6">
              <h3 className="font-semibold">Types</h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className="rounded-full bg-red-100 px-4 py-2 font-semibold capitalize text-red-700"
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Abilities */}
            <div className="mt-6">
              <h3 className="font-semibold">Abilities</h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {pokemon.abilities.map((ability) => (
                  <span
                    key={ability.ability.name}
                    className="rounded-full bg-gray-100 px-4 py-2 capitalize"
                  >
                    {ability.ability.name.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-2xl font-bold">
            Base Stats
          </h2>

          <div className="space-y-5">

            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name}>

                <div className="mb-2 flex justify-between">
                  <span className="font-medium capitalize">
                    {stat.stat.name.replace('-', ' ')}
                  </span>

                  <span className="font-bold">
                    {stat.base_stat}
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-gray-200">

                  <div
                    className="h-full rounded-full bg-red-500"
                    style={{
                      width: `${Math.min(stat.base_stat / 255 * 100, 100)}%`,
                    }}
                  />

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            href="/2602191024"
            className="inline-block rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Back to Pokémon Explorer
          </Link>
        </div>

      </section>

    </main>
  )
}

export default DetailsPage