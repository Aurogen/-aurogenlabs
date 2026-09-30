"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Check, ExternalLink, Loader2, Lock, Plus, RotateCcw, Trash2 } from "lucide-react";
import {
  DEFAULT_PARTNER_FORM,
  FIELD_TYPES,
  OPTION_TYPES,
  type FieldType,
  type FormField,
  type PartnerFormConfig,
} from "@/lib/partner-form";

const CARD = { background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" };
const INPUT = "w-full px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0A84FF]/30";
const INPUT_STYLE = { background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.10)", color: "#1D1D1F" };
const LABEL = "block text-xs font-semibold mb-1";

let tempId = 0;
const newId = () => `new_${Date.now().toString(36)}_${tempId++}`;

export default function PartnerFormBuilder() {
  const [form, setForm] = useState<PartnerFormConfig | null>(null);
  const [saved, setSaved] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/admin/partner-form")
      .then((r) => r.json())
      .then((d) => {
        if (!alive || !d.form) return;
        setForm(d.form);
        setSaved(JSON.stringify(d.form));
      })
      .catch(() => alive && setMessage({ kind: "error", text: "Couldn't load the form." }));
    return () => {
      alive = false;
    };
  }, []);

  if (!form) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#6E6E73" }} />
      </div>
    );
  }

  const dirty = JSON.stringify(form) !== saved;
  const update = (patch: Partial<PartnerFormConfig>) => setForm({ ...form, ...patch });
  const updateField = (i: number, patch: Partial<FormField>) =>
    update({ fields: form.fields.map((f, j) => (j === i ? { ...f, ...patch } : f)) });
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= form.fields.length) return;
    const fields = [...form.fields];
    [fields[i], fields[j]] = [fields[j], fields[i]];
    update({ fields });
  };
  const remove = (i: number) => {
    if (!confirm(`Delete the question "${form.fields[i].label || "untitled"}"?`)) return;
    update({ fields: form.fields.filter((_, j) => j !== i) });
  };
  const add = () =>
    update({ fields: [...form.fields, { id: newId(), type: "text", label: "", required: false }] });

  async function save() {
    if (!form) return;
    const missing = form.fields.findIndex((f) => !f.label.trim());
    if (missing >= 0) {
      setMessage({ kind: "error", text: `Question #${missing + 1} needs a label.` });
      return;
    }
    const noOptions = form.fields.findIndex((f) => OPTION_TYPES.includes(f.type) && !(f.options ?? []).some((o) => o.trim()));
    if (noOptions >= 0) {
      setMessage({ kind: "error", text: `Question #${noOptions + 1} needs at least one option.` });
      return;
    }
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/partner-form", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      setForm(data.form);
      setSaved(JSON.stringify(data.form));
      setMessage({ kind: "ok", text: "Saved. The public form is updated." });
    } catch (e) {
      setMessage({ kind: "error", text: (e as Error).message });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Header / actions */}
      <div className="p-5 rounded-2xl flex flex-wrap items-center gap-3" style={CARD}>
        <div className="flex-1 min-w-[220px]">
          <p className="font-bold text-sm" style={{ color: "#1D1D1F" }}>Partner application form</p>
          <p className="text-xs mt-0.5" style={{ color: "#6E6E73" }}>
            What people fill in at <span className="font-mono">/affiliates</span>. Name and email are always asked.
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm font-medium" style={{ color: "#1D1D1F" }}>
          <input type="checkbox" checked={form.enabled} onChange={(e) => update({ enabled: e.target.checked })} />
          Accepting applications
        </label>
        <a
          href="/affiliates"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold"
          style={{ background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.10)", color: "#1D1D1F" }}
        >
          <ExternalLink className="w-3.5 h-3.5" /> View live
        </a>
      </div>

      {/* Texts */}
      <div className="p-5 rounded-2xl space-y-3" style={CARD}>
        <label className="block">
          <span className={LABEL} style={{ color: "#6E6E73" }}>Form title</span>
          <input value={form.title} onChange={(e) => update({ title: e.target.value })} className={INPUT} style={INPUT_STYLE} />
        </label>
        <label className="block">
          <span className={LABEL} style={{ color: "#6E6E73" }}>Intro text (shown above the questions)</span>
          <textarea value={form.intro} onChange={(e) => update({ intro: e.target.value })} rows={2} className={`${INPUT} resize-y`} style={INPUT_STYLE} />
        </label>
        <label className="block">
          <span className={LABEL} style={{ color: "#6E6E73" }}>Message after sending</span>
          <textarea value={form.successMessage} onChange={(e) => update({ successMessage: e.target.value })} rows={2} className={`${INPUT} resize-y`} style={INPUT_STYLE} />
        </label>
      </div>

      {/* Fixed fields */}
      <div className="px-5 py-3 rounded-2xl flex flex-wrap items-center gap-3 text-sm" style={{ ...CARD, background: "#FAFAFB" }}>
        <Lock className="w-4 h-4" style={{ color: "#9E9EA8" }} />
        <span style={{ color: "#6E6E73" }}>Always included:</span>
        <span className="font-medium" style={{ color: "#1D1D1F" }}>Full name *</span>
        <span className="font-medium" style={{ color: "#1D1D1F" }}>Email *</span>
      </div>

      {/* Questions */}
      {form.fields.map((f, i) => (
        <FieldEditor
          key={f.id}
          index={i}
          field={f}
          total={form.fields.length}
          onChange={(patch) => updateField(i, patch)}
          onMove={(dir) => move(i, dir)}
          onRemove={() => remove(i)}
        />
      ))}

      <button
        onClick={add}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold"
        style={{ border: "1.5px dashed rgba(10,132,255,0.45)", color: "#0A84FF", background: "rgba(10,132,255,0.03)" }}
      >
        <Plus className="w-4 h-4" /> Add question
      </button>

      {/* Save bar */}
      <div
        className="sticky bottom-4 p-4 rounded-2xl flex flex-wrap items-center gap-3"
        style={{ ...CARD, boxShadow: "0 12px 32px -16px rgba(0,0,0,0.25)" }}
      >
        {message ? (
          <p className="text-sm flex-1" style={{ color: message.kind === "ok" ? "#1B7A45" : "#C0392B" }}>{message.text}</p>
        ) : (
          <p className="text-sm flex-1" style={{ color: "#6E6E73" }}>{dirty ? "You have unsaved changes." : "All changes saved."}</p>
        )}
        <button
          onClick={() => {
            if (confirm("Replace the current form with the default questions? (Not saved until you press Save.)")) {
              setForm(DEFAULT_PARTNER_FORM);
              setMessage(null);
            }
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold"
          style={{ color: "#6E6E73" }}
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset to default
        </button>
        <button
          onClick={save}
          disabled={!dirty || saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40"
          style={{ background: "#0A84FF", color: "#FFFFFF" }}
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
          Save form
        </button>
      </div>
    </div>
  );
}

function FieldEditor({
  index,
  field: f,
  total,
  onChange,
  onMove,
  onRemove,
}: {
  index: number;
  field: FormField;
  total: number;
  onChange: (patch: Partial<FormField>) => void;
  onMove: (dir: -1 | 1) => void;
  onRemove: () => void;
}) {
  const hasOptions = OPTION_TYPES.includes(f.type);
  const iconBtn = "w-8 h-8 flex items-center justify-center rounded-lg disabled:opacity-25 hover:bg-black/5";

  return (
    <div className="p-5 rounded-2xl space-y-3" style={CARD}>
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(10,132,255,0.08)", color: "#0A84FF" }}>
          #{index + 1}
        </span>
        <select
          value={f.type}
          onChange={(e) => {
            const type = e.target.value as FieldType;
            onChange({ type, options: OPTION_TYPES.includes(type) ? (f.options?.length ? f.options : ["Option 1"]) : undefined });
          }}
          className="px-2 py-1.5 rounded-lg text-xs font-medium outline-none"
          style={INPUT_STYLE}
          aria-label="Question type"
        >
          {FIELD_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        <label className="flex items-center gap-1.5 text-xs font-medium ml-2" style={{ color: "#1D1D1F" }}>
          <input type="checkbox" checked={f.required} onChange={(e) => onChange({ required: e.target.checked })} />
          Required
        </label>
        <div className="ml-auto flex items-center">
          <button className={iconBtn} onClick={() => onMove(-1)} disabled={index === 0} aria-label="Move up"><ArrowUp className="w-4 h-4" /></button>
          <button className={iconBtn} onClick={() => onMove(1)} disabled={index === total - 1} aria-label="Move down"><ArrowDown className="w-4 h-4" /></button>
          <button className={iconBtn} onClick={onRemove} aria-label="Delete question" style={{ color: "#C0392B" }}><Trash2 className="w-4 h-4" /></button>
        </div>
      </div>

      <label className="block">
        <span className={LABEL} style={{ color: "#6E6E73" }}>{f.type === "consent" ? "Agreement text" : "Question"}</span>
        {f.type === "consent" ? (
          <textarea value={f.label} onChange={(e) => onChange({ label: e.target.value })} rows={2} className={`${INPUT} resize-y`} style={INPUT_STYLE} />
        ) : (
          <input value={f.label} onChange={(e) => onChange({ label: e.target.value })} placeholder="e.g. What's your Instagram handle?" className={INPUT} style={INPUT_STYLE} />
        )}
      </label>

      <div className="grid sm:grid-cols-2 gap-3">
        {!hasOptions && f.type !== "consent" && (
          <label className="block">
            <span className={LABEL} style={{ color: "#6E6E73" }}>Placeholder (optional)</span>
            <input value={f.placeholder ?? ""} onChange={(e) => onChange({ placeholder: e.target.value })} className={INPUT} style={INPUT_STYLE} />
          </label>
        )}
        <label className={`block ${hasOptions || f.type === "consent" ? "sm:col-span-2" : ""}`}>
          <span className={LABEL} style={{ color: "#6E6E73" }}>Help text (optional)</span>
          <input value={f.help ?? ""} onChange={(e) => onChange({ help: e.target.value })} className={INPUT} style={INPUT_STYLE} />
        </label>
      </div>

      {hasOptions && (
        <div>
          <span className={LABEL} style={{ color: "#6E6E73" }}>Options</span>
          <div className="space-y-2">
            {(f.options ?? []).map((o, oi) => (
              <div key={oi} className="flex gap-2">
                <input
                  value={o}
                  onChange={(e) => onChange({ options: (f.options ?? []).map((x, xi) => (xi === oi ? e.target.value : x)) })}
                  className={INPUT}
                  style={INPUT_STYLE}
                  aria-label={`Option ${oi + 1}`}
                />
                <button
                  className={iconBtn}
                  onClick={() => onChange({ options: (f.options ?? []).filter((_, xi) => xi !== oi) })}
                  disabled={(f.options ?? []).length <= 1}
                  aria-label="Remove option"
                  style={{ color: "#C0392B" }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => onChange({ options: [...(f.options ?? []), `Option ${(f.options?.length ?? 0) + 1}`] })}
              className="flex items-center gap-1 text-xs font-semibold"
              style={{ color: "#0A84FF" }}
            >
              <Plus className="w-3.5 h-3.5" /> Add option
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
