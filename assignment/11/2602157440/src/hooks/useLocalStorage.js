'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Menyimpan state di localStorage.
 * Render pertama selalu memakai `initialValue` (sama dengan render di server),
 * lalu nilai tersimpan dibaca di useEffect setelah mount -> tidak ada hydration error.
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) {
        setValue(JSON.parse(stored));
      }
    } catch (err) {
      console.warn(`useLocalStorage: gagal membaca "${key}"`, err);
    }
  }, [key]);

  const setStoredValue = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch (err) {
          console.warn(`useLocalStorage: gagal menyimpan "${key}"`, err);
        }
        return resolved;
      });
    },
    [key]
  );

  return [value, setStoredValue];
}
