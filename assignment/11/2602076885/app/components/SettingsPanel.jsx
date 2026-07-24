"use client";

import { useSettings } from "../context/SettingsContext";

export default function SettingsPanel() {
  const { theme, setTheme, language, setLanguage } = useSettings();

  return (
    <section
      style={{
        background: theme === "light" ? "#ffffff" : "#1e293b",
        padding: "20px",
        borderRadius: "14px",
        marginBottom: "24px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
      }}
    >
      <h2
        style={{
          fontSize: "20px",
          fontWeight: "700",
          color: theme === "light" ? "#0f172a" : "#f8fafc",
          marginBottom: "16px",
        }}
      >
        Settings
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              fontWeight: "600",
              color: theme === "light" ? "#334155" : "#cbd5e1",
              marginBottom: "6px",
            }}
          >
            Theme
          </label>

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={{
              padding: "9px 12px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              color: "#0f172a",
              backgroundColor: "#ffffff",
            }}
          >
            <option value="light">Light</option>

            <option value="dark">Dark</option>
          </select>
        </div>

        <div>
          <label
            style={{
              display: "block",
              fontWeight: "600",
              color: theme === "light" ? "#334155" : "#cbd5e1",
              marginBottom: "6px",
            }}
          >
            Language
          </label>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              padding: "9px 12px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              color: "#0f172a",
              backgroundColor: "#ffffff",
            }}
          >
            <option value="en">English</option>

            <option value="id">Indonesian</option>
          </select>
        </div>
      </div>
    </section>
  );
}
