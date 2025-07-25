"use client";
import { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");

  return (
    <SettingsContext.Provider value={{ theme, setTheme, language, setLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
