"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Persists a piece of state to localStorage, keyed by `key`.
 * Falls back to `initialValue` on the server and on first client render
 * before localStorage has been read, to avoid hydration mismatches.
 *
 * @param {string} key - localStorage key
 * @param {*} initialValue - default value if nothing is stored yet
 * @returns {[value, setValue]} same shape as useState
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  const [hydrated, setHydrated] = useState(false);

  // Read from localStorage once, after mount (window isn't available during SSR)
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) {
        setValue(JSON.parse(stored));
      }
    } catch (err) {
      console.warn(`useLocalStorage: failed to read key "${key}"`, err);
    } finally {
      setHydrated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Persist to localStorage whenever the value changes (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`useLocalStorage: failed to write key "${key}"`, err);
    }
  }, [key, value, hydrated]);

  const setStoredValue = useCallback((newValue) => {
    setValue((prev) =>
      typeof newValue === "function" ? newValue(prev) : newValue
    );
  }, []);

  return [value, setStoredValue];
}
