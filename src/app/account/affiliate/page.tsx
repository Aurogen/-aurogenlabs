"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Copy, Check, TrendingUp } from "lucide-react";
import { PRODUCTS } from "@/data/products";

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

const COMMISSION_LABEL: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "Pending", color: "#9A6400", bg: "rgba(234,179,8,0.10)" },
  approved: { label: "Approved", color: "#0A6ED1", bg: "rgba(10,132,255,0.10)" },
  paid: { label: "Paid", color: "#1B7A45", bg: "rgba(27,122,69,0.10)" },
  void: { label: "Void", color: "#9A9AA0", bg: "rgba(0,0,0,0.05)" },
};

const money = (n: number) => `$${n.toFixed(2)}`;
const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
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
          aria-label={`Copy ${label}`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export default function AffiliatePortal() {
  const [data, setData] = useState<PortalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [productSlug, setProductSlug] = useState("");
  const [payout, setPayout] = useState<{ method: string; details: string } | null>(null);
  const [savingPayout, setSavingPayout] = useState<"idle" | "saving" | "saved">("idle");

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
          <h1 className="text-2xl font-bold mb-3" style={{ color: INK }}>Affiliate program</h1>
          <p className="text-[15px] leading-relaxed mb-6" style={{ color: MUTED }}>
            You don&apos;t have an affiliate account yet. Apply and, once approved, you&apos;ll get a personal link and coupon code to share.
          </p>
          <Link href="/affiliates" className="inline-flex items-center h-12 px-7 rounded-full text-[15px] font-semibold text-white" style={{ background: INK }}>
            Apply now
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
    const res = await fetch("/api/account/affiliate", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payout_method: payoutForm.method, payout_details: payoutForm.details }),
    });
    setSavingPayout(res.ok ? "saved" : "idle");
    if (res.ok) setTimeout(() => setSavingPayout("idle"), 2000);
  }

  const statCards = stats
    ? [
        { label: "Link clicks", value: stats.clicks.toLocaleString(), sub: `${stats.clicks30.toLocaleString()} in the last 30 days` },
        { label: "Orders", value: stats.orders.toLocaleString(), sub: `${stats.conversionRate}% of clicks` },
        { label: "Referred sales", value: money(stats.sales), sub: `${affiliate.commission_rate}% commission` },
        { label: "Pending", value: money(stats.pending), sub: "Awaiting review" },
        { label: "Approved", value: money(stats.approved), sub: "Ready for next payout" },
        { label: "Paid out", value: money(stats.paid), sub: `${payouts.length} payout${payouts.length === 1 ? "" : "s"}` },
      ]
    : [];

  return (
    <div className="min-h-screen" style={{ background: "#F5F4F0" }}>
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <div className="text-center sm:text-left mb-8">
          <p className="text-[13px] mb-1" style={{ color: MUTED }}>Affiliate portal</p>
          <h1 className="font-bold" style={{ fontFamily: "var(--font-heading, sans-serif)", fontSize: "clamp(28px, 4vw, 40px)", color: INK, letterSpacing: "-0.02em" }}>
            Welcome, {affiliate.name.split(" ")[0]}
          </h1>
          {!affiliate.active && (
            <p className="mt-3 inline-block text-[13px] px-3 py-1.5 rounded-lg" style={{ background: "rgba(192,57,43,0.08)", color: "#B42318" }}>
              Your affiliate account is paused. New clicks and coupon uses aren&apos;t being credited.
            </p>
          )}
        </div>

        {/* Share */}
        <section className="rounded-2xl p-5 sm:p-6 mb-6" style={CARD}>
          <h2 className="font-semibold text-[17px] mb-1" style={{ color: INK }}>Share and earn</h2>
          <p className="text-[14px] mb-5" style={{ color: MUTED }}>
            You earn {affiliate.commission_rate}% of every order placed within 30 days of a click on your link, or whenever a customer uses your coupon.
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            <CopyField label="Your link" value={affiliate.link} />
            {affiliate.coupon_code ? (
              <CopyField label={`Your coupon · ${affiliate.customer_discount_pct}% off for your audience`} value={affiliate.coupon_code} />
            ) : (
              <div>
                <p className="text-[12px] mb-1.5" style={{ color: MUTED }}>Your coupon</p>
                <p className="px-3 py-2.5 rounded-lg text-[14px]" style={{ background: "#F5F4F0", color: MUTED }}>
                  Not assigned yet — our team will set one up for you.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-5" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
            <p className="text-[12px] mb-1.5" style={{ color: MUTED }}>Link to a specific product</p>
            <select
              value={productSlug}
              onChange={(e) => setProductSlug(e.target.value)}
              className="w-full md:w-80 h-11 px-3 rounded-lg text-base sm:text-[14px] mb-3"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.15)", color: INK }}
            >
              <option value="">Choose a product…</option>
              {productOptions.map((p) => (
                <option key={p.slug} value={p.slug}>{p.label}</option>
              ))}
            </select>
            {productLink && <CopyField label="Product link" value={productLink} />}
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
          <h2 className="font-semibold text-[17px] px-5 sm:px-6 pt-5 pb-3" style={{ color: INK }}>Referred orders</h2>
          {orders.length === 0 ? (
            <p className="px-5 sm:px-6 pb-6 text-[14px]" style={{ color: MUTED }}>
              No orders yet. Share your link or coupon to get started.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-[14px]">
                <thead>
                  <tr style={{ color: MUTED, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                    <th className="text-left font-medium px-5 sm:px-6 py-2.5">Date</th>
                    <th className="text-left font-medium px-3 py-2.5">Via</th>
                    <th className="text-right font-medium px-3 py-2.5">Order</th>
                    <th className="text-right font-medium px-3 py-2.5">Commission</th>
                    <th className="text-right font-medium px-5 sm:px-6 py-2.5">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => {
                    const st = COMMISSION_LABEL[o.commissionStatus] ?? COMMISSION_LABEL.pending;
                    return (
                      <tr key={o.id} style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                        <td className="px-5 sm:px-6 py-3 whitespace-nowrap" style={{ color: INK }}>{fmtDate(o.date)}</td>
                        <td className="px-3 py-3" style={{ color: MUTED }}>{o.source === "coupon" ? "Coupon" : "Link"}</td>
                        <td className="px-3 py-3 text-right tabular-nums" style={{ color: INK }}>{money(o.total)}</td>
                        <td className="px-3 py-3 text-right tabular-nums font-medium" style={{ color: INK }}>{money(o.commission)}</td>
                        <td className="px-5 sm:px-6 py-3 text-right">
                          <span className="inline-block px-2 py-0.5 rounded-full text-[12px] font-medium" style={{ color: st.color, background: st.bg }}>
                            {st.label}
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
            <h2 className="font-semibold text-[17px] mb-1" style={{ color: INK }}>How you get paid</h2>
            <p className="text-[14px] mb-4" style={{ color: MUTED }}>Approved commissions are paid out by our team to the account below.</p>
            <label className="block text-[12px] mb-1.5" style={{ color: MUTED }} htmlFor="payout-method">Method</label>
            <select
              id="payout-method"
              value={payoutForm.method}
              onChange={(e) => setPayout({ ...payoutForm, method: e.target.value })}
              className="w-full h-11 px-3 rounded-lg text-base sm:text-[14px] mb-3"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.15)", color: INK }}
            >
              <option value="">Select…</option>
              <option value="paypal">PayPal</option>
              <option value="zelle">Zelle</option>
              <option value="bank">Bank transfer (ACH)</option>
              <option value="other">Other</option>
            </select>
            <label className="block text-[12px] mb-1.5" style={{ color: MUTED }} htmlFor="payout-details">Account (email, phone or account details)</label>
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
              {savingPayout === "saving" ? "Saving…" : savingPayout === "saved" ? "Saved" : "Save payout details"}
            </button>
          </section>

          {/* Payout history */}
          <section className="rounded-2xl p-5 sm:p-6" style={CARD}>
            <h2 className="font-semibold text-[17px] mb-4" style={{ color: INK }}>Payout history</h2>
            {payouts.length === 0 ? (
              <p className="text-[14px]" style={{ color: MUTED }}>No payouts yet.</p>
            ) : (
              <ul>
                {payouts.map((p) => (
                  <li key={p.id} className="flex items-center justify-between py-3 text-[14px]" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                    <span style={{ color: INK }}>
                      {fmtDate(p.created_at)}
                      <span className="block text-[12px]" style={{ color: MUTED }}>
                        {p.order_count} order{p.order_count === 1 ? "" : "s"}{p.method ? ` · ${p.method}` : ""}
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
          Commissions become approved once an order is paid and past the return window. Purchases made with your own account don&apos;t earn commission.
        </p>
      </div>
    </div>
  );
}
