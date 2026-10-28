'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'

const BASE = '/2602084395'
const PAGE_SIZE = 24
const API = 'https://pokeapi.co/api/v2/pokemon'

const getId = (url) => url.split('/').filter(Boolean).pop()
const getImage = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

export default function HomePage() {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [keyword, setKeyword] = useState('')
  const [favorites, setFavorites] = useState([])
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [limit, setLimit] = useState(PAGE_SIZE)
  const searchRef = useRef(null)

  useEffect(() => {
    searchRef.current?.focus()
    try {
      const saved = JSON.parse(localStorage.getItem('mv-favorites') || '[]')
      setFavorites(saved)
    } catch {
      setFavorites([])
    }
  }, [])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}?limit=151`)
        if (!res.ok) throw new Error('Gagal memuat data')
        const json = await res.json()
        setPokemons(
          json.results.map((item) => ({
            name: item.name,
            id: getId(item.url),
          }))
        )
      } catch (err) {
        setError('Data tidak dapat dimuat. Periksa koneksi internet lalu muat ulang halaman.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    const key = keyword.trim().toLowerCase()
    return pokemons.filter((p) => {
      const matchName = p.name.includes(key) || p.id === key
      const matchFav = !onlyFavorites || favorites.includes(p.name)
      return matchName && matchFav
    })
  }, [pokemons, keyword, onlyFavorites, favorites])

  const visible = useMemo(() => filtered.slice(0, limit), [filtered, limit])

  const toggleFavorite = (name) => {
    setFavorites((prev) => {
      const next = prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
      try {
        localStorage.setItem('mv-favorites', JSON.stringify(next))
      } catch {}
      return next
    })
  }

  return (
    <div>
      <h1 className="mv-title">Jelajahi Pokédex</h1>
      <p className="mv-subtitle">
        Cari Pokémon generasi pertama, tandai favoritmu, dan lihat detail statistiknya.
      </p>

      <div className="mv-toolbar">
        <input
          ref={searchRef}
          className="mv-input"
          type="text"
          placeholder="Cari berdasarkan nama atau nomor..."
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value)
            setLimit(PAGE_SIZE)
          }}
        />
        <button
          className={`mv-toggle ${onlyFavorites ? 'mv-active' : ''}`}
          onClick={() => {
            setOnlyFavorites((v) => !v)
            setLimit(PAGE_SIZE)
          }}
        >
          ♥ Favorit ({favorites.length})
        </button>
      </div>

      {loading && <div className="mv-state">Memuat data Pokémon...</div>}
      {error && <div className="mv-state mv-error">{error}</div>}

      {!loading && !error && filtered.length === 0 && (
        <div className="mv-state">Tidak ada Pokémon yang cocok.</div>
      )}

      <div className="mv-grid">
        {visible.map((p) => (
          <div className="mv-card" key={p.name}>
            <button
              className={`mv-fav ${favorites.includes(p.name) ? 'mv-on' : ''}`}
              onClick={() => toggleFavorite(p.name)}
              aria-label={`Favorit ${p.name}`}
            >
              ♥
            </button>
            <img src={getImage(p.id)} alt={p.name} loading="lazy" />
            <div className="mv-number">#{String(p.id).padStart(3, '0')}</div>
            <h3 className="mv-name">{p.name}</h3>
            <Link href={`${BASE}/details?nama=${p.name}`} className="mv-link">
              Lihat detail
            </Link>
          </div>
        ))}
      </div>

      {visible.length < filtered.length && (
        <button className="mv-more" onClick={() => setLimit((l) => l + PAGE_SIZE)}>
          Tampilkan lebih banyak
        </button>
      )}
    </div>
  )
}
