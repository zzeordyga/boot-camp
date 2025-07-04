"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import api from "./_libs/api.js";
import { valueOrDefault, truncateText } from "./_libs/utils.js";
import AnimeCard from "./_components/anime-card.jsx";

export default function Page() {
  const [animeList, setAnimeList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnimeList = async () => {
    try {
      const response = await axios.get(api.getTopAnime);
      const { data = {} } = valueOrDefault(response, {});
      const { data: animeData = [] } = data;
      const { pagination = {} } = data;
      const { current_page = 1, has_next_page = false } = pagination;
      setAnimeList(animeData);
      setPage(current_page);
      setHasNextPage(has_next_page);
      console.log(animeData);
      console.log(current_page);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimeList();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl font-bold text-[#2e63e9]">Anime List</h1>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="w-auto h-[400px] bg-neutral-300 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      )}

      {!isLoading && !animeList.length && (
        <p className="text-lg font-normal text-neutral-400">No anime found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* <AnimeCard id="123" description="aSdasdsd" imageUrl="" /> */}

        {animeList.map((anime, index) => (
          // <Link
          //   key={index}
          //   href={`/2501995345/${anime.mal_id}`}
          //   className="flex flex-col bg-white rounded-lg shadow-md w-auto border-2 border-transparent hover:border-[#2e63e9] hover:border-2 transition-all duration-300"
          // >
          //   <div className="w-full h-[400px] relative">
          //     <Image
          //       src={anime.images.jpg.image_url}
          //       alt={anime.title}
          //       fill
          //       className="object-cover rounded-t-lg"
          //     />
          //   </div>
          //   <div className="flex flex-col gap-2 p-4">
          //     <h2 className="text-lg font-bold text-[#2e63e9]">
          //       {anime.title}
          //     </h2>
          //     <p className="text-sm font-normal text-neutral-400">
          //       {truncateText(anime.synopsis, 100)}
          //     </p>
          //   </div>
          // </Link>
          <AnimeCard
            key={index}
            id={anime.mal_id}
            title={anime.title}
            description={anime.synopsis}
            imageUrl={anime.images.jpg.image_url}
          />
        ))}
      </div>
    </div>
  );
}
