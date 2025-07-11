import Link from "next/link";
import Image from "next/image";
import axios from "axios";

import api from "../_libs/api";
import Badge from "../_components/badge";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const response = await axios.get(api.getAnimeFullById(id));
    const { data = {} } = response;
    const { data: animeData = {} } = data;
    return { title: `Wibu | ${animeData.title}` };
  } catch {
    return { title: "Wibu | Anime Not Found" };
  }
}

export default async function DetailPage({ params }) {
  const { id } = await params;

  try {
    const response = await axios.get(api.getAnimeFullById(id));
    const { data = {} } = response;
    const { data: animeData = {} } = data;

    return (
      <div className="flex flex-col gap-4">
        <Link href="/2501995345" className="text-blue-500 hover:text-blue-600">
          {"< Back"}
        </Link>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-[400px] h-[600px] relative rounded-lg overflow-hidden">
            <Image
              src={animeData.images.jpg.large_image_url}
              alt={animeData.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-4 flex-1 bg-white rounded-lg p-8 shadow-md">
            <div className="flex flex-row items-center gap-2">
              <h1 className="text-3xl text-[#2e63e9] font-bold">
                {animeData.title}
              </h1>
              <span className="text-lg text-gray-600 font-bold">
                (⭐ {animeData.score})
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {animeData.year} | {animeData.type} | {animeData.status}
            </p>
            <p className="text-base text-gray-600">{animeData.synopsis}</p>

            <h2 className="text-lg text-[#2e63e9] font-semibold">Producers:</h2>
            <div className="flex flex-row flex-wrap gap-2">
              {animeData.producers.map((producer) => (
                <Badge key={producer.mal_id}>{producer.name}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);

    if (error.status === 404) {
      return (
        <div className="flex flex-col gap-4 justify-center">
          <Link
            href="/2501995345"
            className="text-blue-500 hover:text-blue-600"
          >
            {"< Back"}
          </Link>
          <h1 className="text-4xl font-bold">Anime Not Found</h1>
        </div>
      );
    }

    return <div>Error: {error.message}</div>;
  }
}
