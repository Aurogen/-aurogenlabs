"use client";

import { useEffect, useState } from "react";
import { CheckCircle, ArrowRight, Loader2, Link2, Ticket, Wallet, BarChart3 } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useLanguage } from "@/context/LanguageContext";
import type { FormField, PartnerFormConfig } from "@/lib/partner-form";

const INK = "#1D1D1F";
const MUTED = "#6E6E73";
const BLUE = "#0A84FF";
const INPUT_STYLE = { background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.12)", color: INK };
const INPUT_CLASS =
  "w-full px-4 py-3 rounded-xl text-base sm:text-sm focus:outline-none transition-colors focus:border-black/30";
const LABEL_CLASS = "block text-sm font-semibold mb-1.5";

type Answer = string | string[] | boolean;

export default function PartnersPage() {
  const { t } = useLanguage();
  const { user } = useUser();
  const [form, setForm] = useState<PartnerFormConfig | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    fetch("/api/partner-form")
      .then((r) => r.json())
      .then((d) => alive && setForm(d.form))
      .catch(() => alive && setLoadError(true));
    return () => {
      alive = false;
    };
  }, []);

  // Prefill from the signed-in account until the visitor types their own.
  const nameValue = name || (user ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() : "");
  const emailValue = email || user?.primaryEmailAddress?.emailAddress || "";

  const setAnswer = (id: string, v: Answer) => setAnswers((a) => ({ ...a, [id]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/affiliates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nameValue, email: emailValue, answers, company_url: honeypot }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("success");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setError(data.error ?? t("Something went wrong. Please try again.", "Algo salió mal. Inténtalo de nuevo."));
        setStatus("idle");
      }
    } catch {
      setError(t("Connection error. Please try again.", "Error de conexión. Inténtalo de nuevo."));
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16" style={{ background: "#F6F6F8" }}>
        <div className="text-center max-w-md">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: "rgba(27,122,69,0.08)", border: "1px solid rgba(27,122,69,0.15)" }}
          >
            <CheckCircle className="w-7 h-7" style={{ color: "#1B7A45" }} />
          </div>
          <h1 className="text-2xl font-bold mb-3" style={{ color: INK }}>
            {t("Application received", "Solicitud recibida")}
          </h1>
          <p className="text-sm leading-relaxed mb-6 whitespace-pre-line" style={{ color: MUTED }}>
            {form?.successMessage}
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white"
            style={{ background: INK }}
          >
            {t("Browse products", "Ver productos")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const steps = [
    { icon: CheckCircle, title: t("Apply", "Aplica"), desc: t("Fill out the form. Our team reviews every application.", "Llena el formulario. Nuestro equipo revisa cada solicitud.") },
    { icon: Link2, title: t("Get your link", "Recibe tu link"), desc: t("Approved partners get a unique link to share anywhere.", "Los partners aprobados reciben un link único para compartir.") },
    { icon: Ticket, title: t("And your coupon", "Y tu cupón"), desc: t("A personal code that gives your audience a discount.", "Un código personal que da descuento a tu audiencia.") },
    { icon: Wallet, title: t("Earn commission", "Gana comisión"), desc: t("Every sale through your link or coupon is credited to you.", "Cada venta con tu link o cupón se te acredita.") },
  ];

  return (
    <div style={{ background: "#F6F6F8" }}>
      {/* Hero */}
      <section className="px-4 pt-16 pb-12 md:pt-20 text-center" style={{ background: "#FFFFFF", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="max-w-2xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
            style={{ background: "rgba(10,132,255,0.08)", color: BLUE }}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            {t("Partner program", "Programa de partners")}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: INK, fontFamily: "var(--font-heading, sans-serif)" }}>
            {t("Become an Aurogen Labs partner", "Conviértete en partner de Aurogen Labs")}
          </h1>
          <p className="text-base md:text-lg leading-relaxed mb-7" style={{ color: MUTED }}>
            {t(
              "For creators, educators and communities in the research space. Share Aurogen Labs with your audience and earn commission on every referred sale.",
              "Para creadores, educadores y comunidades del mundo de la investigación. Comparte Aurogen Labs con tu audiencia y gana comisión por cada venta referida."
            )}
          </p>
          <a
            href="#apply"
            className="inline-flex items-center gap-2 h-12 px-7 rounded-full text-[15px] font-semibold text-white"
            style={{ background: BLUE }}
          >
            {t("Apply now", "Aplicar ahora")}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {steps.map((s, i) => (
            <div key={s.title} className="p-5 rounded-2xl text-center sm:text-left" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <span className="w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center" style={{ background: "rgba(10,132,255,0.1)", color: BLUE }}>
                  {i + 1}
                </span>
                <p className="font-semibold text-sm" style={{ color: INK }}>{s.title}</p>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: MUTED }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section id="apply" className="max-w-2xl mx-auto px-4 pb-20 scroll-mt-24">
        <div className="p-6 md:p-8 rounded-2xl" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}>
          {!form ? (
            <div className="py-10 text-center">
              {loadError ? (
                <p className="text-sm" style={{ color: MUTED }}>{t("Couldn't load the form. Please refresh the page.", "No se pudo cargar el formulario. Recarga la página.")}</p>
              ) : (
                <Loader2 className="w-6 h-6 animate-spin mx-auto" style={{ color: MUTED }} />
              )}
            </div>
          ) : !form.enabled ? (
            <div className="py-8 text-center">
              <h2 className="text-xl font-bold mb-2" style={{ color: INK }}>{t("Applications are closed", "Las solicitudes están cerradas")}</h2>
              <p className="text-sm" style={{ color: MUTED }}>{t("We're not accepting new partners right now. Please check back soon.", "No estamos aceptando nuevos partners por ahora. Vuelve pronto.")}</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-2 text-center sm:text-left" style={{ color: INK, fontFamily: "var(--font-heading, sans-serif)" }}>
                {form.title}
              </h2>
              {form.intro && (
                <p className="text-sm leading-relaxed mb-6 whitespace-pre-line text-center sm:text-left" style={{ color: MUTED }}>{form.intro}</p>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="pf-name" className={LABEL_CLASS} style={{ color: INK }}>
                      {t("Full name", "Nombre completo")} <span style={{ color: "#C0392B" }}>*</span>
                    </label>
                    <input id="pf-name" required autoComplete="name" value={nameValue} onChange={(e) => setName(e.target.value)} className={INPUT_CLASS} style={INPUT_STYLE} />
                  </div>
                  <div>
                    <label htmlFor="pf-email" className={LABEL_CLASS} style={{ color: INK }}>
                      Email <span style={{ color: "#C0392B" }}>*</span>
                    </label>
                    <input id="pf-email" required type="email" autoComplete="email" value={emailValue} onChange={(e) => setEmail(e.target.value)} className={INPUT_CLASS} style={INPUT_STYLE} />
                  </div>
                </div>

                {form.fields.map((f) => (
                  <DynamicField key={f.id} field={f} value={answers[f.id]} onChange={(v) => setAnswer(f.id, v)} />
                ))}

                {/* Honeypot for bots */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="absolute -left-[9999px] w-px h-px opacity-0"
                  name="company_url"
                />

                {error && (
                  <p role="alert" className="text-sm px-4 py-3 rounded-xl" style={{ background: "rgba(192,57,43,0.08)", color: "#C0392B" }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-sm text-white transition-opacity disabled:opacity-50"
                  style={{ background: INK }}
                >
                  {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                  {status === "loading" ? t("Sending…", "Enviando…") : t("Submit application", "Enviar solicitud")}
                </button>
                <p className="text-xs text-center" style={{ color: "#9E9EA8" }}>
                  {t("Already a partner?", "¿Ya eres partner?")}{" "}
                  <Link href="/account/affiliate" className="underline" style={{ color: MUTED }}>
                    {t("Open your portal", "Abre tu portal")}
                  </Link>
                </p>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function DynamicField({ field: f, value, onChange }: { field: FormField; value: Answer | undefined; onChange: (v: Answer) => void }) {
  const id = `pf-${f.id}`;
  const required = <span style={{ color: "#C0392B" }}> *</span>;
  const help = f.help ? <p className="text-xs mt-1.5" style={{ color: "#9E9EA8" }}>{f.help}</p> : null;

  if (f.type === "consent") {
    return (
      <label className="flex items-start gap-3 text-sm leading-relaxed cursor-pointer" style={{ color: INK }}>
        <input type="checkbox" required={f.required} checked={value === true} onChange={(e) => onChange(e.target.checked)} className="mt-1 w-4 h-4 shrink-0" />
        <span>
          {f.label}
          {f.required && required}
          {help}
        </span>
      </label>
    );
  }

  if (f.type === "radio" || f.type === "checkboxes") {
    const multi = f.type === "checkboxes";
    const selected = multi ? ((value as string[] | undefined) ?? []) : value;
    return (
      <fieldset>
        <legend className={LABEL_CLASS} style={{ color: INK }}>
          {f.label}
          {f.required && required}
        </legend>
        <div className="grid sm:grid-cols-2 gap-2">
          {f.options!.map((o) => {
            const checked = multi ? (selected as string[]).includes(o) : selected === o;
            return (
              <label
                key={o}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm cursor-pointer"
                style={{ border: `1px solid ${checked ? BLUE : "rgba(0,0,0,0.12)"}`, background: checked ? "rgba(10,132,255,0.05)" : "#FFFFFF", color: INK }}
              >
                <input
                  type={multi ? "checkbox" : "radio"}
                  name={id}
                  required={!multi && f.required}
                  checked={checked}
                  onChange={() =>
                    multi
                      ? onChange(checked ? (selected as string[]).filter((x) => x !== o) : [...(selected as string[]), o])
                      : onChange(o)
                  }
                />
                {o}
              </label>
            );
          })}
        </div>
        {help}
      </fieldset>
    );
  }

  const common = {
    id,
    required: f.required,
    placeholder: f.placeholder,
    value: typeof value === "string" ? value : "",
    className: INPUT_CLASS,
    style: INPUT_STYLE,
  };

  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASS} style={{ color: INK }}>
        {f.label}
        {f.required && required}
      </label>
      {f.type === "textarea" ? (
        <textarea {...common} rows={4} className={`${INPUT_CLASS} resize-y`} onChange={(e) => onChange(e.target.value)} />
      ) : f.type === "select" ? (
        <select {...common} onChange={(e) => onChange(e.target.value)}>
          <option value="">—</option>
          {f.options!.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input
          {...common}
          type={f.type === "phone" ? "tel" : f.type === "number" ? "number" : f.type === "url" ? "text" : f.type}
          inputMode={f.type === "url" ? "url" : undefined}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {help}
    </div>
  );
}
