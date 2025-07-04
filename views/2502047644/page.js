"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";

export default function HomePage() {
  const [query, setQuery] = useState("sunset");
  const [results, setResults] = useState([]);
  const [iiifUrl, setIiifUrl] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    const controller = new AbortController();

    fetch(
      `https://api.artic.edu/api/v1/artworks/search?q=${query}&fields=id,title,artist_display,image_id&limit=12`,
      { signal: controller.signal }
    )
      .then((r) => r.json())
      .then((json) => {
        setResults(json.data || []);
        setIiifUrl(json.config.iiif_url); // simpan base url IIIF
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });

    return () => controller.abort();
  }, [query]);

  const artworks = useMemo(() => results, [results]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Search Artworks</h2>

      <input
        ref={inputRef}
        type="text"
        placeholder="Try 'monet', 'sunflower', etc."
        className="w-full max-w-sm p-2 border rounded mb-6"
        onKeyDown={(e) => {
          if (e.key === "Enter") setQuery(e.target.value.trim() || "sunset");
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {artworks.map((art) => (
          <Link key={art.id} href={`/artwork/${art.id}`}>
            <div className="border rounded shadow hover:shadow-md transition overflow-hidden cursor-pointer bg-white">
              {art.image_id ? (
                <img
                  src={`${iiifUrl}/${art.image_id}/full/400,/0/default.jpg`}
                  alt={art.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-600">
                  No Image
                </div>
              )}
              <div className="p-2">
                <h3 className="font-semibold truncate text-gray-800">{art.title}</h3>
                <p className="text-sm text-gray-600">
                  {art.artist_display || "Unknown artist"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
