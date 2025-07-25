"use client";

import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../_hooks/useLocalStorage";

const LanguageContext = createContext({
  language: "en",
  langs: {},
  setLanguage: () => {},
});

export const LanguageProvider = ({ children }) => {
  const { setLocalStorage, getLocalStorage } = useLocalStorage();

  const [language, setLanguage] = useState("en");
  const [langs, setLangs] = useState(require(`../_langs/en.json`));

  useEffect(() => {
    const lang = getLocalStorage("language");
    if (lang) {
      setLanguage(lang);
      setLangs(require(`../_langs/${lang}.json`));
    } else {
      setLocalStorage("language", "en");
      setLanguage("en");
      setLangs(require(`../_langs/en.json`));
    }
  }, []);

  useEffect(() => {
    setLocalStorage("language", language);
    setLangs(require(`../_langs/${language}.json`));
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, langs }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
