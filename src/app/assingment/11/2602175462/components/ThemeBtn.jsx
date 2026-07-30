"use client";

import { useTheme } from "../context/ThemeContext";
import styles from "./themeBtn.module.css"

export default function ThemeBtn(){
    const {theme, toogleTheme} = useTheme();

    return(
        <button onClick={toogleTheme} className={styles.modeBtn}>
            {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
    )
}