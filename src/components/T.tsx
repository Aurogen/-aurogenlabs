"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Shows `en` or `es` according to the language picked in the header.
 * Works inside server components too: <T en="Shipping" es="Envíos" />, or with JSX blocks
 * <T en={<p>…</p>} es={<p>…</p>} />.
 */
export default function T({ en, es }: { en: ReactNode; es: ReactNode }) {
  const { lang } = useLanguage();
  return <>{lang === "es" ? es : en}</>;
}
