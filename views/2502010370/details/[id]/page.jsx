'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetch(`https://www.freetogame.com/api/game?id=${id}`)
      .then((res) => res.json())
      .then((data) => setGame(data));
  }, [id]);

  if (!game) return <p>Loading game info...</p>;

  return (
    <div>
      <h2>{game.title}</h2>
      <img src={game.thumbnail} alt={game.title} style={{ width: '300px' }} />
      <p><strong>Genre:</strong> {game.genre}</p>
      <p><strong>Platform:</strong> {game.platform}</p>
      <p><strong>Developer:</strong> {game.developer}</p>
      <p><strong>Release Date:</strong> {game.release_date}</p>
      <p><strong>Description:</strong> {game.description}</p>

      <a href={game.game_url} target="_blank" rel="noreferrer">
        <button>Play Now</button>
      </a>
    </div>
  );
}
