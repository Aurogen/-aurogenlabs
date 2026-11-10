"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Copy, Check, TrendingUp } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";

interface PortalData {
  affiliate: {
    name: string;
    code: string;
    coupon_code: string | null;
    commission_rate: number;
    customer_discount_pct: number;
    active: boolean;
    payout_method: string;
    payout_details: string;
    link: string;
    site: string;
  } | null;
  stats?: {
    clicks: number;
    clicks30: number;
    orders: number;
    conversionRate: number;
    sales: number;
    pending: number;
    approved: number;
    paid: number;
  };
  orders?: { id: string; date: string; total: number; commission: number; commissionStatus: string; source: string }[];
  payouts?: { id: string; amount: number; order_count: number; method: string | null; reference: string | null; created_at: string }[];
}

const INK = "#111111";
const MUTED = "#6B6B70";
const CARD = { background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" };

const COMMISSION_LABEL: Record<string, { label: string; es: string; color: string; bg: string }> = {
  pending: { label: "Pending", es: "Pendiente", color: "#9A6400", bg: "rgba(234,179,8,0.10)" },
  approved: { label: "Approved", es: "Aprobada", color: "#0A6ED1", bg: "rgba(10,132,255,0.10)" },
  paid: { label: "Paid", es: "Pagada", color: "#1B7A45", bg: "rgba(27,122,69,0.10)" },
  void: { label: "Void", es: "Anulada", color: "#9A9AA0", bg: "rgba(0,0,0,0.05)" },
};

const money = (n: number) => `$${n.toFixed(2)}`;
const fmtDate = (d: string, locale = "en-US") => new Date(d).toLocaleDateString(locale, { month: "short", day: "numeric", year: "numeric" });

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();
  return (
    <div>
      <p className="text-[12px] mb-1.5" style={{ color: MUTED }}>{label}</p>
      <div className="flex items-stretch gap-2">
        <code className="flex-1 min-w-0 truncate px-3 py-2.5 rounded-lg text-[14px]" style={{ background: "#F5F4F0", color: INK }}>
          {value}
        </code>
        <button
          onClick={() => {
            navigator.clipboard.writeText(value).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            });
          }}
          className="shrink-0 inline-flex items-center gap-1.5 px-3.5 rounded-lg text-[13px] font-medium text-white"
          style={{ background: copied ? "#1B7A45" : INK }}
          aria-label={t(`Copy ${label}`, `Copiar ${label}`)}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? t("Copied", "Copiado") : t("Copy", "Copiar")}
        </button>
      </div>
    </div>
  );
}

