'use client'
import {useContext, useState, createContext} from 'react';

const ThemeContext = createContext()
export function ThemeProvider({ children }) {

    const [theme, setTheme] = useState('light')

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => useContext(ThemeContext)