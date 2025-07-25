"use client";

import { useContext } from "react";
import LanguageContext from "../_contexts/LanguageContexts";

export default function Header() {
  const { langs, language, setLanguage } = useContext(LanguageContext);

  return (
    <div className="flex justify-between items-center p-4 bg-white fixed top-0 left-0 w-full z-10 shadow-md">
      <h1 className="text-2xl font-bold">{langs.title}</h1>

      <button
        onClick={() => setLanguage(language === "en" ? "id" : "en")}
        className="bg-blue-500 text-white px-4 py-2 rounded-md w-fit hover:bg-blue-400 active:bg-blue-600 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        {language === "en" ? "EN" : "ID"}
      </button>
    </div>
  );
}
