"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ArtworkDetail() {
  const { id } = useParams();
  const [art, setArt] = useState(null);
  const [iiifUrl, setIiifUrl] = useState("");

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();

    fetch(
      `https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,artist_display,date_display,medium_display,image_id,thumbnail.alt_text`,
      { signal: controller.signal }
    )
      .then((r) => r.json())
      .then((json) => {
        setArt(json.data);
        setIiifUrl(json.config.iiif_url);
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });

    return () => controller.abort();
  }, [id]);

  if (!art) return <p>Loading...</p>;

  return (
    <article className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">{art.title}</h2>
      <p className="text-gray-400 mb-4">
        {art.artist_display || "Unknown artist"} ・ {art.date_display || ""}
      </p>

      {art.image_id ? (
        <img
          src={`${iiifUrl}/${art.image_id}/full/843,/0/default.jpg`}
          alt={art.thumbnail?.alt_text || art.title}
          className="w-full max-h-[600px] object-contain mb-6 rounded"
        />
      ) : (
        <div className="w-full h-96 bg-gray-300 flex items-center justify-center mb-6">
          No Image Available
        </div>
      )}

      <p className="text-gray-400">
        <strong>Medium:</strong> {art.medium_display || "—"}
      </p>
    </article>
  );
}
