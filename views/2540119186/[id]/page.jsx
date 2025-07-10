'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function GameDetailPage() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`https://www.freetogame.com/api/game?id=${id}`)
        .then((res) => res.json())
        .then((data) => setGame(data));
    }
  }, [id]);

  if (!game) return <p>Loading...</p>;

  return (
    <div>
      <h1>{game.title}</h1>
      <img src={game.thumbnail} alt={game.title} width="250" />
      <p><strong>Genre:</strong> {game.genre}</p>
      <p><strong>Platform:</strong> {game.platform}</p>
      <p><strong>Publisher:</strong> {game.publisher}</p>
      <p><strong>Description:</strong></p>
      <p>{game.description}</p>
      <a href={game.game_url} target="_blank" rel="noopener noreferrer">
        Visit Game Page
      </a>
    </div>
  );
}
