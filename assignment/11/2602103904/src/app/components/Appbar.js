"use client"

import { useSettings } from "../contexts/SettingContext"
import { translations } from "../lib/translation"

export default function Appbar() {
    const { language } = useSettings();
    const t = translations[language];

    return (
        <header className="fixed top-0 left-0 w-full bg-blue-600 text-2xl h-16 font-bold flex justify-center items-center text-white shadow-md z-50 md:text-3xl tracking-wider">{t.title}</header>
    )
}