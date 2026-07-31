"use client";

import { useSettings } from "../contexts/SettingContext";

export default function LanguageToggle() {
    const { language, setLanguage, } = useSettings();

    return (
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="rounded-full border-2 border-[#121212] px-4 py-2 md:px-6 md:py-4 text-lg md:text-xl dark:text-white dark:border-white">
            <option value="id" className="dark:text-black text-md md:text-lg">
                Indonesia
            </option>

            <option value="en" className="dark:text-black text-md md:text-lg">
                English
            </option>
        </select>
    );
}