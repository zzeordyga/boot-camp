import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch {
        console.error(`Error saving to localStorage with key "${key}"`);
      }
    }
  }, [key, value]);

  return [value, setValue];
}