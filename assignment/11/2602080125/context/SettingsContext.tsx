"use client";
import { createContext, useContext, useEffect, type ReactNode } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { dictionary, type Dictionary, type Language } from "@/lib/i18n";

type Theme = "light" | "dark";

interface SettingsContextValue {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    language: Language;
    setLanguage: (language: Language) => void;
    translate: Dictionary;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useLocalStorage<Theme>("theme", "light");
    const [language, setLanguage] = useLocalStorage<Language>("language", "en");

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    return (
        <SettingsContext.Provider
            value={{ theme, setTheme, language, setLanguage, translate: dictionary[language] }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const ctx = useContext(SettingsContext);
    if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
    return ctx;
};