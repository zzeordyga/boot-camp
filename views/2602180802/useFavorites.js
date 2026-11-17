"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "bootcamp-pokedex-favorites";

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [ready, setReady] = useState(false);


  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (Array.isArray(saved)) setFavorites(saved);
    } catch {

    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(favorites));
  }, [favorites, ready]);

  const toggle = useCallback((id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  return { favorites, toggle, ready };
}
