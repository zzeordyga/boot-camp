import { useState } from "react";

export default function useLocalStorage() {
  const setLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
  };

  const getLocalStorage = (key) => {
    return localStorage.getItem(key);
  };

  return {
    setLocalStorage,
    getLocalStorage,
  };
}