export default function AffiliatePortal() {
  const { lang, t } = useLanguage();
  const locale = lang === "es" ? "es-MX" : "en-US";
  const [data, setData] = useState<PortalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [productSlug, setProductSlug] = useState("");
  const [payout, setPayout] = useState<{ method: string; details: string } | null>(null);
  const [savingPayout, setSavingPayout] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    fetch("/api/account/affiliate")
      .then((r) => r.json())
      .then((d: PortalData) => setData(d))
      .catch(() => setData({ affiliate: null }))
      .finally(() => setLoading(false));
  }, []);

  const productOptions = useMemo(
    () => PRODUCTS.map((p) => ({ slug: p.slug, label: `${p.name} ${p.concentration}` })),
    [],
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F5F4F0" }}>
        <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!data?.affiliate) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5" style={{ background: "#F5F4F0" }}>
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={CARD}>
            <TrendingUp className="w-6 h-6" style={{ color: MUTED }} />
          </div>
          <h1 className="text-2xl font-bold mb-3" style={{ color: INK }}>{t("Affiliate program", "Programa de afiliados")}</h1>
          <p className="text-[15px] leading-relaxed mb-6" style={{ color: MUTED }}>
            {t(
              "You don't have an affiliate account yet. Apply and, once approved, you'll get a personal link and coupon code to share.",
              "Aún no tienes una cuenta de afiliado. Aplica y, una vez aprobada, recibirás un link personal y un código de cupón para compartir.",
            )}
          </p>
          <Link href="/affiliates" className="inline-flex items-center h-12 px-7 rounded-full text-[15px] font-semibold text-white" style={{ background: INK }}>
            {t("Apply now", "Aplicar ahora")}
          </Link>
        </div>
      </div>
    );
  }

  const { affiliate, stats, orders = [], payouts = [] } = data;
  const productLink = productSlug ? `${affiliate.link}?to=${encodeURIComponent(`/product/${productSlug}`)}` : "";
  const payoutForm = payout ?? { method: affiliate.payout_method, details: affiliate.payout_details };

  async function savePayout() {
    setSavingPayout("saving");
    try {
      const res = await fetch("/api/account/affiliate", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payout_method: payoutForm.method, payout_details: payoutForm.details }),
      });
      setSavingPayout(res.ok ? "saved" : "error");
      if (res.ok) setTimeout(() => setSavingPayout("idle"), 2000);
    } catch {
      setSavingPayout("error");
    }
  }

  const statCards = stats
    ? [
        { label: t("Link clicks", "Clics en el link"), value: stats.clicks.toLocaleString(), sub: t(`${stats.clicks30.toLocaleString()} in the last 30 days`, `${stats.clicks30.toLocaleString()} en los últimos 30 días`) },
        { label: t("Orders", "Pedidos"), value: stats.orders.toLocaleString(), sub: t(`${stats.conversionRate}% of clicks`, `${stats.conversionRate}% de los clics`) },
        { label: t("Referred sales", "Ventas referidas"), value: money(stats.sales), sub: t(`${affiliate.commission_rate}% commission`, `${affiliate.commission_rate}% de comisión`) },
        { label: t("Pending", "Pendiente"), value: money(stats.pending), sub: t("Awaiting review", "En revisión") },
        { label: t("Approved", "Aprobado"), value: money(stats.approved), sub: t("Ready for next payout", "Listo para el próximo pago") },
        { label: t("Paid out", "Pagado"), value: money(stats.paid), sub: t(`${payouts.length} payout${payouts.length === 1 ? "" : "s"}`, `${payouts.length} pago${payouts.length === 1 ? "" : "s"}`) },
      ]
    : [];

  return (
    <div className="min-h-screen" style={{ background: "#F5F4F0" }}>
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <div className="text-center sm:text-left mb-8">
          <p className="text-[13px] mb-1" style={{ color: MUTED }}>{t("Affiliate portal", "Portal de afiliados")}</p>
          <h1 className="font-bold" style={{ fontFamily: "var(--font-heading, sans-serif)", fontSize: "clamp(28px, 4vw, 40px)", color: INK, letterSpacing: "-0.02em" }}>
            {t("Welcome", "Hola")}, {affiliate.name.split(" ")[0]}
          </h1>
          {!affiliate.active && (
            <p className="mt-3 inline-block text-[13px] px-3 py-1.5 rounded-lg" style={{ background: "rgba(192,57,43,0.08)", color: "#B42318" }}>
              {t(
                "Your affiliate account is paused. New clicks and coupon uses aren't being credited.",
                "Tu cuenta de afiliado está en pausa. Los nuevos clics y usos del cupón no se están acreditando.",
              )}
            </p>
          )}
        </div>

        {/* Share */}
        <section className="rounded-2xl p-5 sm:p-6 mb-6" style={CARD}>
          <h2 className="font-semibold text-[17px] mb-1" style={{ color: INK }}>{t("Share and earn", "Comparte y gana")}</h2>
          <p className="text-[14px] mb-5" style={{ color: MUTED }}>
            {t(
              `You earn ${affiliate.commission_rate}% of every order placed within 30 days of a click on your link, or whenever a customer uses your coupon.`,
              `Ganas el ${affiliate.commission_rate}% de cada pedido realizado dentro de los 30 días posteriores a un clic en tu link, o cada vez que un cliente usa tu cupón.`,
            )}
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            <CopyField label={t("Your link", "Tu link")} value={affiliate.link} />
            {affiliate.coupon_code ? (
              <CopyField label={t(
                `Your coupon · ${affiliate.customer_discount_pct}% off for your audience`,
                `Tu cupón · ${affiliate.customer_discount_pct}% de descuento para tu audiencia`,
              )} value={affiliate.coupon_code} />
            ) : (
              <div>
                <p className="text-[12px] mb-1.5" style={{ color: MUTED }}>{t("Your coupon", "Tu cupón")}</p>
                <p className="px-3 py-2.5 rounded-lg text-[14px]" style={{ background: "#F5F4F0", color: MUTED }}>
                  {t("Not assigned yet — our team will set one up for you.", "Aún no asignado — nuestro equipo te configurará uno.")}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-5" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
            <p className="text-[12px] mb-1.5" style={{ color: MUTED }}>{t("Link to a specific product", "Link a un producto específico")}</p>
            <select
              value={productSlug}
              onChange={(e) => setProductSlug(e.target.value)}
              className="w-full md:w-80 h-11 px-3 rounded-lg text-base sm:text-[14px] mb-3"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.15)", color: INK }}
            >
              <option value="">{t("Choose a product…", "Elige un producto…")}</option>
              {productOptions.map((p) => (
                <option key={p.slug} value={p.slug}>{p.label}</option>
              ))}
            </select>
            {productLink && <CopyField label={t("Product link", "Link del producto")} value={productLink} />}
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {statCards.map((s) => (
            <div key={s.label} className="rounded-2xl p-4 sm:p-5 text-center sm:text-left" style={CARD}>
              <p className="text-[12px]" style={{ color: MUTED }}>{s.label}</p>
              <p className="font-semibold text-[22px] sm:text-[26px] mt-1 tabular-nums" style={{ color: INK }}>{s.value}</p>
              <p className="text-[12px] mt-1" style={{ color: MUTED }}>{s.sub}</p>
            </div>
          ))}
        </section>

        {/* Orders */}
        <section className="rounded-2xl mb-6 overflow-hidden" style={CARD}>
          <h2 className="font-semibold text-[17px] px-5 sm:px-6 pt-5 pb-3" style={{ color: INK }}>{t("Referred orders", "Pedidos referidos")}</h2>
          {orders.length === 0 ? (
            <p className="px-5 sm:px-6 pb-6 text-[14px]" style={{ color: MUTED }}>
              {t("No orders yet. Share your link or coupon to get started.", "Aún no hay pedidos. Comparte tu link o cupón para empezar.")}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-[14px]">
                <thead>
                  <tr style={{ color: MUTED, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                    <th className="text-left font-medium px-5 sm:px-6 py-2.5">{t("Date", "Fecha")}</th>
                    <th className="text-left font-medium px-3 py-2.5">{t("Via", "Vía")}</th>
                    <th className="text-right font-medium px-3 py-2.5">{t("Order", "Pedido")}</th>
                    <th className="text-right font-medium px-3 py-2.5">{t("Commission", "Comisión")}</th>
                    <th className="text-right font-medium px-5 sm:px-6 py-2.5">{t("Status", "Estado")}</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => {
                    const st = COMMISSION_LABEL[o.commissionStatus] ?? COMMISSION_LABEL.pending;
                    return (
                      <tr key={o.id} style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                        <td className="px-5 sm:px-6 py-3 whitespace-nowrap" style={{ color: INK }}>{fmtDate(o.date, locale)}</td>
                        <td className="px-3 py-3" style={{ color: MUTED }}>{o.source === "coupon" ? t("Coupon", "Cupón") : t("Link", "Link")}</td>
                        <td className="px-3 py-3 text-right tabular-nums" style={{ color: INK }}>{money(o.total)}</td>
                        <td className="px-3 py-3 text-right tabular-nums font-medium" style={{ color: INK }}>{money(o.commission)}</td>
                        <td className="px-5 sm:px-6 py-3 text-right">
                          <span className="inline-block px-2 py-0.5 rounded-full text-[12px] font-medium" style={{ color: st.color, background: st.bg }}>
                            {t(st.label, st.es)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Payout details */}
          <section className="rounded-2xl p-5 sm:p-6" style={CARD}>
            <h2 className="font-semibold text-[17px] mb-1" style={{ color: INK }}>{t("How you get paid", "Cómo recibes tus pagos")}</h2>
            <p className="text-[14px] mb-4" style={{ color: MUTED }}>{t("Approved commissions are paid out by our team to the account below.", "Nuestro equipo paga las comisiones aprobadas a la cuenta que indiques abajo.")}</p>
            <label className="block text-[12px] mb-1.5" style={{ color: MUTED }} htmlFor="payout-method">{t("Method", "Método")}</label>
            <select
              id="payout-method"
              value={payoutForm.method}
              onChange={(e) => setPayout({ ...payoutForm, method: e.target.value })}
              className="w-full h-11 px-3 rounded-lg text-base sm:text-[14px] mb-3"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.15)", color: INK }}
            >
              <option value="">{t("Select…", "Selecciona…")}</option>
              <option value="paypal">PayPal</option>
              <option value="zelle">Zelle</option>
              <option value="bank">{t("Bank transfer (ACH)", "Transferencia bancaria (ACH)")}</option>
              <option value="other">{t("Other", "Otro")}</option>
            </select>
            <label className="block text-[12px] mb-1.5" style={{ color: MUTED }} htmlFor="payout-details">{t("Account (email, phone or account details)", "Cuenta (email, teléfono o datos de la cuenta)")}</label>
            <input
              id="payout-details"
              value={payoutForm.details}
              onChange={(e) => setPayout({ ...payoutForm, details: e.target.value })}
              maxLength={300}
              className="w-full h-11 px-3 rounded-lg text-base sm:text-[14px] mb-4"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.15)", color: INK }}
            />
            <button
              onClick={savePayout}
              disabled={savingPayout === "saving"}
              className="h-11 px-6 rounded-full text-[14px] font-medium text-white disabled:opacity-60"
              style={{ background: savingPayout === "saved" ? "#1B7A45" : INK }}
            >
              {savingPayout === "saving"
                ? t("Saving…", "Guardando…")
                : savingPayout === "saved"
                  ? t("Saved", "Guardado")
                  : t("Save payout details", "Guardar datos de pago")}
            </button>
            {savingPayout === "error" && (
              <p className="mt-2 text-[13px]" style={{ color: "#C0392B" }} role="alert">
                {t("We couldn't save your payout details. Please try again.", "No pudimos guardar tus datos de pago. Inténtalo de nuevo.")}
              </p>
            )}
          </section>

          {/* Payout history */}
          <section className="rounded-2xl p-5 sm:p-6" style={CARD}>
            <h2 className="font-semibold text-[17px] mb-4" style={{ color: INK }}>{t("Payout history", "Historial de pagos")}</h2>
            {payouts.length === 0 ? (
              <p className="text-[14px]" style={{ color: MUTED }}>{t("No payouts yet.", "Aún no hay pagos.")}</p>
            ) : (
              <ul>
                {payouts.map((p) => (
                  <li key={p.id} className="flex items-center justify-between py-3 text-[14px]" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                    <span style={{ color: INK }}>
                      {fmtDate(p.created_at, locale)}
                      <span className="block text-[12px]" style={{ color: MUTED }}>
                        {p.order_count} {t(`order${p.order_count === 1 ? "" : "s"}`, `pedido${p.order_count === 1 ? "" : "s"}`)}{p.method ? ` · ${p.method}` : ""}
                      </span>
                    </span>
                    <span className="font-semibold tabular-nums" style={{ color: INK }}>{money(Number(p.amount))}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <p className="text-[12px] mt-8 text-center" style={{ color: MUTED }}>
          {t(
            "Commissions become approved once an order is paid and past the return window. Purchases made with your own account don't earn commission.",
            "Las comisiones se aprueban cuando el pedido está pagado y pasó el plazo de devolución. Las compras hechas con tu propia cuenta no generan comisión.",
          )}
        </p>
      </div>
    </div>
  );
}
