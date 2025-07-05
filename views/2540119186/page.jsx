'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GameListPage() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch('https://www.freetogame.com/api/games?platform=pc')
      .then((res) => res.json())
      .then((data) => setGames(data.slice(0, 10))); // Show only 10 games
  }, []);

  return (
    <div>
      <h1>Free PC Games</h1>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <Link href={`/views/2540119186/${game.id}`}>
              {game.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
