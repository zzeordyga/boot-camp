'use client';

import { createContext, useState, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const themeContext = createContext("light");

export function ThemeContextProvider({children}){
    // const [theme, setTheme] = useState('light');
    const [theme, setTheme] = useLocalStorage("theme", "dark");

    const toogleTheme = () =>{
        setTheme((prevTheme)=>
            prevTheme === "light" ? "dark" : "light"
        );
    };

    useEffect(()=>{
        document.documentElement.classList.remove("light", 'dark');
        document.documentElement.classList.add(theme);
    }, [theme]);

    return(
        <themeContext.Provider value={{theme, toogleTheme}}>
            {children}
        </themeContext.Provider>
    );
}

export function useTheme(){
    return useContext(themeContext);
}