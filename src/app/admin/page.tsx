"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Package,
  DollarSign,
  Users,
  Mail,
  Clock,
  CheckCircle2,
  Truck,
  AlertCircle,
  BarChart2,
  FlaskConical,
  ChevronDown,
  RefreshCw,
  Download,
  Bell,
  Check,
  X,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────── */
interface OrderItem { name: string; concentration?: string; quantity: number; price: number }
interface Order {
  id: string;
  created_at: string;
  name: string;
  email: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: string;
}
interface Stats {
  totalOrders: number;
  totalRevenue: number;
  processingOrders: number;
  newsletterCount: number;
  affiliateCount: number;
  waitlistCount: number;
}
interface Subscriber { email: string; created_at?: string }
interface Affiliate {
  id: string;
  name: string;
  email: string;
  website?: string;
  audience?: string;
  message?: string;
  created_at?: string;
  status?: "pending" | "approved" | "rejected";
}
interface WaitlistEntry { email: string; product_name: string; created_at?: string }

/* ─── Status config ─────────────────────────────────────── */
const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  delivered: { label: "Delivered", color: "#1B7A45", bg: "rgba(27,122,69,0.08)", icon: CheckCircle2 },
  shipped: { label: "Shipped", color: "#0A84FF", bg: "rgba(10,132,255,0.08)", icon: Truck },
  processing: { label: "Processing", color: "#9A6400", bg: "rgba(234,179,8,0.08)", icon: Clock },
  pending: { label: "Pending", color: "#6E6E73", bg: "rgba(110,110,115,0.10)", icon: AlertCircle },
};

const ORDER_STATUSES = ["pending", "processing", "shipped", "delivered"];

