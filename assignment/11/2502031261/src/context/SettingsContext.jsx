"use client";

import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const SettingsContext = createContext(null);

export const THEMES = ["light", "dark"];
export const LANGUAGES = { en: "English", id: "Bahasa Indonesia" };

const STRINGS = {
  en: {
    appTitle: "Task Manager",
    newTaskPlaceholder: "What needs to be done?",
    addButton: "Add task",
    emptyState: "No tasks yet. Add one above to get started.",
    completed: "Completed",
    pending: "Pending",
    sortLabel: "Sort by",
    newest: "Newest first",
    oldest: "Oldest first",
    alphabetical: "Alphabetical",
    delete: "Delete",
    edit: "Edit",
    save: "Save",
    cancel: "Cancel",
  },
  id: {
    appTitle: "Manajer Tugas",
    newTaskPlaceholder: "Apa yang perlu dikerjakan?",
    addButton: "Tambah tugas",
    emptyState: "Belum ada tugas. Tambahkan satu di atas untuk memulai.",
    completed: "Selesai",
    pending: "Belum selesai",
    sortLabel: "Urutkan berdasarkan",
    newest: "Terbaru",
    oldest: "Terlama",
    alphabetical: "Abjad",
    delete: "Hapus",
    edit: "Ubah",
    save: "Simpan",
    cancel: "Batal",
  },
};

export function SettingsProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("settings:theme", "light");
  const [language, setLanguage] = useLocalStorage("settings:language", "en");
  const [sortOrder, setSortOrder] = useLocalStorage("settings:sortOrder", "newest");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const t = useMemo(() => STRINGS[language] ?? STRINGS.en, [language]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      language,
      setLanguage,
      sortOrder,
      setSortOrder,
      t,
    }),
    [theme, language, sortOrder, t]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return ctx;
}
