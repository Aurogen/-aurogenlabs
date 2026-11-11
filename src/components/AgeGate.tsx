"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, X, AlertTriangle } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import { useLanguage } from "@/context/LanguageContext";

const AGE_KEY = "aurogen_age_verified";
const RESEARCH_KEY = "aurogen_research_agreed";

/** Two separate steps on entry: age confirmation, then the research-use-only agreement. */
export default function AgeGate() {
  const [step, setStep] = useState<"age" | "research" | null>(null);
  const [declined, setDeclined] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    let next: "age" | "research" | null = null;
    try {
      if (!sessionStorage.getItem(AGE_KEY)) next = "age";
      else if (!sessionStorage.getItem(RESEARCH_KEY)) next = "research";
    } catch {
      next = "age";
    }
    if (next) setStep(next);
  }, []);

  function confirm() {
    try { sessionStorage.setItem(AGE_KEY, "1"); } catch {}
    setStep("research");
  }

  function agree() {
    try { sessionStorage.setItem(RESEARCH_KEY, "1"); } catch {}
    setStep(null);
  }

  function decline() {
    setDeclined(true);
    setTimeout(() => {
      window.location.href = "https://www.google.com";
    }, 2000);
  }

  if (!step) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.6)" }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden"
        style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 24px 64px rgba(0,0,0,0.12)" }}
      >
        {/* Top accent rule */}
        <div style={{ height: "2px", background: "#6B7A8D", opacity: 0.7 }} />

        <div className="p-8 text-center">
          {/* Logo wordmark */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Logo height={44} />
          </div>

          {step === "research" ? (
            <>
              <div className="flex justify-center mb-5">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(178,106,0,0.08)", border: "1px solid rgba(178,106,0,0.22)" }}
                >
                  <AlertTriangle className="w-8 h-8" style={{ color: "#B26A00" }} />
                </div>
              </div>

              <h2
                className="text-2xl font-medium mb-1"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
              >
                {t("Important Notice", "Aviso importante")}
              </h2>
              <p className="text-sm mb-6" style={{ color: "#9E9EA8" }}>
                {t("Please read before continuing", "Léelo antes de continuar")}
              </p>

              <div
                className="mb-6 p-4 rounded-xl"
                style={{ background: "rgba(178,106,0,0.06)", border: "1px solid rgba(178,106,0,0.22)" }}
              >
                <p className="text-base font-semibold leading-snug" style={{ color: "#1D1D1F" }}>
                  ⚠️ {t("For Research Use Only · Not for Human Consumption", "Solo para investigación · No apto para consumo humano")}
                </p>
              </div>

              <p className="text-sm mb-6 leading-relaxed" style={{ color: "#6E6E73" }}>
                {t(
                  "All products are sold strictly for laboratory and in-vitro research. They are not drugs, supplements or food, and must not be used on humans or animals.",
                  "Todos los productos se venden exclusivamente para investigación de laboratorio e in vitro. No son medicamentos, suplementos ni alimentos, y no deben usarse en personas ni en animales.",
                )}
              </p>

              <button
                onClick={agree}
                className="w-full py-3 px-6 rounded-full font-semibold text-white transition-opacity hover:opacity-85"
                style={{ background: "#1D1D1F" }}
              >
                {t("I Agree", "Acepto")}
              </button>

              <p className="text-xs mt-5" style={{ color: "#9E9EA8" }}>
                {t("By clicking I Agree you accept our", "Al hacer clic en Acepto, aceptas nuestros")}{" "}
                <Link href="/terms" className="transition-opacity hover:opacity-70" style={{ color: "#6B7A8D" }}>
                  {t("Terms of Service", "Términos del servicio")}
                </Link>{" "}
                {t("and", "y el")}{" "}
                <Link href="/disclaimer" className="transition-opacity hover:opacity-70" style={{ color: "#6B7A8D" }}>
                  {t("Research Disclaimer", "Aviso legal de investigación")}
                </Link>
                .
              </p>
            </>
          ) : !declined ? (
            <>
              {/* Shield icon */}
              <div className="flex justify-center mb-5">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(22,38,74,0.08)", border: "1px solid rgba(22,38,74,0.18)" }}
                >
                  <ShieldCheck className="w-8 h-8" style={{ color: "#6B7A8D" }} />
                </div>
              </div>

              <h2
                className="text-2xl font-medium mb-1"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
              >
                {t("Age Verification", "Verificación de edad")}
              </h2>
              <p className="text-sm mb-6" style={{ color: "#9E9EA8" }}>
                {t("Research compounds — restricted access", "Compuestos de investigación — acceso restringido")}
              </p>

              {/* Info box */}
              <div
                className="mb-6 p-4 rounded-xl text-left"
                style={{ background: "rgba(22,38,74,0.04)", border: "1px solid rgba(22,38,74,0.14)" }}
              >
                <p className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}>
                  {t(
                    "This site contains information about peptides intended for",
                    "Este sitio contiene información sobre péptidos destinados",
                  )}
                  <strong style={{ color: "#1D1D1F" }}>{t(" research use only", " solo a investigación")}</strong>.
                  {t(" Not intended for human consumption.", " No aptos para consumo humano.")}
                </p>
              </div>

              <p className="font-semibold mb-6" style={{ color: "#1D1D1F" }}>
                {t("Are you 18 years of age or older?", "¿Tienes 18 años o más?")}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={confirm}
                  className="flex-1 py-3 px-6 rounded-full font-semibold text-white transition-opacity hover:opacity-85"
                  style={{ background: "#1D1D1F" }}
                >
                  {t("Yes, I am 18+", "Sí, soy mayor de 18")}
                </button>
                <button
                  onClick={decline}
                  className="flex-1 py-3 px-6 rounded-full font-semibold transition-all"
                  style={{ border: "1px solid rgba(0,0,0,0.15)", color: "#1D1D1F", background: "transparent" }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(220,38,38,0.4)";
                    e.currentTarget.style.color = "#DC2626";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)";
                    e.currentTarget.style.color = "#1D1D1F";
                  }}
                >
                  {t("No", "No")}
                </button>
              </div>

              <p className="text-xs mt-5" style={{ color: "#9E9EA8" }}>
                {t(
                  "By continuing you confirm you are 18+ and agree to our",
                  "Al continuar, confirmas que tienes 18 años o más y aceptas nuestros",
                )}{" "}
                <Link href="/terms" className="transition-opacity hover:opacity-70" style={{ color: "#6B7A8D" }}>
                  {t("Terms of Service", "Términos del servicio")}
                </Link>
                .
              </p>
            </>
          ) : (
            <div className="py-8">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(220,38,38,0.07)", border: "1px solid rgba(220,38,38,0.15)" }}
              >
                <X className="w-7 h-7" style={{ color: "#DC2626" }} />
              </div>
              <h3 className="text-xl font-medium mb-2" style={{ color: "#1D1D1F", fontFamily: "var(--font-heading, sans-serif)" }}>
                {t("Access Denied", "Acceso denegado")}
              </h3>
              <p className="text-sm" style={{ color: "#6E6E73" }}>
                {t("You must be 18 or older to access this site.", "Debes tener 18 años o más para acceder a este sitio.")}
                <br />{t("Redirecting…", "Redirigiendo…")}
              </p>
            </div>
          )}
        </div>

        {/* Bottom disclaimer */}
        <div
          className="px-8 pb-6"
          style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
        >
          <p className="text-center text-xs pt-4" style={{ color: "#9E9EA8" }}>
            {t("FOR RESEARCH USE ONLY · NOT FOR HUMAN USE · MADE IN USA", "SOLO PARA INVESTIGACIÓN · NO APTO PARA USO HUMANO · HECHO EN EE.UU.")}
          </p>
        </div>
      </div>
    </div>
  );
}

