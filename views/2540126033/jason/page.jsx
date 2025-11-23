'use client'

import { useState, useEffect, useMemo } from 'react'

function Index() {
  const [posts, setPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState('') 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150'); // Increased limit for better searching
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon data');
        }
        const data = await response.json();
        setPosts(data.results); 
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, []);

  const filteredPosts = useMemo(() => {
    if (!searchTerm) {
      return posts;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return posts.filter(post => 
      post.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [posts, searchTerm]);

  return (
    <>
      <div style={{
        textAlign: "center",
        fontFamily: "Arial",
        backgroundColor: "cyan",
        margin: 0
      }}>
        <h1 style={{
        paddingTop: 20,
        margin: 0,
        
      }}>Daftar Pokemon</h1>
        <input
          type="text"
          placeholder="Search Pokémon by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: 300,
            padding: 6,
            margin: 12
          }}
        />

        {filteredPosts.length === 0 && searchTerm !== '' ? (
          <p>No Match "{searchTerm}".</p>
        ) : (
          <table style={{
            margin: 'auto',
            marginTop: 12,
            width: 600,
            fontSize: 18
          }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.name}> 
                  <td style={{
                  paddingTop: 12,
                }}>{post.name}</td>
                  <td style={{
                  paddingTop: 12,
                }}>
                    <a href={post.url}>
                      API Link
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Index;