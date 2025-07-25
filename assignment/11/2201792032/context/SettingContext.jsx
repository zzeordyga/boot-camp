import React, { createContext, useContext } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'

const SettingsContext = createContext()

export function SettingsProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('theme', 'light') // 'light' | 'dark'
  const [language, setLanguage] = useLocalStorage('language', 'en') // 'en' | 'id' | etc.

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'id' : 'en'))
  }

  return (
    <SettingsContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        toggleLanguage
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) throw new Error('useSettings must be used within SettingsProvider')
  return context
}
