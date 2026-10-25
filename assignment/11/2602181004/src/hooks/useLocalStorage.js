'use client'
import { useCallback, useEffect, useRef, useState } from 'react';

function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export default function useLocalStorage(key, initialValue) {
  const initialRef = useRef(initialValue);
  const [value, setValue] = useState(initialValue);
  const valueRef = useRef(value);

  useEffect(() => {
    const stored = readStorage(key, initialRef.current);
    valueRef.current = stored;
    setValue(stored);

    const onStorage = (event) => {
      if (event.key !== key) return;
      const next = readStorage(key, initialRef.current);
      valueRef.current = next;
      setValue(next);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key]);

  const update = useCallback(
    (next) => {
      const resolved = typeof next === 'function' ? next(valueRef.current) : next;
      valueRef.current = resolved;
      setValue(resolved);
      writeStorage(key, resolved);
    },
    [key],
  );

  return [value, update];
}
