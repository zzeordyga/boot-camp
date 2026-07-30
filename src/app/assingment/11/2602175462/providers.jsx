"use client";

import { ThemeContextProvider } from "./context/ThemeContext";

export default function Providers({children}){
    return <ThemeContextProvider>{children}</ThemeContextProvider>
}