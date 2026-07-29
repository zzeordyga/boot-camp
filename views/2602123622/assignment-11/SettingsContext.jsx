import { createContext, useContext } from 'react';
import { useLocalStorage } from './useLocalStorage';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [language, setLanguage] = useLocalStorage('language', 'en');
  const [sortOrder, setSortOrder] = useLocalStorage('sortOrder', 'newest');

  const value = {
    theme,
    setTheme,
    language,
    setLanguage,
    sortOrder,
    setSortOrder,
  };

  return (
    <SettingsContext.Provider value={value}>
      <div data-theme={theme}>
        {children}
      </div>
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
