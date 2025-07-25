'use client';

import { createContext, useContext, useState } from 'react';

const UserSettingsContext = createContext();

export const UserSettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <UserSettingsContext.Provider value={{ theme, toggleTheme, language, changeLanguage }}>
      {children}
    </UserSettingsContext.Provider>
  );
};

export const useUserSettings = () => useContext(UserSettingsContext);