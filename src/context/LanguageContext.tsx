"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Lang = "en" | "es";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (en: string, es: string) => string;
}

const LanguageContext = createContext<LangCtx>({
  lang: "en",
  setLang: () => {},
  t: (en) => en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("aurogen_lang") as Lang | null;
    if (saved === "en" || saved === "es") setLangState(saved);
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("aurogen_lang", l);
  }

  function t(en: string, es: string) {
    return lang === "es" ? es : en;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
