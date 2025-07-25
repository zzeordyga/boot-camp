import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [language, setLanguage] = useLocalStorage('language', 'en');
  const [sortOrder, setSortOrder] = useLocalStorage('sortOrder', 'asc');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    language,
    sortOrder,
    toggleTheme,
    setLanguage,
    setSortOrder
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}