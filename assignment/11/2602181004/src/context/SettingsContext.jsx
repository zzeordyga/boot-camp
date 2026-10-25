'use client'
import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { LANGUAGES, locales, translate } from '@/lib/i18n';
import { SETTINGS_KEY, THEMES } from '@/lib/settings';

const defaultSettings = { theme: 'system', language: 'en' };

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [stored, setStored] = useLocalStorage(SETTINGS_KEY, defaultSettings);
  const theme = THEMES.includes(stored?.theme) ? stored.theme : defaultSettings.theme;
  const language = LANGUAGES.includes(stored?.language) ? stored.language : defaultSettings.language;

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') delete root.dataset.theme;
    else root.dataset.theme = theme;
    root.lang = language;
  }, [theme, language]);

  const setTheme = useCallback(
    (next) => setStored((current) => ({ ...defaultSettings, ...current, theme: next })),
    [setStored],
  );
  const setLanguage = useCallback(
    (next) => setStored((current) => ({ ...defaultSettings, ...current, language: next })),
    [setStored],
  );
  const t = useCallback((key, vars) => translate(language, key, vars), [language]);

  const value = useMemo(
    () => ({ theme, language, locale: locales[language], setTheme, setLanguage, t }),
    [theme, language, setTheme, setLanguage, t],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used inside SettingsProvider');
  return context;
}
