"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type Language = "id" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  id: {
    title: "Daftar Tugas",
    addTask: "Tambah Tugas",
    delete: "Hapus",
    completed: "Selesai",
    pending: "Belum Selesai"
  },
  en: {
    title: "Task List",
    addTask: "Add Task",
    delete: "Delete",
    completed: "Completed",
    pending: "Pending"
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("id")

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}