'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const API = 'https://pokeapi.co/api/v2/pokemon'

function DetailContent() {
  const params = useSearchParams()
  const nama = params.get('nama')
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!nama) {
      setLoading(false)
      setError('Pokémon belum dipilih.')
      return
    }
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`${API}/${nama}`)
        if (!res.ok) throw new Error('Tidak ditemukan')
        setPokemon(await res.json())
      } catch {
        setError('Pokémon tidak ditemukan atau data gagal dimuat.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [nama])

  const maxStat = useMemo(() => {
    if (!pokemon) return 100
    return Math.max(...pokemon.stats.map((s) => s.base_stat), 100)
  }, [pokemon])

  if (loading) return <div className="mv-state">Memuat detail...</div>
  if (error) return <div className="mv-state mv-error">{error}</div>

  return (
    <div className="mv-detail">
      <img
        src={pokemon.sprites.other['official-artwork'].front_default}
        alt={pokemon.name}
      />
      <div>
        <div className="mv-number">#{String(pokemon.id).padStart(3, '0')}</div>
        <h1 className="mv-title" style={{ textTransform: 'capitalize' }}>
          {pokemon.name}
        </h1>
        <div className="mv-badges">
          {pokemon.types.map((t) => (
            <span className="mv-badge" key={t.type.name}>
              {t.type.name}
            </span>
          ))}
        </div>
        <div className="mv-facts">
          <span>
            Tinggi: <strong>{pokemon.height / 10} m</strong>
          </span>
          <span>
            Berat: <strong>{pokemon.weight / 10} kg</strong>
          </span>
        </div>
        {pokemon.stats.map((s) => (
          <div className="mv-stat" key={s.stat.name}>
            <span>{s.stat.name.replace('-', ' ')}</span>
            <strong>{s.base_stat}</strong>
            <div className="mv-bar">
              <span style={{ width: `${(s.base_stat / maxStat) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DetailsPage() {
  return (
    <div>
      <Link href="/2602084395" className="mv-back">
        ← Kembali ke daftar
      </Link>
      <Suspense fallback={<div className="mv-state">Memuat detail...</div>}>
        <DetailContent />
      </Suspense>
    </div>
  )
}
