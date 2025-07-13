'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';

export default function PokemonPage() {
  const [pokemon, setPokemon] = useState(null);
  const [count, setCount] = useState(1);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchPokemon(count);
  }, [count]);

  const fetchPokemon = async (id) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setPokemon({
        name: data.name,
        image: data.sprites.front_default,
        height: data.height,
        weight: data.weight,
      });
    } catch (error) {
      setPokemon(null);
    }
  };

  const doubledId = useMemo(() => count * 2, [count]);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        color: '#333',
      }}
    >
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#6b46c1' }}>
        Pokémon Viewer
      </h1>
      <p style={{ fontSize: '14px', color: '#555' }}>
        NIM 2502049353 - Raditya Tamam
      </p>

      <p style={{ fontSize: '14px', margin: '1rem 0' }}>
        ID sekarang: {count}, ID dikali dua: {doubledId}
      </p>

      {pokemon ? (
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            style={{ width: '120px', height: '120px' }}
          />
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', textTransform: 'capitalize' }}>
            {pokemon.name}
          </h2>
          <p>
            Tinggi: {pokemon.height} | Berat: {pokemon.weight}
          </p>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button
              onClick={() => setCount((prev) => Math.max(1, prev - 1))}
              style={{
                backgroundColor: '#e53e3e',
                color: 'white',
                padding: '10px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Prev
            </button>
            <button
              onClick={() => setCount((prev) => prev + 1)}
              style={{
                backgroundColor: '#38a169',
                color: 'white',
                padding: '10px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <input
          ref={inputRef}
          type="number"
          min={1}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          style={{
            padding: '8px',
            width: '200px',
            textAlign: 'center',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <br />
        <button
          onClick={handleFocus}
          style={{
            marginTop: '1rem',
            backgroundColor: '#3182ce',
            color: 'white',
            padding: '10px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Fokus ke Input
        </button>
      </div>
    </div>
  );
}
