import type { Dictionary } from "@/lib/i18n";
export type Theme = "light" | "dark";
export type Language = "id" | "en"

export interface SettingContextItem {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    language: Language;
    setLanguage: (language: Language) => void;
    translate: Dictionary;
}