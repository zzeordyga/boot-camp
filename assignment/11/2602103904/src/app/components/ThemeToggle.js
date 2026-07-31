"use client";

import { useSettings } from "../contexts/SettingContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useSettings();

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="px-4 py-2 md:px-6 md:py-4 text-lg md:text-xl font-semibold rounded-full bg-[#121212] text-white dark:bg-gray-100 dark:text-black">
      {theme === "light" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}