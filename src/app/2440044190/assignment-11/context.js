"use client";
import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [language, setLanguage] = useLocalStorage("language", "en");

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.className = theme; // ✅ replaces all classes
    }
  }, [theme]);

  return (
    <SettingsContext.Provider value={{ theme, setTheme, language, setLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);