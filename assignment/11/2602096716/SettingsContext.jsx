"use client";
import { createContext, useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("settings:theme", "light");
  const [language, setLanguage] = useLocalStorage("settings:language", "id");

  return (
    <SettingsContext.Provider value={{ theme, setTheme, language, setLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}