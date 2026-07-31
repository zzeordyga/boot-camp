"use client";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { useSettings } from "../contexts/SettingContext";
import { translations } from "../lib/translation";

export default function SortSelect() {
    const { language } = useSettings();
    const t = translations[language];

    const [sortBy, setSortBy] =
        useLocalStorage("sortBy", "deadline");

    return (
        <div className="flex justify-end mb-5">
            <select
                value={sortBy}
                onChange={(e) =>
                    setSortBy(e.target.value)
                }
                className="
                    px-4
                    py-2
                    rounded-lg
                    border
                    dark:bg-slate-800
                    dark:text-white
                "
            >
                <option value="deadline">
                    {t.sortDeadline}
                </option>

                <option value="task">
                    {t.sortTask}
                </option>
            </select>
        </div>
    );
}