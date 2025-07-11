import Link from "next/link";
import Image from "next/image";

import { truncateText } from "../_libs/utils";

export default function AnimeCard({ id, title, description, imageUrl }) {
  return (
    <Link
      href={`/2501995345/${id}`}
      className="flex flex-col bg-white rounded-lg shadow-md w-auto border-2 border-transparent hover:border-[#2e63e9] hover:border-2 transition-all duration-300"
    >
      <div className="w-full h-[400px] relative">
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-t-lg"
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h2 className="text-lg font-bold text-[#2e63e9]">{title}</h2>
        <p className="text-sm font-normal text-neutral-400">
          {truncateText(description, 100)}
        </p>
      </div>
    </Link>
  );
}
