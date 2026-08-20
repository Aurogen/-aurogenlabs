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
  Tag,
  Plus,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import ProductsTab from "@/components/admin/ProductsTab";

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
  tracking_number?: string;
  tracking_url?: string;
  shipped_at?: string;
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
  const [tab, setTab] = useState<"orders" | "newsletter" | "affiliates" | "waitlist" | "products" | "discounts">("orders");
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

  async function saveOrderTracking(id: string, tracking_number: string, tracking_url: string) {
    await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: "shipped", tracking_number, tracking_url }),
    });
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "shipped", tracking_number, tracking_url } : o))
    );
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
          {(["orders", "newsletter", "affiliates", "waitlist", "products", "discounts"] as const).map((t) => (
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
                : t === "waitlist"
                ? `Waitlist (${waitlist.length})`
                : t === "products"
                ? "Products"
                : "Discounts"}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {tab === "orders" && (
          <OrdersTab orders={orders} onStatusChange={updateOrderStatus} onSaveTracking={saveOrderTracking} />
        )}
        {tab === "newsletter" && <NewsletterTab subscribers={subscribers} />}
        {tab === "affiliates" && <AffiliatesTab affiliates={affiliates} onStatusChange={updateAffiliateStatus} />}
        {tab === "waitlist" && <WaitlistTab entries={waitlist} />}
        {tab === "products" && <ProductsTab />}
        {tab === "discounts" && <DiscountCodesTab />}
      </div>
    </div>
  );
}

/* ─── Orders Tab ─────────────────────────────────────────── */
function TrackingForm({
  order,
  onSave,
}: {
  order: Order;
  onSave: (id: string, tracking_number: string, tracking_url: string) => Promise<void>;
}) {
  const [num, setNum] = useState(order.tracking_number ?? "");
  const [url, setUrl] = useState(order.tracking_url ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    if (!num.trim()) return;
    setSaving(true);
    await onSave(order.id, num.trim(), url.trim());
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div
      className="mt-3 p-3 rounded-xl flex flex-wrap gap-2 items-end"
      style={{ background: "rgba(10,132,255,0.04)", border: "1px solid rgba(10,132,255,0.15)" }}
    >
      <div className="flex-1 min-w-36">
        <p className="text-xs mb-1 font-medium" style={{ color: "#6E6E73" }}>Tracking #</p>
        <input
          value={num}
          onChange={(e) => setNum(e.target.value)}
          placeholder="1Z999AA10123456784"
          className="w-full px-3 py-1.5 rounded-lg text-xs border focus:outline-none"
          style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.12)", color: "#1D1D1F" }}
        />
      </div>
      <div className="flex-1 min-w-36">
        <p className="text-xs mb-1 font-medium" style={{ color: "#6E6E73" }}>Tracking URL (optional)</p>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.ups.com/track?..."
          className="w-full px-3 py-1.5 rounded-lg text-xs border focus:outline-none"
          style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.12)", color: "#1D1D1F" }}
        />
      </div>
      <button
        onClick={handleSave}
        disabled={saving || !num.trim()}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-75 disabled:opacity-40"
        style={{ background: saved ? "rgba(27,122,69,0.10)" : "#1D1D1F", color: saved ? "#1B7A45" : "#FFFFFF" }}
      >
        {saving ? "Saving…" : saved ? <><Check className="w-3 h-3" /> Saved</> : "Save & notify"}
      </button>
    </div>
  );
}

