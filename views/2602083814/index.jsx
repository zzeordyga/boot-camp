// SESI 6
// import { useState, useEffect, useRef } from 'react'

// function Profile() {
//   const [showInterests, setShowInterests] = useState(false)
//   const profileRef = useRef(null)

//   useEffect(() => {
//     const previousTitle = document.title
//     document.title = 'My Profile | React Bootcamp'

//     return () => {
//       document.title = previousTitle
//     }
//   }, [])

//   const handleFocusProfile = () => {
//     profileRef.current?.focus()
//   }

//   return (
//     <main
//       style={{
//         minHeight: '100vh',
//         backgroundColor: '#f4f6fb',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: '24px',
//         fontFamily: 'Arial, sans-serif',
//       }}
//     >
//       <section
//         style={{
//           backgroundColor: '#ffffff',
//           width: '100%',
//           maxWidth: '600px',
//           padding: '40px',
//           borderRadius: '16px',
//           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
//         }}
//       >
//         <p
//           style={{
//             color: '#2563eb',
//             fontWeight: 'bold',
//             fontSize: '14px',
//             letterSpacing: '1px',
//           }}
//         >
//           PERSONAL PROFILE
//         </p>

//         <h1
//           ref={profileRef}
//           tabIndex={-1}
//           style={{
//             fontSize: '32px',
//             color: '#1e293b',
//             marginBottom: '8px',
//             outline: 'none',
//           }}
//         >
//           Hello, I'm Randy Fernanda!
//         </h1>

//         <p style={{ color: '#64748b', marginBottom: '24px' }}>
//           NIM: 2602083814
//         </p>

//         <hr style={{ border: '1px solid #e2e8f0' }} />

//         <h2 style={{ color: '#1e293b', marginTop: '24px' }}>
//           About My Study
//         </h2>

//         <p
//           style={{
//             color: '#475569',
//             lineHeight: '1.7',
//             fontSize: '15px',
//           }}
//         >
//           I am a Mobile Application & Technology student at
//           BINUS University. I am interested in mobile application
//           development, web development, and exploring new
//           technologies. I enjoy learning new skills and building
//           applications that solve real-world problems.
//         </p>

//         <button
//           onClick={() => setShowInterests(!showInterests)}
//           style={{
//             backgroundColor: '#2563eb',
//             color: '#ffffff',
//             border: 'none',
//             padding: '12px 20px',
//             borderRadius: '8px',
//             cursor: 'pointer',
//             marginTop: '16px',
//             fontWeight: 'bold',
//           }}
//         >
//           {showInterests ? 'Hide My Interests' : 'Show My Interests'}
//         </button>

//         {showInterests && (
//           <div
//             style={{
//               marginTop: '20px',
//               padding: '16px',
//               backgroundColor: '#eff6ff',
//               borderRadius: '8px',
//             }}
//           >
//             <h3 style={{ color: '#1e40af', marginTop: '0' }}>
//               My Interests
//             </h3>

//             <ul style={{ color: '#475569', lineHeight: '1.8' }}>
//               <li>Mobile Application Development</li>
//               <li>Web Development</li>
//               <li>UI/UX Design</li>
//               <li>Exploring New Technologies</li>
//             </ul>
//           </div>
//         )}

//         <button
//           onClick={handleFocusProfile}
//           style={{
//             display: 'block',
//             marginTop: '16px',
//             padding: '10px 16px',
//             borderRadius: '8px',
//             border: '1px solid #cbd5e1',
//             backgroundColor: '#ffffff',
//             color: '#334155',
//             cursor: 'pointer',
//           }}
//         >
//           Focus on My Profile
//         </button>
//       </section>
//     </main>
//   )
// }

// export default Profile

// SESI 8
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Layout from "./layout";

export default function PokedexPage() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const searchRef = useRef(null);

  // Fetch Pokémon data from PokeAPI
  useEffect(() => {
    async function fetchPokemon() {
      try {
        setLoading(true);

        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=50"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon data.");
        }

        const data = await response.json();

        const pokemonData = data.results.map((item, index) => ({
          id: index + 1,
          name: item.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        }));

        setPokemon(pokemonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, []);

  // Filter Pokémon based on search input
  const filteredPokemon = useMemo(() => {
    return pokemon.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [pokemon, search]);

  // Focus on search input
  function handleSearchFocus() {
    searchRef.current?.focus();
  }

  return (
    <Layout>
      <section className="mb-10">
        <span className="text-yellow-400 font-semibold text-sm">
          POKÉMON DATABASE
        </span>

        <h2 className="text-4xl font-bold mt-3">
          Explore the Pokémon World
        </h2>

        <p className="text-slate-400 mt-3 max-w-2xl">
          Discover different Pokémon, explore their characteristics,
          and learn more about your favorites.
        </p>
      </section>

      {/* Search */}
      <section className="mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            ref={searchRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Pokémon..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-yellow-400"
          />

          <button
            onClick={handleSearchFocus}
            className="bg-yellow-400 text-slate-950 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-300 transition"
          >
            Search Pokémon
          </button>
        </div>

        <p className="text-sm text-slate-500 mt-3">
          Showing {filteredPokemon.length} Pokémon
        </p>
      </section>

      {/* Pokémon List */}
      {loading && (
        <p className="text-center text-slate-400 py-12">
          Loading Pokémon...
        </p>
      )}

      {error && (
        <p className="text-center text-red-400 py-12">
          {error}
        </p>
      )}

      {!loading && !error && filteredPokemon.length === 0 && (
        <p className="text-center text-slate-400 py-12">
          No Pokémon found. Try another name.
        </p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {filteredPokemon.map((item) => (
            <Link
              key={item.id}
              href={`/${"2602083814"}/details?pokemon=${item.name}`}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center hover:border-yellow-400 hover:-translate-y-1 transition"
            >
              <div className="bg-slate-800 rounded-lg mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full aspect-square object-contain"
                />
              </div>

              <p className="text-xs text-slate-500">
                #{String(item.id).padStart(3, "0")}
              </p>

              <h3 className="font-bold capitalize mt-1">
                {item.name}
              </h3>

              <p className="text-yellow-400 text-sm mt-3">
                View Details →
              </p>
            </Link>
          ))}
        </div>
      )}
    </Layout>
  );
}