"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Plus, X, Check, Copy, Loader2, ChevronDown, ChevronUp, Pencil, Power, Wallet, Ban, RotateCcw, Users,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────── */
interface AffiliateStats {
  clicks: number;
  clicks30: number;
  orders: number;
  conversionRate: number;
  sales: number;
  pending: number;
  approved: number;
  paid: number;
}
interface AffiliateRow {
  id: string;
  name: string;
  email: string;
  code: string;
  coupon_code: string | null;
  commission_rate: number;
  customer_discount_pct: number;
  active: boolean;
  payout_method: string | null;
  payout_details: string | null;
  notes: string | null;
  created_at: string;
  link: string;
  stats: AffiliateStats;
}
interface Application {
  id: string;
  name: string;
  email: string;
  website?: string;
  audience?: string;
  message?: string;
  created_at?: string;
  status?: "pending" | "approved" | "rejected";
  code?: string | null;
}
interface ReferredOrder {
  id: string;
  created_at: string;
  name: string;
  email: string;
  total: number;
  status: string;
  payment_status: string;
  commission_amount: number | null;
  commission_status: string | null;
  attribution_source: string | null;
}
interface Payout {
  id: string;
  amount: number;
  order_count: number;
  method: string | null;
  reference: string | null;
  created_at: string;
}

/* ─── Helpers ───────────────────────────────────────────── */
const money = (n: number) => `$${n.toFixed(2)}`;
const fmt = (d?: string) =>
  d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

const CARD = { background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" };
const INPUT =
  "w-full px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0A84FF]/30";
const INPUT_STYLE = { background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.10)", color: "#1D1D1F" };

const COMMISSION_BADGE: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "Pending", color: "#9A6400", bg: "rgba(234,179,8,0.10)" },
  approved: { label: "Approved", color: "#0A84FF", bg: "rgba(10,132,255,0.08)" },
  paid: { label: "Paid", color: "#1B7A45", bg: "rgba(27,122,69,0.08)" },
  void: { label: "Void", color: "#C0392B", bg: "rgba(192,57,43,0.08)" },
};

const APP_BADGE: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "Pending", color: "#9A6400", bg: "rgba(234,179,8,0.08)" },
  approved: { label: "Approved", color: "#1B7A45", bg: "rgba(27,122,69,0.08)" },
  rejected: { label: "Rejected", color: "#C0392B", bg: "rgba(192,57,43,0.08)" },
};

function Badge({ cfg }: { cfg: { label: string; color: string; bg: string } }) {
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap" style={{ background: cfg.bg, color: cfg.color }}>
      {cfg.label}
    </span>
  );
}

function CopyButton({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {}
      }}
      className="inline-flex items-center gap-1 text-xs font-medium hover:opacity-70"
      style={{ color: "#0A84FF" }}
      title={value}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied" : label ?? "Copy"}
    </button>
  );
}

async function api(url: string, method: string, body?: unknown) {
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error ?? `Request failed (${res.status})`);
  return json;
}

