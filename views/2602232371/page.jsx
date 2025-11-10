// src/app/2602232371/page.jsx
"use client";

import { useState, useEffect, useRef, useMemo } from "react";

export default function PokemonListPage() {
  // useState: Managing state for pokemon list and loading
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // useRef: Reference to search input for auto-focus
  const searchInputRef = useRef(null);

  // useEffect: Fetch pokemon data when component mounts
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        // Fetch first 20 pokemon
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        const data = await response.json();
        
        // Fetch details for each pokemon (to get images and types)
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );
        
        setPokemonList(pokemonDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pokemon:", error);
        setLoading(false);
      }
    };

    fetchPokemon();
    
    // Focus search input when page loads
    searchInputRef.current?.focus();
  }, []);

  // useMemo: Filter pokemon based on search term (optimized computation)
  const filteredPokemon = useMemo(() => {
    if (!searchTerm) return pokemonList;
    
    return pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pokemonList, searchTerm]);

  // useMemo: Calculate total stats
  const totalPokemon = useMemo(() => pokemonList.length, [pokemonList]);
  const displayedCount = useMemo(() => filteredPokemon.length, [filteredPokemon]);

  // Helper function to get type color
  const getTypeColor = (type) => {
    const colors = {
      fire: "#ef4444", water: "#3b82f6", grass: "#22c55e",
      electric: "#eab308", psychic: "#ec4899", ice: "#22d3ee",
      dragon: "#9333ea", dark: "#374151", fairy: "#f9a8d4",
      normal: "#9ca3af", fighting: "#c2410c", flying: "#818cf8",
      poison: "#a855f7", ground: "#a16207", rock: "#a16207",
      bug: "#16a34a", ghost: "#7c3aed", steel: "#6b7280",
    };
    return colors[type] || "#9ca3af";
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            border: '5px solid #e0e0e0',
            borderTop: '5px solid #16a34a',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
          <p style={{ marginTop: '20px', color: '#555', fontSize: '18px', fontWeight: '500' }}>
            Loading Pokemon...
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Page Header Card */}
      <div style={{ 
        background: 'white', 
        borderRadius: '16px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
        padding: '30px',
        marginBottom: '30px'
      }}>
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          color: '#1a1a1a', 
          margin: '0 0 12px 0',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ fontSize: '36px' }}>🔍</span>
          Explore Pokemon
        </h2>
        <p style={{ color: '#666', margin: 0, fontSize: '16px', lineHeight: '1.6' }}>
          Browse through the amazing world of Pokemon! Search and discover your favorites from the PokeAPI.
        </p>
      </div>

      {/* Search Card */}
      <div style={{ 
        background: 'white', 
        borderRadius: '16px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
        padding: '25px',
        marginBottom: '30px'
      }}>
        <label htmlFor="search" style={{ 
          display: 'block', 
          fontSize: '15px', 
          fontWeight: '600', 
          color: '#333', 
          marginBottom: '12px' 
        }}>
          🔎 Search Pokemon
        </label>
        <input
          id="search"
          ref={searchInputRef}
          type="text"
          placeholder="Type pokemon name (e.g., pikachu, charizard)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '14px 18px',
            border: '2px solid #e0e0e0',
            borderRadius: '10px',
            fontSize: '16px',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.3s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#2563eb'}
          onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
        />
        <div style={{ 
          marginTop: '12px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
            📊 Showing <strong>{displayedCount}</strong> of <strong>{totalPokemon}</strong> Pokemon
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              style={{
                padding: '6px 14px',
                background: '#f3f4f6',
                color: '#374151',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500'
              }}
              onMouseOver={(e) => e.target.style.background = '#e5e7eb'}
              onMouseOut={(e) => e.target.style.background = '#f3f4f6'}
            >
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      {/* Pokemon Grid */}
      {filteredPokemon.length > 0 ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '30px'
        }}>
          {filteredPokemon.map((pokemon) => (
            <div
              key={pokemon.id}
              style={{
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: '1px solid #f0f0f0'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
              }}
            >
              {/* Pokemon Image Section */}
              <div style={{ 
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                padding: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                minHeight: '180px'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(255,255,255,0.9)',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: '#666'
                }}>
                  #{String(pokemon.id).padStart(3, '0')}
                </div>
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  style={{ 
                    width: '140px', 
                    height: '140px', 
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                  }}
                />
              </div>

              {/* Pokemon Info Section */}
              <div style={{ padding: '20px' }}>
                <h3 style={{ 
                  fontSize: '22px', 
                  fontWeight: 'bold', 
                  color: '#1a1a1a', 
                  textTransform: 'capitalize',
                  margin: '0 0 12px 0'
                }}>
                  {pokemon.name}
                </h3>

                {/* Pokemon Types */}
                <div style={{ 
                  display: 'flex', 
                  gap: '8px', 
                  marginBottom: '16px', 
                  flexWrap: 'wrap' 
                }}>
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: getTypeColor(type.type.name),
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>

                {/* Pokemon Stats */}
                <div style={{ 
                  background: '#f8f9fa', 
                  borderRadius: '10px', 
                  padding: '14px',
                  marginBottom: '16px'
                }}>
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    fontSize: '14px'
                  }}>
                    <div>
                      <div style={{ color: '#666', marginBottom: '4px' }}>📏 Height</div>
                      <div style={{ fontWeight: 'bold', color: '#1a1a1a', fontSize: '16px' }}>
                        {pokemon.height / 10}m
                      </div>
                    </div>
                    <div>
                      <div style={{ color: '#666', marginBottom: '4px' }}>⚖️ Weight</div>
                      <div style={{ fontWeight: 'bold', color: '#1a1a1a', fontSize: '16px' }}>
                        {pokemon.weight / 10}kg
                      </div>
                    </div>
                  </div>
                </div>

                {/* View Details Button */}
                <a
                  href={`/2602232371/details?id=${pokemon.id}`}
                  style={{
                    display: 'block',
                    width: '100%',
                    background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
                    color: 'white',
                    textAlign: 'center',
                    padding: '12px',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '15px',
                    transition: 'all 0.3s',
                    boxSizing: 'border-box',
                    boxShadow: '0 2px 8px rgba(22, 163, 74, 0.3)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #15803d 0%, #16a34a 100%)';
                    e.target.style.transform = 'scale(1.02)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  View Details →
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* No Results Found */
        <div style={{ 
          background: 'white', 
          borderRadius: '16px', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
          padding: '60px 30px', 
          textAlign: 'center' 
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>😕</div>
          <p style={{ color: '#666', fontSize: '20px', marginBottom: '24px', fontWeight: '500' }}>
            No Pokemon found matching "<strong>{searchTerm}</strong>"
          </p>
          <button
            onClick={() => setSearchTerm("")}
            style={{
              padding: '12px 28px',
              background: '#16a34a',
              color: 'white',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'background 0.3s'
            }}
            onMouseOver={(e) => e.target.style.background = '#15803d'}
            onMouseOut={(e) => e.target.style.background = '#16a34a'}
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}