function fmt(d?: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/* ─── Main page ─────────────────────────────────────────── */
export default function AdminPage() {
  const [tab, setTab] = useState<"orders" | "newsletter" | "affiliates" | "waitlist">("orders");
  const [stats, setStats] = useState<Stats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async (quiet = false) => {
    quiet ? setRefreshing(true) : setLoading(true);
    try {
      const [s, o, n, a, w] = await Promise.all([
        fetch("/api/admin/stats").then((r) => r.json()),
        fetch("/api/admin/orders").then((r) => r.json()),
        fetch("/api/admin/newsletter").then((r) => r.json()),
        fetch("/api/admin/affiliates").then((r) => r.json()),
        fetch("/api/admin/waitlist").then((r) => r.json()),
      ]);
      setStats(s);
      setOrders(o.orders ?? []);
      setSubscribers(n.subscribers ?? []);
      setAffiliates(a.applications ?? []);
      setWaitlist(w.entries ?? []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function updateOrderStatus(id: string, status: string) {
    await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    load(true);
  }

  async function updateAffiliateStatus(id: string, status: "approved" | "rejected") {
    await fetch(`/api/admin/affiliates/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setAffiliates((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F6F6F8" }}>
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-600 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm" style={{ color: "#6E6E73" }}>Loading admin data…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#F6F6F8", color: "#1D1D1F" }}>
      {/* Header */}
      <div style={{ background: "#FFFFFF", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] mb-0.5" style={{ color: "#6E6E73" }}>AUROGEN LABS</p>
            <h1 className="text-xl font-bold" style={{ color: "#1D1D1F" }}>Admin Panel</h1>
          </div>
          <button
            onClick={() => load(true)}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-opacity hover:opacity-70 disabled:opacity-40"
            style={{ background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.10)", color: "#1D1D1F" }}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Stats row */}
        {stats && (
          <div className="max-w-7xl mx-auto px-4 pb-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { icon: Package, label: "Orders", value: stats.totalOrders.toString() },
              { icon: DollarSign, label: "Revenue", value: `$${stats.totalRevenue.toFixed(0)}` },
              { icon: Clock, label: "Processing", value: stats.processingOrders.toString() },
              { icon: Mail, label: "Newsletter", value: stats.newsletterCount.toString() },
              { icon: Users, label: "Affiliates", value: stats.affiliateCount.toString() },
              { icon: FlaskConical, label: "Waitlist", value: stats.waitlistCount.toString() },
            ].map((s) => (
              <div
                key={s.label}
                className="p-4 rounded-xl text-center"
                style={{ background: "rgba(10,132,255,0.04)", border: "1px solid rgba(10,132,255,0.12)" }}
              >
                <s.icon className="w-4 h-4 mx-auto mb-1.5" style={{ color: "#6B7A8D" }} />
                <p className="font-bold text-lg leading-none" style={{ color: "#1D1D1F" }}>{s.value}</p>
                <p className="text-xs mt-1" style={{ color: "#6E6E73" }}>{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 flex gap-1 border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
          {(["orders", "newsletter", "affiliates", "waitlist"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-5 py-3 text-sm font-medium transition-all capitalize relative"
              style={{
                color: tab === t ? "#1D1D1F" : "#6E6E73",
                borderBottom: tab === t ? "2px solid #1D1D1F" : "2px solid transparent",
                marginBottom: -1,
              }}
            >
              {t === "orders"
                ? `Orders (${orders.length})`
                : t === "newsletter"
                ? `Newsletter (${subscribers.length})`
                : t === "affiliates"
                ? `Affiliates (${affiliates.length})`
                : `Waitlist (${waitlist.length})`}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {tab === "orders" && (
          <OrdersTab orders={orders} onStatusChange={updateOrderStatus} />
        )}
        {tab === "newsletter" && <NewsletterTab subscribers={subscribers} />}
        {tab === "affiliates" && <AffiliatesTab affiliates={affiliates} onStatusChange={updateAffiliateStatus} />}
        {tab === "waitlist" && <WaitlistTab entries={waitlist} />}
      </div>
    </div>
  );
}

/* ─── Orders Tab ─────────────────────────────────────────── */
function OrdersTab({
  orders,
  onStatusChange,
}: {
  orders: Order[];
  onStatusChange: (id: string, status: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = orders.filter((o) => {
    const q = search.toLowerCase();
    const matchSearch = !q || o.id.toLowerCase().includes(q) || o.name.toLowerCase().includes(q) || o.email.toLowerCase().includes(q);
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  function exportCSV() {
    const headers = ["ID", "Date", "Name", "Email", "Address", "Items", "Total", "Status"];
    const rows = filtered.map((o) => [
      o.id,
      fmt(o.created_at),
      o.name,
      o.email,
      o.address,
      (o.items ?? []).map((i) => `${i.name} x${i.quantity}`).join(" | "),
      o.total.toFixed(2),
      o.status,
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by order ID, name, or email…"
          className="flex-1 min-w-48 px-4 py-2.5 rounded-xl text-sm border focus:outline-none"
          style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.12)", color: "#1D1D1F" }}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 rounded-xl text-sm border focus:outline-none"
          style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.12)", color: "#1D1D1F" }}
        >
          <option value="all">All statuses</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>{STATUS_CONFIG[s]?.label ?? s}</option>
          ))}
        </select>
        <button
          onClick={exportCSV}
          disabled={filtered.length === 0}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-opacity hover:opacity-70 disabled:opacity-30"
          style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.12)", color: "#1D1D1F" }}
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState label="No orders found" />
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => {
            const sc = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;
            const Icon = sc.icon;
            return (
              <div
                key={order.id}
                className="p-5 rounded-2xl"
                style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-bold" style={{ color: "#1D1D1F" }}>{order.id}</span>
                      <span
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{ background: sc.bg, color: sc.color }}
                      >
                        <Icon className="w-3 h-3" />
                        {sc.label}
                      </span>
                    </div>
                    <p className="text-sm mb-0.5" style={{ color: "#1D1D1F" }}>{order.name}</p>
                    <p className="text-xs mb-0.5" style={{ color: "#6E6E73" }}>{order.email}</p>
                    <p className="text-xs mb-3" style={{ color: "#9E9EA8" }}>{order.address}</p>
                    <div className="space-y-1">
                      {(order.items ?? []).map((item, j) => (
                        <div key={j} className="flex items-center gap-2 text-xs" style={{ color: "#6E6E73" }}>
                          <FlaskConical className="w-3 h-3 shrink-0" style={{ color: "#6B7A8D" }} />
                          {item.name}{item.concentration ? ` ${item.concentration}` : ""} ×{item.quantity}
                          <span className="ml-auto" style={{ color: "#1D1D1F" }}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3 shrink-0">
                    <div className="text-right">
                      <p className="font-bold text-xl" style={{ color: "#1B7A45" }}>${order.total.toFixed(2)}</p>
                      <p className="text-xs" style={{ color: "#9E9EA8" }}>{fmt(order.created_at)}</p>
                    </div>
                    <div className="relative">
                      <select
                        value={order.status}
                        onChange={(e) => onStatusChange(order.id, e.target.value)}
                        className="appearance-none pl-3 pr-7 py-1.5 rounded-lg text-xs font-medium border focus:outline-none"
                        style={{ background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.12)", color: "#1D1D1F" }}
                      >
                        {ORDER_STATUSES.map((s) => (
                          <option key={s} value={s}>{STATUS_CONFIG[s]?.label ?? s}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#6E6E73" }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── Newsletter Tab ─────────────────────────────────────── */
function NewsletterTab({ subscribers }: { subscribers: Subscriber[] }) {
  const [search, setSearch] = useState("");
  const filtered = subscribers.filter((s) => !search || s.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search emails…"
        className="w-full max-w-sm px-4 py-2.5 rounded-xl text-sm border focus:outline-none"
        style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.12)", color: "#1D1D1F" }}
      />
      <div className="rounded-2xl overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}>
        {filtered.length === 0 ? (
          <EmptyState label="No subscribers found" />
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "#6E6E73" }}>Email</th>
                <th className="text-right px-5 py-3 text-xs font-semibold" style={{ color: "#6E6E73" }}>Subscribed</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr
                  key={s.email}
                  style={{ borderBottom: i < filtered.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}
                >
                  <td className="px-5 py-3 text-sm" style={{ color: "#1D1D1F" }}>{s.email}</td>
                  <td className="px-5 py-3 text-xs text-right" style={{ color: "#9E9EA8" }}>{fmt(s.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* ─── Affiliates Tab ─────────────────────────────────────── */
const AFFILIATE_STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  pending:  { label: "Pending",  color: "#9A6400", bg: "rgba(234,179,8,0.08)" },
  approved: { label: "Approved", color: "#1B7A45", bg: "rgba(27,122,69,0.08)" },
  rejected: { label: "Rejected", color: "#C0392B", bg: "rgba(192,57,43,0.08)" },
};

function AffiliatesTab({
  affiliates,
  onStatusChange,
}: {
  affiliates: Affiliate[];
  onStatusChange: (id: string, status: "approved" | "rejected") => void;
}) {
  const [loading, setLoading] = useState<string | null>(null);

  async function handle(id: string, status: "approved" | "rejected") {
    setLoading(`${id}-${status}`);
    await onStatusChange(id, status);
    setLoading(null);
  }

  if (affiliates.length === 0) return <EmptyState label="No affiliate applications yet" />;

  return (
    <div className="space-y-3">
      {affiliates.map((a) => {
        const sc = AFFILIATE_STATUS_CONFIG[a.status ?? "pending"];
        return (
          <div
            key={a.id ?? a.email}
            className="p-5 rounded-2xl"
            style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p className="font-bold text-sm" style={{ color: "#1D1D1F" }}>{a.name}</p>
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{ background: sc.bg, color: sc.color }}
                  >
                    {sc.label}
                  </span>
                </div>
                <p className="text-xs" style={{ color: "#6E6E73" }}>{a.email}</p>
                {a.website && (
                  <p className="text-xs mt-0.5" style={{ color: "#6B7A8D" }}>{a.website}</p>
                )}
                {a.audience && (
                  <p className="text-xs mt-0.5" style={{ color: "#6E6E73" }}>Audience: {a.audience}</p>
                )}
                {a.message && (
                  <p className="text-xs mt-2 max-w-lg leading-relaxed" style={{ color: "#6E6E73" }}>{a.message}</p>
                )}
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <p className="text-xs" style={{ color: "#9E9EA8" }}>{fmt(a.created_at)}</p>
                {a.status !== "approved" && a.status !== "rejected" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handle(a.id, "approved")}
                      disabled={!!loading}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-75 disabled:opacity-40"
                      style={{ background: "rgba(27,122,69,0.10)", color: "#1B7A45" }}
                    >
                      <Check className="w-3 h-3" />
                      {loading === `${a.id}-approved` ? "…" : "Approve"}
                    </button>
                    <button
                      onClick={() => handle(a.id, "rejected")}
                      disabled={!!loading}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-75 disabled:opacity-40"
                      style={{ background: "rgba(192,57,43,0.08)", color: "#C0392B" }}
                    >
                      <X className="w-3 h-3" />
                      {loading === `${a.id}-rejected` ? "…" : "Reject"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Waitlist Tab ─────────────────────────────────────────── */
function WaitlistTab({ entries }: { entries: WaitlistEntry[] }) {
  const [sending, setSending] = useState<string | null>(null);
  const [sent, setSent] = useState<Record<string, number>>({});

  if (entries.length === 0) return <EmptyState label="No waitlist entries yet" />;

  const byProduct = entries.reduce<Record<string, WaitlistEntry[]>>((acc, e) => {
    (acc[e.product_name] ??= []).push(e);
    return acc;
  }, {});

  async function notifyProduct(product: string) {
    setSending(product);
    try {
      const res = await fetch("/api/admin/waitlist/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_name: product }),
      });
      const data = await res.json();
      setSent((prev) => ({ ...prev, [product]: data.sent ?? 0 }));
    } finally {
      setSending(null);
    }
  }

  return (
    <div className="space-y-4">
      {Object.entries(byProduct).map(([product, list]) => (
        <div
          key={product}
          className="rounded-2xl overflow-hidden"
          style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
        >
          <div
            className="px-5 py-3 flex items-center justify-between gap-3"
            style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
          >
            <p className="font-bold text-sm" style={{ color: "#1D1D1F" }}>{product}</p>
            <div className="flex items-center gap-3">
              <span
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                style={{ background: "rgba(10,132,255,0.08)", color: "#0A84FF" }}
              >
                {list.length} waiting
              </span>
              {sent[product] != null ? (
                <span
                  className="flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: "rgba(27,122,69,0.10)", color: "#1B7A45" }}
                >
                  <Check className="w-3 h-3" />
                  {sent[product]} notified
                </span>
              ) : (
                <button
                  onClick={() => notifyProduct(product)}
                  disabled={sending === product}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-opacity hover:opacity-75 disabled:opacity-40"
                  style={{ background: "rgba(10,132,255,0.10)", color: "#0A84FF" }}
                >
                  <Bell className="w-3 h-3" />
                  {sending === product ? "Sending…" : "Notify all"}
                </button>
              )}
            </div>
          </div>
          <div className="divide-y" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
            {list.map((e) => (
              <div key={e.email} className="px-5 py-2.5 flex items-center justify-between">
                <span className="text-sm" style={{ color: "#1D1D1F" }}>{e.email}</span>
                <span className="text-xs" style={{ color: "#9E9EA8" }}>{fmt(e.created_at)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div
      className="py-16 text-center rounded-2xl"
      style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
    >
      <BarChart2 className="w-8 h-8 mx-auto mb-3" style={{ color: "#D1D1D6" }} />
      <p className="text-sm" style={{ color: "#9E9EA8" }}>{label}</p>
    </div>
  );
}