/* ─── Main tab ──────────────────────────────────────────── */
export default function AffiliatesTab() {
  const [affiliates, setAffiliates] = useState<AffiliateRow[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"partners" | "applications">("partners");
  const [adding, setAdding] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const load = useCallback(
    () =>
      api("/api/admin/affiliates", "GET")
        .then((data) => {
          setAffiliates(data.affiliates ?? []);
          setApplications(data.applications ?? []);
        })
        .catch((e) => console.error(e))
        .finally(() => setLoading(false)),
    []
  );

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#6E6E73" }} />
      </div>
    );
  }

  const totals = affiliates.reduce(
    (t, a) => ({
      clicks: t.clicks + a.stats.clicks,
      orders: t.orders + a.stats.orders,
      sales: t.sales + a.stats.sales,
      owed: t.owed + a.stats.pending + a.stats.approved,
      paid: t.paid + a.stats.paid,
    }),
    { clicks: 0, orders: 0, sales: 0, owed: 0, paid: 0 }
  );
  const pendingApps = applications.filter((a) => (a.status ?? "pending") === "pending").length;
  const q = search.trim().toLowerCase();
  const filtered = q
    ? affiliates.filter((a) =>
        [a.name, a.email, a.code, a.coupon_code ?? ""].some((v) => v.toLowerCase().includes(q))
      )
    : affiliates;

  return (
    <div className="space-y-5">
      {/* Program totals */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: "Active partners", value: affiliates.filter((a) => a.active).length.toString() },
          { label: "Link clicks", value: totals.clicks.toLocaleString() },
          { label: "Referred orders", value: totals.orders.toString() },
          { label: "Referred sales", value: money(totals.sales) },
          { label: "Commission owed", value: money(totals.owed), sub: `${money(totals.paid)} paid` },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-xl text-center" style={CARD}>
            <p className="font-bold text-lg leading-none" style={{ color: "#1D1D1F" }}>{s.value}</p>
            <p className="text-xs mt-1" style={{ color: "#6E6E73" }}>{s.label}</p>
            {s.sub && <p className="text-[11px] mt-0.5" style={{ color: "#9E9EA8" }}>{s.sub}</p>}
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex rounded-xl p-1" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}>
          {(["partners", "applications"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className="px-4 py-1.5 rounded-lg text-sm font-medium"
              style={view === v ? { background: "#1D1D1F", color: "#FFFFFF" } : { color: "#6E6E73" }}
            >
              {v === "partners" ? `Partners (${affiliates.length})` : `Applications${pendingApps ? ` (${pendingApps} new)` : ""}`}
            </button>
          ))}
        </div>
        {view === "partners" && (
          <>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, code…"
              className="px-3 py-2 rounded-xl text-sm outline-none flex-1 min-w-[180px] max-w-xs"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.10)" }}
            />
            <button
              onClick={() => setAdding((v) => !v)}
              className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90"
              style={{ background: "#0A84FF", color: "#FFFFFF" }}
            >
              {adding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {adding ? "Cancel" : "Add influencer"}
            </button>
          </>
        )}
      </div>

      {view === "partners" && adding && (
        <NewAffiliateForm
          onCreated={async () => {
            setAdding(false);
            await load();
          }}
        />
      )}

      {view === "partners" ? (
        filtered.length === 0 ? (
          <div className="py-14 text-center rounded-2xl" style={CARD}>
            <Users className="w-6 h-6 mx-auto mb-2" style={{ color: "#9E9EA8" }} />
            <p className="text-sm" style={{ color: "#6E6E73" }}>
              {affiliates.length === 0 ? "No partners yet. Add an influencer or approve an application." : "No partners match your search."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((a) => (
              <AffiliateCard
                key={a.id}
                affiliate={a}
                open={openId === a.id}
                onToggle={() => setOpenId((cur) => (cur === a.id ? null : a.id))}
                onChanged={load}
              />
            ))}
          </div>
        )
      ) : (
        <ApplicationsList applications={applications} onChanged={load} />
      )}
    </div>
  );
}

