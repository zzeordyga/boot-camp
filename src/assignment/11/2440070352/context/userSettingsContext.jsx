import { createContext, useContext, useState } from 'react';

const UserSettingsContext = createContext();

export function UserSettingsProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');

  return (
    <UserSettingsContext.Provider value={{ theme, setTheme, language, setLanguage }}>
      {children}
    </UserSettingsContext.Provider>
  );
}

export function useUserSettings() {
  return useContext(UserSettingsContext);
}