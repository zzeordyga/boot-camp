"use client";

import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

export default function SettingsBar({ sortOrder, onSortChange }) {
  const { theme, setTheme, language, setLanguage, t } =
    useContext(SettingsContext);

  return (
    <section className="settings-bar" aria-label="Settings">
      <div className="setting-group">
        <label htmlFor="theme-select">{t.theme}</label>
        <select
          id="theme-select"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="light">{t.light}</option>
          <option value="dark">{t.dark}</option>
        </select>
      </div>

      <div className="setting-group">
        <label htmlFor="language-select">{t.language}</label>
        <select
          id="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="id">Indonesia</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="setting-group">
        <label htmlFor="sort-select">{t.sort}</label>
        <select
          id="sort-select"
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="newest">{t.newest}</option>
          <option value="oldest">{t.oldest}</option>
        </select>
      </div>
    </section>
  );
}
