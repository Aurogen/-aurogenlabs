"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { X, Bell, Mail, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  productName: string;
  onClose: () => void;
}

export default function NotifyModal({ productName, onClose }: Props) {
  const { user } = useUser();
  const { t } = useLanguage();
  const userEmail = user?.primaryEmailAddress?.emailAddress ?? "";

  const [email, setEmail] = useState(userEmail);
  const [submitted, setSubmitted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setFailed(false);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, product_name: productName }),
      });
      if (res.ok) setSubmitted(true);
      else setFailed(true);
    } catch (err) {
      console.error("Waitlist error:", err);
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
      >
        <div className="h-0.5" style={{ background: "linear-gradient(90deg, transparent, #6B7A8D, transparent)" }} />

        <div className="p-6">
          <button
            onClick={onClose}
            aria-label={t("Close", "Cerrar")}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-black hover:bg-black/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {!submitted ? (
            <>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(22,38,74,0.1)", border: "1px solid rgba(22,38,74,0.2)" }}
                >
                  <Bell className="w-6 h-6" style={{ color: "#6B7A8D" }} />
                </div>
                <div>
                  <h3 className="font-medium text-xl" style={{ fontFamily: "var(--font-heading, serif)", color: "#111111" }}>
                    {t("Notify me", "Avísame")}
                  </h3>
                  <p className="text-sm" style={{ color: "#6E6E73" }}>{t("When back in stock", "Cuando vuelva a haber stock")}</p>
                </div>
              </div>

              <div
                className="mb-5 p-3 rounded-xl"
                style={{ background: "rgba(22,38,74,0.05)", border: "1px solid rgba(22,38,74,0.15)" }}
              >
                <p className="text-sm text-center font-medium" style={{ color: "#6B7A8D" }}>{productName}</p>
                <p className="text-gray-500 text-xs text-center mt-0.5">{t("Out of stock · Restock estimated soon", "Agotado · Reposición prevista pronto")}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs mb-1.5 tracking-wide" style={{ color: "#6E6E73" }}>{t("EMAIL *", "CORREO *")}</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => !userEmail && setEmail(e.target.value)}
                      readOnly={!!userEmail}
                      placeholder={t("you@email.com", "tu@correo.com")}
                      required
                      className="w-full pl-10 pr-20 py-3 rounded-xl text-sm placeholder-gray-400 focus:outline-none transition-colors"
                      style={{
                        background: "#F5F4F0",
                        color: "#111111",
                        border: "1px solid rgba(22,38,74,0.25)",
                        cursor: userEmail ? "default" : "text",
                      }}
                    />
                    {userEmail && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] tracking-wide font-medium" style={{ color: "#6B7A8D" }}>
                        {t("AUTO-FILLED", "AUTOCOMPLETADO")}
                      </span>
                    )}
                  </div>
                </div>


                {failed && (
                  <p className="text-xs" style={{ color: "#F87171" }} role="alert">
                    {t("We couldn't save your request. Please try again.", "No pudimos guardar tu aviso. Inténtalo de nuevo.")}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full py-3 rounded-full font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "#111111" }}
                >
                  {loading ? t("Registering...", "Registrando...") : t("Notify me when available", "Avísame cuando esté disponible")}
                </button>
              </form>

              <p className="text-xs text-center mt-4" style={{ color: "#9E9EA8" }}>
                {t("No spam. We'll only reach out when this item is restocked.", "Nada de spam. Solo te escribiremos cuando este producto vuelva a estar disponible.")}
              </p>
            </>
          ) : (
            <div className="py-8 text-center">
              <CheckCircle2 className="w-16 h-16 mx-auto mb-4" style={{ color: "#6B7A8D" }} />
              <h3 className="font-medium text-2xl mb-2" style={{ fontFamily: "var(--font-heading, serif)", color: "#111111" }}>
                {t("You're on the list!", "¡Ya estás en la lista!")}
              </h3>
              <p className="text-sm mb-1" style={{ color: "#55555A" }}>
                {t("We'll email you as soon as", "Te enviaremos un correo en cuanto")}{" "}
                <span className="font-medium" style={{ color: "#6B7A8D" }}>{productName}</span>{" "}
                {t("is back in stock.", "vuelva a estar disponible.")}
              </p>
              <p className="text-gray-500 text-xs mb-6">{t("Check your inbox to confirm your notification.", "Revisa tu bandeja de entrada para confirmar tu aviso.")}</p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full text-sm font-semibold border transition-colors hover:bg-black/5"
                style={{ borderColor: "rgba(0,0,0,0.15)", color: "#111111" }}
              >
                {t("Close", "Cerrar")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
