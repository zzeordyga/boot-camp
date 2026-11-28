"use client";

import { createContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { translations } from "../lib/translations";

export const SettingsContext = createContext({
  theme: "light",
  setTheme: () => {},
  language: "id",
  setLanguage: () => {},
  t: translations.id,
});

export function SettingsProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("appTheme", "light");
  const [language, setLanguage] = useLocalStorage("appLanguage", "id");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const t = translations[language] || translations.id;

  return (
    <SettingsContext.Provider
      value={{ theme, setTheme, language, setLanguage, t }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