function OrdersTab({
  orders,
  onStatusChange,
  onSaveTracking,
}: {
  orders: Order[];
  onStatusChange: (id: string, status: string) => void;
  onSaveTracking: (id: string, tracking_number: string, tracking_url: string) => Promise<void>;
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
                {order.status === "shipped" && (
                  <TrackingForm order={order} onSave={onSaveTracking} />
                )}
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

/* ─── Discount Codes Tab ─────────────────────────────────── */
interface DiscountCode {
  id: number;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  min_order: number;
  max_uses: number | null;
  used_count: number;
  expires_at: string | null;
  active: boolean;
  created_at: string;
}

const EMPTY_FORM: { code: string; type: "percentage" | "fixed"; value: string; min_order: string; max_uses: string; expires_at: string } = { code: "", type: "percentage", value: "", min_order: "", max_uses: "", expires_at: "" };

function DiscountCodesTab() {
  const [codes, setCodes] = useState<DiscountCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [toggling, setToggling] = useState<number | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/discount-codes");
    const data = await res.json();
    setCodes(data.codes ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.code || !form.value) return;
    setSaving(true);
    await fetch("/api/admin/discount-codes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: form.code,
        type: form.type,
        value: parseFloat(form.value),
        min_order: form.min_order ? parseFloat(form.min_order) : 0,
        max_uses: form.max_uses ? parseInt(form.max_uses) : null,
        expires_at: form.expires_at || null,
      }),
    });
    setSaving(false);
    setForm(EMPTY_FORM);
    setShowForm(false);
    load();
  }

  async function toggleActive(id: number, active: boolean) {
    setToggling(id);
    await fetch(`/api/admin/discount-codes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !active }),
    });
    setCodes((prev) => prev.map((c) => (c.id === id ? { ...c, active: !active } : c)));
    setToggling(null);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this discount code?")) return;
    setDeleting(id);
    await fetch(`/api/admin/discount-codes/${id}`, { method: "DELETE" });
    setCodes((prev) => prev.filter((c) => c.id !== id));
    setDeleting(null);
  }

  if (loading) return <EmptyState label="Loading…" />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium" style={{ color: "#6E6E73" }}>{codes.length} discount code{codes.length !== 1 ? "s" : ""}</p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-opacity hover:opacity-75"
          style={{ background: "#1D1D1F", color: "#FFFFFF" }}
        >
          <Plus className="w-4 h-4" />
          New code
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="p-5 rounded-2xl space-y-4"
          style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
        >
          <p className="font-semibold text-sm" style={{ color: "#1D1D1F" }}>Create discount code</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs mb-1 font-medium" style={{ color: "#6E6E73" }}>Code</label>
              <input
                required
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                placeholder="SUMMER20"
                className="w-full px-3 py-2 rounded-xl text-sm border focus:outline-none font-mono"
                style={{ background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.12)", color: "#1D1D1F" }}
              />
            </div>
            <div>
              <label className="block text-xs mb-1 font-medium" style={{ color: "#6E6E73" }}>Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as "percentage" | "fixed" })}
                className="w-full px-3 py-2 rounded-xl text-sm border focus:outline-none"
                style={{ background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.12)", color: "#1D1D1F" }}
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed ($)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1 font-medium" style={{ color: "#6E6E73" }}>
                {form.type === "percentage" ? "Discount %" : "Discount $"}
              </label>
              <input
                required
                type="number"
                min="0"
                max={form.type === "percentage" ? "100" : undefined}
                step="0.01"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
                placeholder={form.type === "percentage" ? "20" : "15.00"}
                className="w-full px-3 py-2 rounded-xl text-sm border focus:outline-none"
                style={{ background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.12)", color: "#1D1D1F" }}
              />
            </div>
            <div>
              <label className="block text-xs mb-1 font-medium" style={{ color: "#6E6E73" }}>Min order ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.min_order}
                onChange={(e) => setForm({ ...form, min_order: e.target.value })}
                placeholder="0"
                className="w-full px-3 py-2 rounded-xl text-sm border focus:outline-none"
                style={{ background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.12)", color: "#1D1D1F" }}
              />
            </div>
            <div>
              <label className="block text-xs mb-1 font-medium" style={{ color: "#6E6E73" }}>Max uses (leave blank = unlimited)</label>
              <input
                type="number"
                min="1"
                value={form.max_uses}
                onChange={(e) => setForm({ ...form, max_uses: e.target.value })}
                placeholder="∞"
                className="w-full px-3 py-2 rounded-xl text-sm border focus:outline-none"
                style={{ background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.12)", color: "#1D1D1F" }}
              />
            </div>
            <div>
              <label className="block text-xs mb-1 font-medium" style={{ color: "#6E6E73" }}>Expires (leave blank = never)</label>
              <input
                type="date"
                value={form.expires_at}
                onChange={(e) => setForm({ ...form, expires_at: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm border focus:outline-none"
                style={{ background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.12)", color: "#1D1D1F" }}
              />
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-xl text-sm font-semibold transition-opacity hover:opacity-75 disabled:opacity-40"
              style={{ background: "#1D1D1F", color: "#FFFFFF" }}
            >
              {saving ? "Creating…" : "Create code"}
            </button>
            <button
              type="button"
              onClick={() => { setShowForm(false); setForm(EMPTY_FORM); }}
              className="px-5 py-2 rounded-xl text-sm font-medium transition-opacity hover:opacity-75"
              style={{ background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.10)", color: "#6E6E73" }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {codes.length === 0 ? (
        <div
          className="py-16 text-center rounded-2xl"
          style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
        >
          <Tag className="w-8 h-8 mx-auto mb-3" style={{ color: "#D1D1D6" }} />
          <p className="text-sm" style={{ color: "#9E9EA8" }}>No discount codes yet</p>
        </div>
      ) : (
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
        >
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                {["Code", "Discount", "Min order", "Uses", "Expires", "Status", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "#6E6E73" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {codes.map((c, i) => (
                <tr
                  key={c.id}
                  style={{
                    borderBottom: i < codes.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
                    opacity: c.active ? 1 : 0.5,
                  }}
                >
                  <td className="px-4 py-3">
                    <span className="font-mono font-bold text-sm" style={{ color: "#1D1D1F" }}>{c.code}</span>
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: "#1B7A45" }}>
                    {c.type === "percentage" ? `${c.value}%` : `$${c.value.toFixed(2)}`}
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: "#6E6E73" }}>
                    {c.min_order > 0 ? `$${c.min_order.toFixed(2)}` : "—"}
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: "#6E6E73" }}>
                    {c.used_count}{c.max_uses ? ` / ${c.max_uses}` : ""}
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#9E9EA8" }}>
                    {c.expires_at ? fmt(c.expires_at) : "Never"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{
                        background: c.active ? "rgba(27,122,69,0.08)" : "rgba(0,0,0,0.06)",
                        color: c.active ? "#1B7A45" : "#9E9EA8",
                      }}
                    >
                      {c.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      <button
                        onClick={() => toggleActive(c.id, c.active)}
                        disabled={toggling === c.id}
                        className="p-1.5 rounded-lg transition-opacity hover:opacity-75 disabled:opacity-40"
                        title={c.active ? "Deactivate" : "Activate"}
                        style={{ color: c.active ? "#9A6400" : "#1B7A45" }}
                      >
                        {c.active
                          ? <ToggleRight className="w-4 h-4" />
                          : <ToggleLeft className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        disabled={deleting === c.id}
                        className="p-1.5 rounded-lg transition-opacity hover:opacity-75 disabled:opacity-40"
                        title="Delete"
                        style={{ color: "#C0392B" }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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
