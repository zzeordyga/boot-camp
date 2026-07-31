'use client'

import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const SettingContext = createContext();

export function SettingProvider({ children }) {
    const [ theme, setTheme ] = useLocalStorage("theme", "light")
    const [ language, setLanguage ] = useLocalStorage("language", "en");

    return (
        <SettingContext.Provider value={{theme, setTheme, language, setLanguage}}>{children}</SettingContext.Provider>
    );
}

export function useSettings() {
    return useContext(SettingContext);
}