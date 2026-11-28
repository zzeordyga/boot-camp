"use client";

import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item));
      }
    } catch {
      // Ignore storage read errors and keep initialValue
    }
  }, [key]);

  const setValue = (value) => {
    setStoredValue((prev) => {
      const nextValue = typeof value === "function" ? value(prev) : value;
      try {
        window.localStorage.setItem(key, JSON.stringify(nextValue));
      } catch {
        // Ignore storage write errors
      }
      return nextValue;
    });
  };

  return [storedValue, setValue];
}
