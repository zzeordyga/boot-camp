import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}