/* ─── New affiliate form ────────────────────────────────── */
function NewAffiliateForm({ onCreated }: { onCreated: () => Promise<void> }) {
  const [form, setForm] = useState({
    name: "", email: "", code: "", coupon_code: "", commission_rate: "20", customer_discount_pct: "10", notes: "", send_email: true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const set = (k: keyof typeof form, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await api("/api/admin/affiliates", "POST", {
        ...form,
        commission_rate: Number(form.commission_rate),
        customer_discount_pct: Number(form.customer_discount_pct),
      });
      await onCreated();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="p-5 rounded-2xl space-y-4" style={CARD}>
      <div>
        <p className="font-bold text-sm" style={{ color: "#1D1D1F" }}>New influencer / affiliate</p>
        <p className="text-xs mt-0.5" style={{ color: "#6E6E73" }}>
          Leave link and coupon empty to generate them automatically. They sign in with this email to see their dashboard.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Name *">
          <input required value={form.name} onChange={(e) => set("name", e.target.value)} className={INPUT} style={INPUT_STYLE} />
        </Field>
        <Field label="Email *">
          <input required type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={INPUT} style={INPUT_STYLE} />
        </Field>
        <Field label="Link code (optional)" hint="aurogenlabs.com/r/<code>">
          <input value={form.code} onChange={(e) => set("code", e.target.value)} placeholder="e.g. maria" className={INPUT} style={INPUT_STYLE} />
        </Field>
        <Field label="Coupon code (optional)" hint="Customers type it at checkout">
          <input value={form.coupon_code} onChange={(e) => set("coupon_code", e.target.value.toUpperCase())} placeholder="e.g. MARIA10" className={INPUT} style={INPUT_STYLE} />
        </Field>
        <Field label="Commission %">
          <input type="number" min={0} max={100} step="0.5" value={form.commission_rate} onChange={(e) => set("commission_rate", e.target.value)} className={INPUT} style={INPUT_STYLE} />
        </Field>
        <Field label="Customer discount % (coupon)">
          <input type="number" min={0} max={100} step="0.5" value={form.customer_discount_pct} onChange={(e) => set("customer_discount_pct", e.target.value)} className={INPUT} style={INPUT_STYLE} />
        </Field>
      </div>
      <Field label="Internal notes">
        <input value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Instagram @handle, agreement, etc." className={INPUT} style={INPUT_STYLE} />
      </Field>
      <label className="flex items-center gap-2 text-sm" style={{ color: "#1D1D1F" }}>
        <input type="checkbox" checked={form.send_email} onChange={(e) => set("send_email", e.target.checked)} />
        Email them their link and coupon
      </label>
      {error && <p className="text-sm" style={{ color: "#C0392B" }}>{error}</p>}
      <button
        disabled={saving}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50"
        style={{ background: "#1D1D1F", color: "#FFFFFF" }}
      >
        {saving && <Loader2 className="w-4 h-4 animate-spin" />}
        Create affiliate
      </button>
    </form>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold mb-1" style={{ color: "#6E6E73" }}>{label}</span>
      {children}
      {hint && <span className="block text-[11px] mt-1" style={{ color: "#9E9EA8" }}>{hint}</span>}
    </label>
  );
}

/* ─── Affiliate card ────────────────────────────────────── */
function AffiliateCard({
  affiliate: a,
  open,
  onToggle,
  onChanged,
}: {
  affiliate: AffiliateRow;
  open: boolean;
  onToggle: () => void;
  onChanged: () => Promise<void>;
}) {
  const [busy, setBusy] = useState(false);

  async function toggleActive() {
    setBusy(true);
    try {
      await api(`/api/admin/affiliate-codes/${a.id}`, "PATCH", { active: !a.active });
      await onChanged();
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl overflow-hidden" style={{ ...CARD, opacity: a.active ? 1 : 0.7 }}>
      <div className="p-5 flex flex-wrap items-start gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <p className="font-bold text-sm" style={{ color: "#1D1D1F" }}>{a.name}</p>
            <Badge cfg={a.active ? { label: "Active", color: "#1B7A45", bg: "rgba(27,122,69,0.08)" } : { label: "Paused", color: "#6E6E73", bg: "rgba(110,110,115,0.10)" }} />
            <span className="text-xs" style={{ color: "#9E9EA8" }}>
              {a.commission_rate}% commission · {a.customer_discount_pct}% customer discount
            </span>
          </div>
          <p className="text-xs" style={{ color: "#6E6E73" }}>{a.email}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(10,132,255,0.06)", color: "#1D1D1F" }}>
              /r/{a.code}
            </span>
            <CopyButton value={a.link} label="Copy link" />
            {a.coupon_code && (
              <>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded" style={{ background: "rgba(27,122,69,0.08)", color: "#1B7A45" }}>
                  {a.coupon_code}
                </span>
                <CopyButton value={a.coupon_code} label="Copy coupon" />
              </>
            )}
          </div>
          {a.notes && <p className="text-xs mt-2" style={{ color: "#6E6E73" }}>{a.notes}</p>}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-x-5 gap-y-2 text-center">
          {[
            { label: "Clicks", value: a.stats.clicks.toLocaleString(), sub: `${a.stats.clicks30} / 30d` },
            { label: "Orders", value: a.stats.orders.toString(), sub: `${a.stats.conversionRate}% conv.` },
            { label: "Sales", value: money(a.stats.sales) },
            { label: "Pending", value: money(a.stats.pending) },
            { label: "Approved", value: money(a.stats.approved) },
            { label: "Paid", value: money(a.stats.paid) },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-bold text-sm" style={{ color: "#1D1D1F" }}>{s.value}</p>
              <p className="text-[11px]" style={{ color: "#6E6E73" }}>{s.label}</p>
              {s.sub && <p className="text-[10px]" style={{ color: "#9E9EA8" }}>{s.sub}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 py-2.5 flex flex-wrap items-center gap-3" style={{ borderTop: "1px solid rgba(0,0,0,0.06)", background: "#FAFAFB" }}>
        <button onClick={onToggle} className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#1D1D1F" }}>
          {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {open ? "Hide details" : "Orders, payouts & settings"}
        </button>
        <button
          onClick={toggleActive}
          disabled={busy}
          className="ml-auto flex items-center gap-1 text-xs font-semibold disabled:opacity-40"
          style={{ color: a.active ? "#C0392B" : "#1B7A45" }}
        >
          <Power className="w-3.5 h-3.5" />
          {a.active ? "Pause" : "Reactivate"}
        </button>
      </div>

      {open && <AffiliateDetail affiliate={a} onChanged={onChanged} />}
    </div>
  );
}

/* ─── Detail: settings, commissions, payouts ────────────── */
function AffiliateDetail({ affiliate: a, onChanged }: { affiliate: AffiliateRow; onChanged: () => Promise<void> }) {
  const [orders, setOrders] = useState<ReferredOrder[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [payRef, setPayRef] = useState("");

  const loadDetail = useCallback(
    () =>
      api(`/api/admin/affiliate-codes/${a.id}`, "GET")
        .then((data) => {
          setOrders(data.orders ?? []);
          setPayouts(data.payouts ?? []);
        })
        .catch((e) => console.error(e))
        .finally(() => setLoading(false)),
    [a.id]
  );

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);

  async function run(key: string, fn: () => Promise<unknown>) {
    setBusy(key);
    try {
      await fn();
      setSelected(new Set());
      await Promise.all([loadDetail(), onChanged()]);
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setBusy(null);
    }
  }

  const commission = (action: "approve" | "void" | "reset", all = false) =>
    run(action, () =>
      api(`/api/admin/affiliate-codes/${a.id}/commissions`, "POST", {
        action,
        orderIds: all ? undefined : Array.from(selected),
      })
    );

  const toggle = (id: string) =>
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="p-5 space-y-6" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      {/* Settings */}
      {editing ? (
        <EditAffiliateForm affiliate={a} onDone={async (changed) => { setEditing(false); if (changed) await onChanged(); }} />
      ) : (
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="text-xs space-y-1" style={{ color: "#6E6E73" }}>
            <p>
              <span className="font-semibold" style={{ color: "#1D1D1F" }}>Payout:</span>{" "}
              {a.payout_method ? `${a.payout_method} — ${a.payout_details ?? ""}` : "Not provided by the affiliate yet"}
            </p>
            <p>
              <span className="font-semibold" style={{ color: "#1D1D1F" }}>Link:</span> {a.link}
            </p>
            <p>
              <span className="font-semibold" style={{ color: "#1D1D1F" }}>Since:</span> {fmt(a.created_at)}
            </p>
          </div>
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.10)", color: "#1D1D1F" }}
          >
            <Pencil className="w-3 h-3" /> Edit rates & coupon
          </button>
        </div>
      )}

      {/* Commissions */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <p className="font-bold text-sm mr-auto" style={{ color: "#1D1D1F" }}>Referred orders</p>
          {selected.size > 0 ? (
            <>
              <span className="text-xs" style={{ color: "#6E6E73" }}>{selected.size} selected</span>
              <ActionButton onClick={() => commission("approve")} busy={busy === "approve"} icon={Check} color="#0A84FF">Approve</ActionButton>
              <ActionButton onClick={() => commission("void")} busy={busy === "void"} icon={Ban} color="#C0392B">Void</ActionButton>
              <ActionButton onClick={() => commission("reset")} busy={busy === "reset"} icon={RotateCcw} color="#6E6E73">Back to pending</ActionButton>
            </>
          ) : (
            a.stats.pending > 0 && (
              <ActionButton onClick={() => commission("approve", true)} busy={busy === "approve"} icon={Check} color="#0A84FF">
                Approve all pending ({money(a.stats.pending)})
              </ActionButton>
            )
          )}
        </div>

        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin mx-auto" style={{ color: "#6E6E73" }} />
        ) : orders.length === 0 ? (
          <p className="text-xs py-4 text-center rounded-xl" style={{ background: "#F6F6F8", color: "#6E6E73" }}>
            No referred orders yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
            <table className="w-full text-xs">
              <thead>
                <tr style={{ background: "#F6F6F8", color: "#6E6E73" }}>
                  <th className="p-2.5 w-8" />
                  <th className="p-2.5 text-left font-semibold">Order</th>
                  <th className="p-2.5 text-left font-semibold">Customer</th>
                  <th className="p-2.5 text-left font-semibold">Via</th>
                  <th className="p-2.5 text-left font-semibold">Order status</th>
                  <th className="p-2.5 text-right font-semibold">Total</th>
                  <th className="p-2.5 text-right font-semibold">Commission</th>
                  <th className="p-2.5 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => {
                  const cs = o.commission_status ?? "pending";
                  return (
                    <tr key={o.id} style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                      <td className="p-2.5 text-center">
                        {cs !== "paid" && (
                          <input type="checkbox" checked={selected.has(o.id)} onChange={() => toggle(o.id)} aria-label={`Select ${o.id}`} />
                        )}
                      </td>
                      <td className="p-2.5">
                        <p className="font-mono font-semibold" style={{ color: "#1D1D1F" }}>{o.id}</p>
                        <p style={{ color: "#9E9EA8" }}>{fmt(o.created_at)}</p>
                      </td>
                      <td className="p-2.5">
                        <p style={{ color: "#1D1D1F" }}>{o.name}</p>
                        <p style={{ color: "#9E9EA8" }}>{o.email}</p>
                      </td>
                      <td className="p-2.5 capitalize" style={{ color: "#6E6E73" }}>{o.attribution_source ?? "link"}</td>
                      <td className="p-2.5" style={{ color: "#6E6E73" }}>
                        {o.status.replace(/_/g, " ")}
                        {o.payment_status !== "paid" && <span className="block text-[10px]" style={{ color: "#9A6400" }}>payment {o.payment_status}</span>}
                      </td>
                      <td className="p-2.5 text-right" style={{ color: "#1D1D1F" }}>{money(Number(o.total))}</td>
                      <td className="p-2.5 text-right font-semibold" style={{ color: "#1D1D1F" }}>{money(Number(o.commission_amount ?? 0))}</td>
                      <td className="p-2.5"><Badge cfg={COMMISSION_BADGE[cs] ?? COMMISSION_BADGE.pending} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <p className="text-[11px] mt-2" style={{ color: "#9E9EA8" }}>
          Approve commissions once the order is paid and past the return window. Void them for cancelled or refunded orders.
        </p>
      </div>

      {/* Payouts */}
      <div>
        <p className="font-bold text-sm mb-3" style={{ color: "#1D1D1F" }}>Payouts</p>
        <div className="flex flex-wrap items-end gap-2 p-3 rounded-xl mb-3" style={{ background: "#F6F6F8" }}>
          <div className="flex-1 min-w-[200px]">
            <p className="text-xs mb-1" style={{ color: "#6E6E73" }}>
              Ready to pay: <span className="font-bold" style={{ color: "#1D1D1F" }}>{money(a.stats.approved)}</span>
              {a.payout_method && <> via {a.payout_method}</>}
            </p>
            <input
              value={payRef}
              onChange={(e) => setPayRef(e.target.value)}
              placeholder="Transaction reference (optional)"
              className={INPUT}
              style={{ ...INPUT_STYLE, background: "#FFFFFF" }}
            />
          </div>
          <ActionButton
            onClick={() =>
              run("pay", async () => {
                if (!confirm(`Mark ${money(a.stats.approved)} as paid to ${a.name}?`)) return;
                await api(`/api/admin/affiliate-codes/${a.id}/payouts`, "POST", { reference: payRef });
                setPayRef("");
              })
            }
            busy={busy === "pay"}
            disabled={a.stats.approved <= 0}
            icon={Wallet}
            color="#1B7A45"
          >
            Record payout
          </ActionButton>
        </div>
        {payouts.length > 0 && (
          <div className="space-y-1.5">
            {payouts.map((p) => (
              <div key={p.id} className="flex flex-wrap items-center gap-3 text-xs px-3 py-2 rounded-lg" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
                <span className="font-bold" style={{ color: "#1D1D1F" }}>{money(Number(p.amount))}</span>
                <span style={{ color: "#6E6E73" }}>{p.order_count} orders</span>
                {p.method && <span style={{ color: "#6E6E73" }}>{p.method}</span>}
                {p.reference && <span className="font-mono" style={{ color: "#9E9EA8" }}>{p.reference}</span>}
                <span className="ml-auto" style={{ color: "#9E9EA8" }}>{fmt(p.created_at)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ActionButton({
  onClick, busy, disabled, icon: Icon, color, children,
}: {
  onClick: () => void;
  busy?: boolean;
  disabled?: boolean;
  icon: React.ElementType;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={busy || disabled}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-80 disabled:opacity-40"
      style={{ background: `${color}14`, color }}
    >
      {busy ? <Loader2 className="w-3 h-3 animate-spin" /> : <Icon className="w-3 h-3" />}
      {children}
    </button>
  );
}

function EditAffiliateForm({ affiliate: a, onDone }: { affiliate: AffiliateRow; onDone: (changed: boolean) => Promise<void> }) {
  const [form, setForm] = useState({
    commission_rate: String(a.commission_rate),
    customer_discount_pct: String(a.customer_discount_pct),
    coupon_code: a.coupon_code ?? "",
    notes: a.notes ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function save() {
    setSaving(true);
    setError("");
    try {
      await api(`/api/admin/affiliate-codes/${a.id}`, "PATCH", {
        commission_rate: Number(form.commission_rate),
        customer_discount_pct: Number(form.customer_discount_pct),
        coupon_code: form.coupon_code,
        notes: form.notes,
      });
      await onDone(true);
    } catch (e) {
      setError((e as Error).message);
      setSaving(false);
    }
  }

  return (
    <div className="p-4 rounded-xl space-y-3" style={{ background: "#F6F6F8" }}>
      <div className="grid sm:grid-cols-3 gap-3">
        <Field label="Commission %" hint="Applies to new orders">
          <input type="number" min={0} max={100} step="0.5" value={form.commission_rate} onChange={(e) => setForm({ ...form, commission_rate: e.target.value })} className={INPUT} style={{ ...INPUT_STYLE, background: "#FFFFFF" }} />
        </Field>
        <Field label="Customer discount %">
          <input type="number" min={0} max={100} step="0.5" value={form.customer_discount_pct} onChange={(e) => setForm({ ...form, customer_discount_pct: e.target.value })} className={INPUT} style={{ ...INPUT_STYLE, background: "#FFFFFF" }} />
        </Field>
        <Field label="Coupon code" hint="Empty = no coupon">
          <input value={form.coupon_code} onChange={(e) => setForm({ ...form, coupon_code: e.target.value.toUpperCase() })} className={INPUT} style={{ ...INPUT_STYLE, background: "#FFFFFF" }} />
        </Field>
      </div>
      <Field label="Internal notes">
        <input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={INPUT} style={{ ...INPUT_STYLE, background: "#FFFFFF" }} />
      </Field>
      {error && <p className="text-xs" style={{ color: "#C0392B" }}>{error}</p>}
      <div className="flex gap-2">
        <button onClick={save} disabled={saving} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold disabled:opacity-50" style={{ background: "#1D1D1F", color: "#FFFFFF" }}>
          {saving && <Loader2 className="w-3 h-3 animate-spin" />} Save
        </button>
        <button onClick={() => onDone(false)} className="px-4 py-2 rounded-lg text-xs font-semibold" style={{ color: "#6E6E73" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}

/* ─── Applications ──────────────────────────────────────── */
function ApplicationsList({ applications, onChanged }: { applications: Application[]; onChanged: () => Promise<void> }) {
  const [loading, setLoading] = useState<string | null>(null);

  async function handle(id: string, status: "approved" | "rejected") {
    setLoading(`${id}-${status}`);
    try {
      await api(`/api/admin/affiliates/${id}`, "PATCH", { status });
      await onChanged();
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setLoading(null);
    }
  }

  if (applications.length === 0) {
    return (
      <p className="py-14 text-center text-sm rounded-2xl" style={{ ...CARD, color: "#6E6E73" }}>
        No affiliate applications yet
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {applications.map((a) => {
        const status = a.status ?? "pending";
        return (
          <div key={a.id} className="p-5 rounded-2xl" style={CARD}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p className="font-bold text-sm" style={{ color: "#1D1D1F" }}>{a.name}</p>
                  <Badge cfg={APP_BADGE[status]} />
                </div>
                <p className="text-xs" style={{ color: "#6E6E73" }}>{a.email}</p>
                {a.website && <p className="text-xs mt-0.5" style={{ color: "#6B7A8D" }}>{a.website}</p>}
                {a.audience && <p className="text-xs mt-0.5" style={{ color: "#6E6E73" }}>Audience: {a.audience}</p>}
                {a.message && <p className="text-xs mt-2 max-w-lg leading-relaxed" style={{ color: "#6E6E73" }}>{a.message}</p>}
                {status === "approved" && a.code && (
                  <p className="text-xs font-mono mt-2" style={{ color: "#1B7A45" }}>/r/{a.code}</p>
                )}
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <p className="text-xs" style={{ color: "#9E9EA8" }}>{fmt(a.created_at)}</p>
                {status === "pending" && (
                  <div className="flex gap-2">
                    <ActionButton onClick={() => handle(a.id, "approved")} busy={loading === `${a.id}-approved`} disabled={!!loading} icon={Check} color="#1B7A45">
                      Approve
                    </ActionButton>
                    <ActionButton onClick={() => handle(a.id, "rejected")} busy={loading === `${a.id}-rejected`} disabled={!!loading} icon={X} color="#C0392B">
                      Reject
                    </ActionButton>
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
