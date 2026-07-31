"use client";

import { useState, useEffect } from "react";
import { useSettings } from "../contexts/SettingContext";

export default function ThemeProvider({ children, }) {
    const { theme } = useSettings();
    const [ mounted, setMounted ] = useState(false);

    useEffect(() => {
        document.documentElement.classList.remove("light", "dark");

        document.documentElement.classList.add(theme);

        setMounted(true);
    }, [theme]);

    if (!mounted) {
        return null;
    }

    return children;
}