"use client";
import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [language, setLanguage] = useLocalStorage("language", "en");

  return (
    <SettingsContext.Provider
      value={{ theme, setTheme, language, setLanguage }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
