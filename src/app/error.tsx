"use client";

import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh] px-4">
      <div className="text-center max-w-sm">
        <p
          className="text-xs font-bold tracking-[0.25em] uppercase mb-3"
          style={{ color: "#9E9EA8" }}
        >
          {t("Something went wrong", "Algo salió mal")}
        </p>
        <h2
          className="text-2xl font-medium mb-3"
          style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
        >
          {t("Unexpected Error", "Error inesperado")}
        </h2>
        <p className="text-sm mb-6" style={{ color: "#6E6E73" }}>
          {t(
            "We ran into a problem loading this page. Please try again.",
            "Tuvimos un problema al cargar esta página. Inténtalo de nuevo.",
          )}
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 rounded-full text-sm font-semibold text-white"
          style={{ background: "#1D1D1F" }}
        >
          {t("Try Again", "Reintentar")}
        </button>
      </div>
    </div>
  );
}
