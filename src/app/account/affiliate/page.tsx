"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Copy, Check, TrendingUp, DollarSign, ShoppingBag, ExternalLink } from "lucide-react";
import Link from "next/link";

interface AffiliateStats {
  totalOrders: number;
  totalSales: number;
  totalCommission: number;
}

interface AffiliateOrder {
  id: string;
  date: string;
  name: string;
  total: number;
  commission: number;
  status: string;
}

interface AffiliateData {
  code: string;
  commission_rate: number;
  created_at: string;
}

const STATUS_COLORS: Record<string, { color: string; bg: string }> = {
  delivered:  { color: "#1B7A45", bg: "rgba(27,122,69,0.08)" },
  shipped:    { color: "#0A84FF", bg: "rgba(10,132,255,0.08)" },
  processing: { color: "#9A6400", bg: "rgba(234,179,8,0.08)" },
  pending:    { color: "#6E6E73", bg: "rgba(110,110,115,0.10)" },
};

function fmt(d?: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function AffiliateDashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [data, setData] = useState<{
    affiliate: AffiliateData | null;
    stats: AffiliateStats;
    orders: AffiliateOrder[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) { router.push("/"); return; }

    fetch("/api/account/affiliate")
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isLoaded, user, router]);

  function copyLink() {
    if (!data?.affiliate) return;
    const url = `https://aurogenlabs.com/shop?ref=${data.affiliate.code}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F6F6F8" }}>
        <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!data?.affiliate) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#F6F6F8" }}>
        <div className="text-center max-w-sm">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
          >
            <TrendingUp className="w-7 h-7" style={{ color: "#6E6E73" }} />
          </div>
          <h1 className="text-2xl font-bold mb-3" style={{ color: "#1D1D1F" }}>Affiliate Program</h1>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "#6E6E73" }}>
            You don&apos;t have an active affiliate account yet. Apply to our program and start earning 20% commission on every sale you refer.
          </p>
          <Link
            href="/affiliates"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white"
            style={{ background: "#1D1D1F" }}
          >
            Apply Now
          </Link>
        </div>
      </div>
    );
  }

  const { affiliate, stats, orders } = data;
  const refLink = `https://aurogenlabs.com/shop?ref=${affiliate.code}`;

  return (
    <div className="min-h-screen py-10" style={{ background: "#F6F6F8" }}>
      <div className="max-w-4xl mx-auto px-4">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-bold tracking-[0.2em] mb-1" style={{ color: "#6E6E73" }}>AFFILIATE DASHBOARD</p>
          <h1 className="text-3xl font-bold" style={{ color: "#1D1D1F", fontFamily: "var(--font-heading, sans-serif)" }}>
            My Affiliate Portal
          </h1>
          <p className="text-sm mt-1" style={{ color: "#9E9EA8" }}>
            Member since {fmt(affiliate.created_at)} · {affiliate.commission_rate}% commission rate
          </p>
        </div>

        {/* Referral link card */}
        <div
          className="p-6 rounded-2xl mb-6"
          style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
        >
          <p className="text-xs font-bold tracking-[0.15em] mb-3" style={{ color: "#9E9EA8" }}>YOUR REFERRAL LINK</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <div
              className="flex-1 px-4 py-3 rounded-xl text-sm font-mono truncate"
              style={{ background: "#F6F6F8", color: "#1D1D1F", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              {refLink}
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={copyLink}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: copied ? "rgba(27,122,69,0.10)" : "#F6F6F8",
                  color: copied ? "#1B7A45" : "#1D1D1F",
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy"}
              </button>
              <a
                href={refLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold"
                style={{ background: "#F6F6F8", color: "#0A84FF", border: "1px solid rgba(0,0,0,0.08)" }}
              >
                <ExternalLink className="w-4 h-4" />
                Preview
              </a>
            </div>
          </div>
          <p className="text-xs mt-3" style={{ color: "#9E9EA8" }}>
            Share this link and earn {affiliate.commission_rate}% on every purchase made through it.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[
            {
              label: "Total Orders Referred",
              value: String(stats.totalOrders),
              icon: ShoppingBag,
              color: "#0A84FF",
            },
            {
              label: "Total Sales Generated",
              value: `$${stats.totalSales.toFixed(2)}`,
              icon: TrendingUp,
              color: "#1B7A45",
            },
            {
              label: "Commission Earned",
              value: `$${stats.totalCommission.toFixed(2)}`,
              icon: DollarSign,
              color: "#9A6400",
            },
          ].map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="p-5 rounded-2xl"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${color}18` }}
                >
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <p className="text-xs font-medium" style={{ color: "#9E9EA8" }}>{label}</p>
              </div>
              <p className="text-2xl font-bold" style={{ color: "#1D1D1F" }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Orders table */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
        >
          <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <h2 className="font-bold text-base" style={{ color: "#1D1D1F" }}>Referred Orders</h2>
          </div>

          {orders.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm" style={{ color: "#9E9EA8" }}>No referred orders yet. Share your link to start earning!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                    {["Order", "Customer", "Date", "Sale", "Commission", "Status"].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-3 text-left text-xs font-semibold tracking-[0.08em] uppercase"
                        style={{ color: "#9E9EA8" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o, i) => {
                    const sc = STATUS_COLORS[o.status] ?? STATUS_COLORS.pending;
                    return (
                      <tr
                        key={o.id}
                        style={{ borderBottom: i < orders.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none" }}
                      >
                        <td className="px-6 py-4 font-mono text-xs" style={{ color: "#0A84FF" }}>{o.id}</td>
                        <td className="px-6 py-4" style={{ color: "#1D1D1F" }}>{o.name}</td>
                        <td className="px-6 py-4 text-xs" style={{ color: "#6E6E73" }}>{fmt(o.date)}</td>
                        <td className="px-6 py-4 font-semibold" style={{ color: "#1D1D1F" }}>${o.total.toFixed(2)}</td>
                        <td className="px-6 py-4 font-semibold" style={{ color: "#1B7A45" }}>
                          ${(o.commission ?? 0).toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-semibold capitalize"
                            style={{ background: sc.bg, color: sc.color }}
                          >
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "#C0C0C5" }}>
          Commissions are tracked automatically. Contact us for payout details.
        </p>
      </div>
    </div>
  );
}
