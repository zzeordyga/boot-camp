// src/app/2602232371/details/page.jsx
"use client";

import { useState, useEffect, useRef, useMemo } from "react";

export default function PokemonDetailsPage() {
  // useState: Managing state for pokemon details
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // useRef: Keep track of how many times user clicked "Get Random Pokemon"
  const clickCountRef = useRef(0);

  // Get pokemon ID from URL or default to random
  const getPokemonId = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("id") || Math.floor(Math.random() * 150) + 1;
    }
    return 1;
  };

  // useEffect: Fetch pokemon details when component mounts
  useEffect(() => {
    fetchPokemonDetails(getPokemonId());
  }, []);

  // Function to fetch pokemon details
  const fetchPokemonDetails = async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      
      if (!response.ok) {
        throw new Error("Pokemon not found!");
      }
      
      const data = await response.json();
      setPokemon(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Handle random pokemon button click
  const handleRandomPokemon = () => {
    clickCountRef.current += 1;
    const randomId = Math.floor(Math.random() * 150) + 1;
    fetchPokemonDetails(randomId);
  };

  // useMemo: Calculate total base stats
  const totalStats = useMemo(() => {
    if (!pokemon) return 0;
    return pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
  }, [pokemon]);

  // useMemo: Find highest and lowest stats
  const statAnalysis = useMemo(() => {
    if (!pokemon) return { highest: null, lowest: null };
    
    const stats = pokemon.stats;
    const highest = stats.reduce((max, stat) => 
      stat.base_stat > max.base_stat ? stat : max
    );
    const lowest = stats.reduce((min, stat) => 
      stat.base_stat < min.base_stat ? stat : min
    );
    
    return { highest, lowest };
  }, [pokemon]);

  // Helper to get type color
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

  // Helper to get stat color
  const getStatColor = (value) => {
    if (value >= 100) return "#22c55e";
    if (value >= 70) return "#3b82f6";
    if (value >= 50) return "#eab308";
    return "#ef4444";
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            border: '5px solid #e0e0e0',
            borderTop: '5px solid #2563eb',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
          <p style={{ marginTop: '20px', color: '#555', fontSize: '18px', fontWeight: '500' }}>
            Loading Pokemon Details...
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        background: 'white', 
        borderRadius: '16px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
        padding: '60px 30px', 
        textAlign: 'center' 
      }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>❌</div>
        <p style={{ color: '#ef4444', fontSize: '22px', fontWeight: '600', marginBottom: '24px' }}>
          {error}
        </p>
        <a
          href="/2602232371"
          style={{
            display: 'inline-block',
            padding: '12px 28px',
            background: '#2563eb',
            color: 'white',
            borderRadius: '10px',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '600'
          }}
        >
          ← Back to List
        </a>
      </div>
    );
  }

  if (!pokemon) return null;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Back Button */}
      <a
        href="/2602232371"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          background: 'white',
          color: '#16a34a',
          borderRadius: '10px',
          textDecoration: 'none',
          fontSize: '15px',
          fontWeight: '600',
          marginBottom: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'all 0.3s'
        }}
        onMouseOver={(e) => {
          e.target.style.background = '#16a34a';
          e.target.style.color = 'white';
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'white';
          e.target.style.color = '#16a34a';
        }}
      >
        ← Back to Pokemon List
      </a>

      {/* Main Pokemon Card */}
      <div style={{ 
        background: 'white', 
        borderRadius: '20px', 
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)', 
        overflow: 'hidden',
        marginBottom: '30px'
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}>
          {/* Left Side - Image */}
          <div style={{ 
            flex: '1',
            minWidth: '300px',
            background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
            padding: '50px 30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img
              src={pokemon.sprites.other["official-artwork"]?.front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              style={{ 
                width: '280px', 
                height: '280px', 
                objectFit: 'contain',
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))',
                marginBottom: '24px'
              }}
            />
            <div style={{ display: 'flex', gap: '16px' }}>
              <img
                src={pokemon.sprites.front_default}
                alt={`${pokemon.name} front`}
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  border: '3px solid white',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.2)',
                  padding: '8px'
                }}
              />
              <img
                src={pokemon.sprites.back_default}
                alt={`${pokemon.name} back`}
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  border: '3px solid white',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.2)',
                  padding: '8px'
                }}
              />
            </div>
          </div>

          {/* Right Side - Details */}
          <div style={{ flex: '1', minWidth: '300px', padding: '40px' }}>
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h1 style={{ 
                  fontSize: '42px', 
                  fontWeight: 'bold', 
                  color: '#1a1a1a', 
                  textTransform: 'capitalize',
                  margin: 0
                }}>
                  {pokemon.name}
                </h1>
                <span style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: '#999',
                  background: '#f3f4f6',
                  padding: '8px 16px',
                  borderRadius: '12px'
                }}>
                  #{String(pokemon.id).padStart(3, "0")}
                </span>
              </div>
              
              {/* Types */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '20px',
                      color: 'white',
                      fontSize: '14px',
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
            </div>

            {/* Basic Info Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{ 
                background: '#f8f9fa', 
                padding: '20px', 
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '14px', color: '#666', margin: '0 0 8px 0', fontWeight: '500' }}>
                  📏 Height
                </p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a', margin: 0 }}>
                  {pokemon.height / 10}m
                </p>
              </div>
              <div style={{ 
                background: '#f8f9fa', 
                padding: '20px', 
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '14px', color: '#666', margin: '0 0 8px 0', fontWeight: '500' }}>
                  ⚖️ Weight
                </p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a', margin: 0 }}>
                  {pokemon.weight / 10}kg
                </p>
              </div>
              <div style={{ 
                background: '#f8f9fa', 
                padding: '20px', 
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '14px', color: '#666', margin: '0 0 8px 0', fontWeight: '500' }}>
                  ⭐ Base XP
                </p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a', margin: 0 }}>
                  {pokemon.base_experience}
                </p>
              </div>
              <div style={{ 
                background: '#f8f9fa', 
                padding: '20px', 
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '14px', color: '#666', margin: '0 0 8px 0', fontWeight: '500' }}>
                  💪 Total Stats
                </p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a', margin: 0 }}>
                  {totalStats}
                </p>
              </div>
            </div>

            {/* Abilities */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#1a1a1a', 
                marginBottom: '12px' 
              }}>
                ✨ Abilities
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {pokemon.abilities.map((ability) => (
                  <span
                    key={ability.ability.name}
                    style={{
                      padding: '10px 16px',
                      background: '#e0e7ff',
                      color: '#3730a3',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: '500',
                      textTransform: 'capitalize'
                    }}
                  >
                    {ability.ability.name.replace("-", " ")}
                    {ability.is_hidden && " 🔒"}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ 
        background: 'white', 
        borderRadius: '20px', 
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)', 
        padding: '40px',
        marginBottom: '30px'
      }}>
        <h2 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          color: '#1a1a1a', 
          marginBottom: '30px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          📊 Base Stats
        </h2>
        
        <div style={{ marginBottom: '30px' }}>
          {pokemon.stats.map((stat) => {
            const percentage = (stat.base_stat / 255) * 100;
            return (
              <div key={stat.stat.name} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ 
                    fontSize: '15px', 
                    fontWeight: '600', 
                    color: '#374151', 
                    textTransform: 'capitalize' 
                  }}>
                    {stat.stat.name.replace("-", " ")}
                  </span>
                  <span style={{ 
                    fontSize: '18px', 
                    fontWeight: 'bold', 
                    color: '#1a1a1a' 
                  }}>
                    {stat.base_stat}
                  </span>
                </div>
                <div style={{ 
                  width: '100%', 
                  background: '#e5e7eb', 
                  borderRadius: '10px', 
                  height: '14px',
                  overflow: 'hidden'
                }}>
                  <div
                    style={{
                      height: '14px',
                      borderRadius: '10px',
                      width: `${percentage}%`,
                      background: getStatColor(stat.base_stat),
                      transition: 'width 0.5s ease'
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stat Analysis */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)', 
            padding: '24px', 
            borderRadius: '16px'
          }}>
            <p style={{ fontSize: '14px', color: '#065f46', fontWeight: '600', margin: '0 0 8px 0' }}>
              💪 Highest Stat
            </p>
            <p style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              color: '#064e3b', 
              textTransform: 'capitalize',
              margin: '0 0 4px 0'
            }}>
              {statAnalysis.highest?.stat.name.replace("-", " ")}
            </p>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#065f46', margin: 0 }}>
              {statAnalysis.highest?.base_stat}
            </p>
          </div>
          <div style={{ 
            background: 'linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)', 
            padding: '24px', 
            borderRadius: '16px'
          }}>
            <p style={{ fontSize: '14px', color: '#991b1b', fontWeight: '600', margin: '0 0 8px 0' }}>
              📉 Lowest Stat
            </p>
            <p style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              color: '#7f1d1d', 
              textTransform: 'capitalize',
              margin: '0 0 4px 0'
            }}>
              {statAnalysis.lowest?.stat.name.replace("-", " ")}
            </p>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#991b1b', margin: 0 }}>
              {statAnalysis.lowest?.base_stat}
            </p>
          </div>
        </div>
      </div>

      {/* Random Pokemon Section */}
      <div style={{ 
        background: 'white', 
        borderRadius: '20px', 
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)', 
        padding: '40px', 
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '12px' }}>
          🎲 Discover More Pokemon!
        </h3>
        <p style={{ color: '#666', marginBottom: '24px', fontSize: '16px' }}>
          Click the button below to explore a random Pokemon from the first generation
        </p>
        <button
          onClick={handleRandomPokemon}
          style={{
            padding: '14px 32px',
            background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
            color: 'white',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '17px',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(22, 163, 74, 0.4)',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 6px 20px rgba(22, 163, 74, 0.5)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 4px 12px rgba(22, 163, 74, 0.4)';
          }}
        >
          Get Random Pokemon
        </button>
        <p style={{ fontSize: '14px', color: '#999', marginTop: '16px' }}>
          Times clicked: <span style={{ fontWeight: 'bold', color: '#16a34a' }}>{clickCountRef.current}</span>
        </p>
      </div>
    </div>
  );
}
