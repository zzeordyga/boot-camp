"use client";
import { useEffect } from "react";
import { SettingsProvider, useSettings } from "./SettingsContext";

function ThemeWrapper({ children }) {
  const { theme } = useSettings();
  const isDark = theme === "dark";
  return (
    <div className={isDark ? "min-h-screen bg-gray-900 text-gray-100" : "min-h-screen bg-white text-gray-900"}>
      {children}
    </div>
  );
}

export default function Layout({ children }) {
  useEffect(() => {
    const scriptSrc = "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4";
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <SettingsProvider>
      <ThemeWrapper>{children}</ThemeWrapper>
    </SettingsProvider>
  );
}