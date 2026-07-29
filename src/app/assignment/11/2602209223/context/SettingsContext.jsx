'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
    const [language, setLanguage] = useLocalStorage('language', 'en');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'en' ? 'id' : 'en'));
    };

    if (!mounted) {
        return null;
    }

    return (
        <SettingsContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    return useContext(SettingsContext);
}
