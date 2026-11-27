'use client';

import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { translate } from '@/i18n/translations';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('settings-theme', 'light');
  const [language, setLanguage] = useLocalStorage('settings-language', 'id');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleTheme = useCallback(
    () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
    [setTheme]
  );

  const t = useCallback((key, vars) => translate(language, key, vars), [language]);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme, language, setLanguage, t }),
    [theme, setTheme, toggleTheme, language, setLanguage, t]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings harus dipakai di dalam <SettingsProvider>');
  }
  return ctx;
}
