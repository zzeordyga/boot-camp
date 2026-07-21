"use client";

import { useSettings, LANGUAGES } from "../context/SettingsContext";

export default function SettingsBar() {
  const { theme, toggleTheme, language, setLanguage } = useSettings();

  return (
    <div className="settings-bar">
      <button
        onClick={toggleTheme}
        className="btn btn--ghost"
        aria-label="Toggle theme"
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        aria-label="Select language"
      >
        {Object.entries(LANGUAGES).map(([code, label]) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
