"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Plus, Pencil, Eye, EyeOff, FlaskConical, ChevronUp, X, Check,
  Upload, FileText, ExternalLink, Trash2, ImagePlus, Loader2, RefreshCw,
} from "lucide-react";
import type { DbProduct } from "@/lib/products-db";

const ALL_GOALS = ["Fat Loss", "Muscle Growth", "Recovery", "Anti-Aging", "Skin & Hair", "Brain Health", "Performance"];

const EMPTY_FORM = {
  name: "", slug: "", compound: "", concentration: "", size: "1 Vial",
  price: "", original_price: "", goals: [] as string[], description: "",
  long_description: "", in_stock: true, stock_count: "0", featured: false,
  purity: "", sequence: "", molecular_weight: "", storage: "", badge: "",
  image: "", coa_url: "", visible: true, sort_order: "0",
};

type FormState = typeof EMPTY_FORM;

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function ProductsTab() {
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [syncingId, setSyncingId] = useState<number | null>(null);
  const [syncError, setSyncError] = useState<string>("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      setProducts(data.products ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function openEdit(p: DbProduct) {
    setEditingId(p.id);
    setAddingNew(false);
    setConfirmDeleteId(null);
    setForm({
      name: p.name,
      slug: p.slug,
      compound: p.compound,
      concentration: p.concentration,
      size: p.size,
      price: String(p.price),
      original_price: p.original_price != null ? String(p.original_price) : "",
      goals: p.goals ?? [],
      description: p.description,
      long_description: p.long_description,
      in_stock: p.in_stock,
      stock_count: String(p.stock_count ?? 0),
      featured: p.featured,
      purity: p.purity,
      sequence: p.sequence ?? "",
      molecular_weight: p.molecular_weight ?? "",
      storage: p.storage,
      badge: p.badge ?? "",
      image: p.image ?? "",
      coa_url: p.coa_url ?? "",
      visible: p.visible,
      sort_order: String(p.sort_order ?? 0),
    });
  }

  function openAdd() {
    setAddingNew(true);
    setEditingId(null);
    setConfirmDeleteId(null);
    setForm(EMPTY_FORM);
  }

  function closeForm() {
    setEditingId(null);
    setAddingNew(false);
    setForm(EMPTY_FORM);
  }

  async function quickToggle(id: number, field: "in_stock" | "visible", value: boolean) {
    await fetch(`/api/admin/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    });
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, [field]: value } : p));
  }

  async function quickStockUpdate(id: number, stock: number) {
    await fetch(`/api/admin/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock_count: stock }),
    });
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, stock_count: stock } : p));
  }

  async function syncToWhop(id: number) {
    setSyncingId(id);
    setSyncError("");
    try {
      const res = await fetch(`/api/admin/whop-sync/${id}`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Sync failed");
      setProducts((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, whop_product_id: data.whop_product_id, whop_checkout_url: data.whop_checkout_url }
            : p
        )
      );
    } catch (err) {
      setSyncError(err instanceof Error ? err.message : "Sync failed");
    } finally {
      setSyncingId(null);
    }
  }

  async function deleteProduct(id: number) {
    setDeletingId(id);
    try {
      await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p.id !== id));
      if (editingId === id) closeForm();
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  }

  async function saveForm() {
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        original_price: form.original_price ? Number(form.original_price) : null,
        stock_count: Number(form.stock_count),
        sort_order: Number(form.sort_order),
        sequence: form.sequence || null,
        molecular_weight: form.molecular_weight || null,
        badge: form.badge || null,
        image: form.image || null,
        coa_url: form.coa_url || null,
      };

      if (addingNew) {
        const res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) { await load(); closeForm(); }
      } else if (editingId) {
        const res = await fetch(`/api/admin/products/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) { await load(); closeForm(); }
      }
    } finally {
      setSaving(false);
    }
  }

  const filtered = products.filter((p) =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.slug.includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-gray-200 border-t-gray-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products…"
          className="flex-1 min-w-48 max-w-sm px-4 py-2.5 rounded-xl text-sm border focus:outline-none"
          style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.12)", color: "#1D1D1F" }}
        />
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-85"
          style={{ background: "#0A84FF" }}
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {syncError && (
        <div className="px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(192,57,43,0.08)", color: "#C0392B", border: "1px solid rgba(192,57,43,0.20)" }}>
          Whop sync error: {syncError}
          <button onClick={() => setSyncError("")} className="ml-3 underline text-xs">Dismiss</button>
        </div>
      )}

      {/* Add new form */}
      {addingNew && (
        <ProductForm
          form={form}
          setForm={setForm}
          onSave={saveForm}
          onCancel={closeForm}
          saving={saving}
          title="New Product"
        />
      )}

      {/* Products list */}
      {filtered.length === 0 && !addingNew ? (
        <div className="py-16 text-center rounded-2xl" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}>
          <FlaskConical className="w-8 h-8 mx-auto mb-3" style={{ color: "#D1D1D6" }} />
          <p className="text-sm" style={{ color: "#9E9EA8" }}>No products found</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((p) => (
            <div key={p.id}>
              <div
                className="p-4 rounded-2xl"
                style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
              >
                <div className="flex flex-wrap items-center gap-3 justify-between">
                  {/* Thumbnail + info */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* Image thumbnail */}
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                        style={{ border: "1px solid rgba(0,0,0,0.08)" }}
                      />
                    ) : (
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)" }}
                      >
                        <FlaskConical className="w-4 h-4" style={{ color: "#D1D1D6" }} />
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <span className="font-bold text-sm" style={{ color: "#1D1D1F" }}>{p.name}</span>
                        {p.concentration && (
                          <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(10,132,255,0.08)", color: "#0A84FF" }}>
                            {p.concentration}
                          </span>
                        )}
                        {p.badge && (
                          <span className="text-xs px-1.5 py-0.5 rounded font-semibold" style={{ background: "rgba(107,122,141,0.10)", color: "#6B7A8D" }}>
                            {p.badge}
                          </span>
                        )}
                        {!p.visible && (
                          <span className="text-xs px-1.5 py-0.5 rounded font-semibold" style={{ background: "rgba(192,57,43,0.08)", color: "#C0392B" }}>
                            Hidden
                          </span>
                        )}
                      </div>
                      <p className="text-xs" style={{ color: "#9E9EA8" }}>{p.slug}</p>
                    </div>
                  </div>

                  {/* Right controls */}
                  <div className="flex items-center gap-2 shrink-0 flex-wrap">
                    {/* Price */}
                    <div className="text-right mr-1">
                      <p className="font-bold text-sm" style={{ color: "#1B7A45" }}>${Number(p.price).toFixed(2)}</p>
                      {p.original_price && (
                        <p className="text-xs line-through" style={{ color: "#9E9EA8" }}>${Number(p.original_price).toFixed(2)}</p>
                      )}
                    </div>

                    {/* Stock count inline editor */}
                    <StockEditor
                      value={p.stock_count}
                      onChange={(v) => quickStockUpdate(p.id, v)}
                    />

                    {/* In stock toggle */}
                    <button
                      onClick={() => quickToggle(p.id, "in_stock", !p.in_stock)}
                      className="text-xs px-2.5 py-1 rounded-full font-semibold transition-opacity hover:opacity-70"
                      style={{
                        background: p.in_stock ? "rgba(27,122,69,0.10)" : "rgba(192,57,43,0.08)",
                        color: p.in_stock ? "#1B7A45" : "#C0392B",
                      }}
                    >
                      {p.in_stock ? "In Stock" : "Out"}
                    </button>

                    {/* Visible toggle */}
                    <button
                      onClick={() => quickToggle(p.id, "visible", !p.visible)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg transition-opacity hover:opacity-70"
                      style={{ background: "rgba(0,0,0,0.05)", color: p.visible ? "#1B7A45" : "#9E9EA8" }}
                      title={p.visible ? "Visible — click to hide" : "Hidden — click to show"}
                    >
                      {p.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => editingId === p.id ? closeForm() : openEdit(p)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-opacity hover:opacity-70"
                      style={{ background: "rgba(0,0,0,0.05)", color: "#1D1D1F" }}
                    >
                      {editingId === p.id ? <ChevronUp className="w-3.5 h-3.5" /> : <Pencil className="w-3.5 h-3.5" />}
                      {editingId === p.id ? "Close" : "Edit"}
                    </button>

                    {/* Whop sync */}
                    <button
                      onClick={() => syncToWhop(p.id)}
                      disabled={syncingId === p.id}
                      title={p.whop_product_id ? `Synced: ${p.whop_product_id}` : "Sync to Whop"}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-opacity hover:opacity-70 disabled:opacity-40"
                      style={{
                        background: p.whop_product_id ? "rgba(27,122,69,0.08)" : "rgba(10,132,255,0.08)",
                        border: `1px solid ${p.whop_product_id ? "rgba(27,122,69,0.20)" : "rgba(10,132,255,0.20)"}`,
                        color: p.whop_product_id ? "#1B7A45" : "#0A84FF",
                      }}
                    >
                      {syncingId === p.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <RefreshCw className="w-3.5 h-3.5" />
                      )}
                      {p.whop_product_id ? "Whop ✓" : "→ Whop"}
                    </button>

                    {/* Delete */}
                    {confirmDeleteId === p.id ? (
                      <div className="flex items-center gap-1">
                        <span className="text-xs" style={{ color: "#C0392B" }}>Delete?</span>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          disabled={deletingId === p.id}
                          className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-70 disabled:opacity-40"
                          style={{ background: "rgba(192,57,43,0.10)", color: "#C0392B" }}
                        >
                          {deletingId === p.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                          Yes
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="w-6 h-6 flex items-center justify-center rounded-lg transition-opacity hover:opacity-70"
                          style={{ background: "rgba(0,0,0,0.05)", color: "#6E6E73" }}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(p.id)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg transition-opacity hover:opacity-70"
                        style={{ background: "rgba(192,57,43,0.06)", color: "#C0392B" }}
                        title="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Inline edit form */}
              {editingId === p.id && (
                <div className="mt-1 ml-4">
                  <ProductForm
                    form={form}
                    setForm={setForm}
                    onSave={saveForm}
                    onCancel={closeForm}
                    saving={saving}
                    title={`Edit: ${p.name} ${p.concentration}`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Stock inline editor ── */
function StockEditor({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [editing, setEditing] = useState(false);
  const [local, setLocal] = useState(String(value));

  if (!editing) {
    return (
      <button
        onClick={() => { setLocal(String(value)); setEditing(true); }}
        className="text-xs px-2 py-1 rounded-lg transition-opacity hover:opacity-70"
        style={{ background: "rgba(0,0,0,0.05)", color: "#6E6E73", minWidth: 52 }}
        title="Click to edit stock"
      >
        {value} units
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <input
        type="number"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        className="w-16 px-2 py-1 rounded-lg text-xs border focus:outline-none"
        style={{ background: "#FFFFFF", border: "1px solid #0A84FF", color: "#1D1D1F" }}
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter") { onChange(Number(local)); setEditing(false); }
          if (e.key === "Escape") setEditing(false);
        }}
      />
      <button onClick={() => { onChange(Number(local)); setEditing(false); }} className="w-6 h-6 flex items-center justify-center rounded" style={{ background: "rgba(27,122,69,0.10)", color: "#1B7A45" }}>
        <Check className="w-3 h-3" />
      </button>
      <button onClick={() => setEditing(false)} className="w-6 h-6 flex items-center justify-center rounded" style={{ background: "rgba(0,0,0,0.06)", color: "#6E6E73" }}>
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}

/* ── Product Form ── */
function ProductForm({
  form, setForm, onSave, onCancel, saving, title,
}: {
  form: FormState;
  setForm: (f: FormState) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
  title: string;
}) {
  const [uploadingCoa, setUploadingCoa] = useState(false);
  const [coaError, setCoaError] = useState("");
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imgError, setImgError] = useState("");
  const coaInputRef = useRef<HTMLInputElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);

  function set(field: keyof FormState, value: unknown) {
    setForm({ ...form, [field]: value });
  }

  function toggleGoal(g: string) {
    const goals = form.goals.includes(g)
      ? form.goals.filter((x) => x !== g)
      : [...form.goals, g];
    set("goals", goals);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImg(true);
    setImgError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("slug", form.slug || "product");
      const res = await fetch("/api/admin/upload-image", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      set("image", data.url);
    } catch (err) {
      setImgError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingImg(false);
      if (imgInputRef.current) imgInputRef.current.value = "";
    }
  }

  async function handleCoaUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCoa(true);
    setCoaError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("slug", form.slug || "product");
      const res = await fetch("/api/admin/upload-coa", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      set("coa_url", data.url);
    } catch (err) {
      setCoaError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingCoa(false);
      if (coaInputRef.current) coaInputRef.current.value = "";
    }
  }

  const inp = "w-full px-3 py-2 rounded-lg text-sm border focus:outline-none";
  const inpStyle = { background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.12)", color: "#1D1D1F" };
  const lbl = "block text-xs font-semibold mb-1";
  const lblStyle = { color: "#6E6E73" };

  return (
    <div
      className="p-5 rounded-2xl"
      style={{ background: "#FFFFFF", border: "1px solid rgba(10,132,255,0.20)" }}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-sm" style={{ color: "#1D1D1F" }}>{title}</h3>
        <button onClick={onCancel} className="w-7 h-7 flex items-center justify-center rounded-full hover:opacity-70" style={{ background: "rgba(0,0,0,0.06)", color: "#6E6E73" }}>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Basic info */}
        <div>
          <label className={lbl} style={lblStyle}>Name *</label>
          <input
            value={form.name}
            onChange={(e) => {
              set("name", e.target.value);
              if (!form.slug || form.slug === slugify(form.name)) set("slug", slugify(e.target.value));
            }}
            className={inp}
            style={inpStyle}
            placeholder="e.g. Retatrutide"
          />
        </div>
        <div>
          <label className={lbl} style={lblStyle}>Slug *</label>
          <input value={form.slug} onChange={(e) => set("slug", e.target.value)} className={inp} style={inpStyle} placeholder="e.g. retatrutide-10mg" />
        </div>
        <div>
          <label className={lbl} style={lblStyle}>Compound</label>
          <input value={form.compound} onChange={(e) => set("compound", e.target.value)} className={inp} style={inpStyle} placeholder="e.g. LY3437943" />
        </div>
        <div>
          <label className={lbl} style={lblStyle}>Concentration</label>
          <input value={form.concentration} onChange={(e) => set("concentration", e.target.value)} className={inp} style={inpStyle} placeholder="e.g. 10mg" />
        </div>
        <div>
          <label className={lbl} style={lblStyle}>Size</label>
          <input value={form.size} onChange={(e) => set("size", e.target.value)} className={inp} style={inpStyle} placeholder="e.g. 1 Vial" />
        </div>
        <div>
          <label className={lbl} style={lblStyle}>Purity</label>
          <input value={form.purity} onChange={(e) => set("purity", e.target.value)} className={inp} style={inpStyle} placeholder="e.g. 99.2%" />
        </div>

        {/* Pricing */}
        <div>
          <label className={lbl} style={lblStyle}>Price * ($)</label>
          <input type="number" value={form.price} onChange={(e) => set("price", e.target.value)} className={inp} style={inpStyle} placeholder="100" />
        </div>
        <div>
          <label className={lbl} style={lblStyle}>Original Price ($) <span style={{ fontWeight: 400 }}>— optional</span></label>
          <input type="number" value={form.original_price} onChange={(e) => set("original_price", e.target.value)} className={inp} style={inpStyle} placeholder="leave blank if no sale" />
        </div>

        {/* Stock */}
        <div>
          <label className={lbl} style={lblStyle}>Stock Count</label>
          <input type="number" value={form.stock_count} onChange={(e) => set("stock_count", e.target.value)} className={inp} style={inpStyle} placeholder="0" />
        </div>

        {/* Storage */}
        <div>
          <label className={lbl} style={lblStyle}>Storage</label>
          <input value={form.storage} onChange={(e) => set("storage", e.target.value)} className={inp} style={inpStyle} placeholder="e.g. 2-8°C · Protect from light" />
        </div>
        <div>
          <label className={lbl} style={lblStyle}>Molecular Weight</label>
          <input value={form.molecular_weight} onChange={(e) => set("molecular_weight", e.target.value)} className={inp} style={inpStyle} placeholder="e.g. 4731.4 g/mol" />
        </div>
        <div>
          <label className={lbl} style={lblStyle}>Badge</label>
          <input value={form.badge} onChange={(e) => set("badge", e.target.value)} className={inp} style={inpStyle} placeholder="e.g. BEST SELLER" />
        </div>

        {/* Image upload */}
        <div className="sm:col-span-2 lg:col-span-3">
          <label className={lbl} style={lblStyle}>Product Image</label>
          <input
            ref={imgInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={handleImageUpload}
            className="hidden"
          />
          <div className="flex flex-wrap items-start gap-3 mt-1">
            {/* Preview */}
            {form.image && (
              <div className="relative">
                <img
                  src={form.image}
                  alt="Product"
                  className="w-16 h-16 rounded-xl object-cover"
                  style={{ border: "1px solid rgba(0,0,0,0.10)" }}
                />
                <button
                  type="button"
                  onClick={() => set("image", "")}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: "#C0392B", color: "#fff" }}
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </div>
            )}
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <button
                type="button"
                onClick={() => imgInputRef.current?.click()}
                disabled={uploadingImg}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-opacity hover:opacity-75 disabled:opacity-40 self-start"
                style={{ background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.10)", color: "#1D1D1F" }}
              >
                {uploadingImg ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ImagePlus className="w-3.5 h-3.5" />}
                {uploadingImg ? "Uploading…" : (form.image ? "Replace Image" : "Upload Image")}
              </button>
              {imgError && <p className="text-xs" style={{ color: "#C0392B" }}>{imgError}</p>}
              <input
                value={form.image}
                onChange={(e) => set("image", e.target.value)}
                className={inp}
                style={{ ...inpStyle, fontSize: "11px" }}
                placeholder="Or paste image URL"
              />
            </div>
          </div>
        </div>

        {/* COA Upload */}
        <div className="sm:col-span-2 lg:col-span-3">
          <label className={lbl} style={lblStyle}>Certificate of Analysis (COA)</label>
          <input
            ref={coaInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleCoaUpload}
            className="hidden"
          />
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <button
              type="button"
              onClick={() => coaInputRef.current?.click()}
              disabled={uploadingCoa}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-opacity hover:opacity-75 disabled:opacity-40"
              style={{ background: "rgba(10,132,255,0.08)", border: "1px solid rgba(10,132,255,0.2)", color: "#0A84FF" }}
            >
              {uploadingCoa ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              {uploadingCoa ? "Uploading…" : "Upload PDF"}
            </button>

            {form.coa_url ? (
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div
                  className="flex items-center gap-2 flex-1 min-w-0 px-3 py-2 rounded-xl text-sm"
                  style={{ background: "rgba(27,122,69,0.06)", border: "1px solid rgba(27,122,69,0.2)" }}
                >
                  <FileText className="w-3.5 h-3.5 shrink-0" style={{ color: "#1B7A45" }} />
                  <span className="truncate text-xs" style={{ color: "#1B7A45" }}>COA uploaded</span>
                  <a
                    href={form.coa_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 ml-auto"
                    style={{ color: "#1B7A45" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => set("coa_url", "")}
                  className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg transition-colors hover:bg-red-50"
                  style={{ color: "#9E9EA8" }}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <span className="text-xs" style={{ color: "#9E9EA8" }}>No COA attached · Max 10MB PDF</span>
            )}
          </div>
          {coaError && <p className="text-xs mt-1" style={{ color: "#C0392B" }}>{coaError}</p>}
          <input
            value={form.coa_url}
            onChange={(e) => set("coa_url", e.target.value)}
            className={`${inp} mt-2`}
            style={{ ...inpStyle, fontSize: "11px" }}
            placeholder="Or paste COA URL manually"
          />
        </div>

        {/* Description */}
        <div className="sm:col-span-2 lg:col-span-3">
          <label className={lbl} style={lblStyle}>Short Description</label>
          <textarea rows={2} value={form.description} onChange={(e) => set("description", e.target.value)} className={inp} style={inpStyle} placeholder="One-line description" />
        </div>
        <div className="sm:col-span-2 lg:col-span-3">
          <label className={lbl} style={lblStyle}>Long Description</label>
          <textarea rows={3} value={form.long_description} onChange={(e) => set("long_description", e.target.value)} className={inp} style={inpStyle} placeholder="Full research description" />
        </div>

        {/* Goals */}
        <div className="sm:col-span-2 lg:col-span-3">
          <label className={lbl} style={lblStyle}>Goals</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {ALL_GOALS.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => toggleGoal(g)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: form.goals.includes(g) ? "rgba(10,132,255,0.10)" : "rgba(0,0,0,0.04)",
                  border: `1px solid ${form.goals.includes(g) ? "#0A84FF" : "rgba(0,0,0,0.10)"}`,
                  color: form.goals.includes(g) ? "#0A84FF" : "#6E6E73",
                }}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="sm:col-span-2 lg:col-span-3 flex flex-wrap gap-6">
          {(["in_stock", "featured", "visible"] as const).map((field) => (
            <label key={field} className="flex items-center gap-2 cursor-pointer">
              <div
                className="relative w-9 h-5 rounded-full transition-colors cursor-pointer"
                style={{ background: form[field] ? "#0A84FF" : "rgba(0,0,0,0.12)" }}
                onClick={() => set(field, !form[field])}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${form[field] ? "translate-x-4" : "translate-x-0.5"}`} />
              </div>
              <span className="text-sm capitalize" style={{ color: "#6E6E73" }}>
                {field === "in_stock" ? "In Stock" : field === "featured" ? "Featured" : "Visible"}
              </span>
            </label>
          ))}

          <div className="flex items-center gap-2">
            <label className={lbl} style={{ ...lblStyle, marginBottom: 0 }}>Sort Order</label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => set("sort_order", e.target.value)}
              className="w-16 px-2 py-1 rounded-lg text-xs border focus:outline-none"
              style={inpStyle}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-5 justify-end">
        <button onClick={onCancel} className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-70" style={{ background: "rgba(0,0,0,0.06)", color: "#6E6E73" }}>
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={saving || !form.name || !form.slug || !form.price}
          className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-85 disabled:opacity-40"
          style={{ background: "#0A84FF" }}
        >
          {saving ? "Saving…" : "Save Product"}
        </button>
      </div>
    </div>
  );
}
