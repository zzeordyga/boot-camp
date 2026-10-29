"use client"

import { useLanguage } from "@/context/LanguageContext"
import { useTheme } from "@/context/ThemeContext"

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  const { theme } = useTheme()

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as "id" | "en")}
      className={`rounded-lg border-2 px-4 py-2 font-medium shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        theme === "dark"
          ? "border-gray-600 bg-gray-700 text-white"
          : "border-gray-200 bg-white text-gray-800"
      }`}
    >
      <option value="id">ID</option>
      <option value="en">EN</option>
    </select>
  )
}