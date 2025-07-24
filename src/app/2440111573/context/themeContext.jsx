"useclient";
import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({children}){
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };
    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.className = theme;
    }, [theme]);

    return(
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};