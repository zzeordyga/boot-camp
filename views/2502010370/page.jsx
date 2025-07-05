'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch('https://www.freetogame.com/api/games')
      .then((res) => res.json())
      .then((data) => setGames(data.slice(0, 10))); // limit to 10 games
  }, []);

  return (
    <div>
      <h2>Explore Free Games</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {games.map((game) => (
          <li key={game.id} style={{ marginBottom: '1rem' }}>
            <h3>{game.title}</h3>
            <img src={game.thumbnail} alt={game.title} style={{ width: '200px' }} />
            <br />
            <Link href={`/views/2502010370/details/${game.id}`}>
              <button style={{ marginTop: '0.5rem' }}>View Details</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
