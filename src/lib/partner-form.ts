// Partner application form, editable from the admin panel. Pure module: safe on client and server.

export const FIELD_TYPES = [
  { value: "text", label: "Short text" },
  { value: "textarea", label: "Paragraph" },
  { value: "email", label: "Email" },
  { value: "url", label: "Link / URL" },
  { value: "phone", label: "Phone" },
  { value: "number", label: "Number" },
  { value: "select", label: "Dropdown (one choice)" },
  { value: "radio", label: "Multiple choice (one)" },
  { value: "checkboxes", label: "Checkboxes (several)" },
  { value: "consent", label: "Agreement checkbox" },
] as const;

export type FieldType = (typeof FIELD_TYPES)[number]["value"];
export const OPTION_TYPES: FieldType[] = ["select", "radio", "checkboxes"];

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  help?: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

export interface PartnerFormConfig {
  enabled: boolean;
  title: string;
  intro: string;
  successMessage: string;
  fields: FormField[];
}

export interface ApplicationAnswer {
  id: string;
  label: string;
  type: FieldType;
  value: string | string[] | boolean;
}

/** Name and email are always asked: they identify the applicant and become the affiliate account. */
export const FIXED_FIELD_IDS = ["name", "email"] as const;

export const DEFAULT_PARTNER_FORM: PartnerFormConfig = {
  enabled: true,
  title: "Apply to become a partner",
  intro:
    "Tell us about you and your audience. Our team reviews every application and replies by email within a few business days.",
  successMessage:
    "Thanks for applying! Our team will review your application and reply by email within a few business days.",
  fields: [
    { id: "profile", type: "url", label: "Main social profile or website", placeholder: "https://instagram.com/yourhandle", required: true },
    {
      id: "platform",
      type: "select",
      label: "Main platform",
      required: true,
      options: ["Instagram", "TikTok", "YouTube", "X / Twitter", "Podcast", "Blog / Website", "Newsletter", "Other"],
    },
    {
      id: "followers",
      type: "select",
      label: "Audience size",
      required: true,
      options: ["Under 1,000", "1,000 – 10,000", "10,000 – 50,000", "50,000 – 250,000", "250,000+"],
    },
    { id: "country", type: "text", label: "Country", required: true },
    {
      id: "audience",
      type: "textarea",
      label: "Who is your audience?",
      placeholder: "e.g. researchers, lab professionals, science educators",
      required: true,
    },
    {
      id: "plan",
      type: "textarea",
      label: "How would you promote Aurogen Labs?",
      placeholder: "Content formats, frequency, channels…",
      required: true,
    },
    {
      id: "research_only",
      type: "consent",
      label:
        "I understand all products are for laboratory research use only, and I will not make health, dosing or human-use claims when promoting them.",
      required: true,
    },
  ],
};

const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function slugId(label: string, taken: Set<string>) {
  const base = label.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 30) || "field";
  let id = base;
  for (let i = 2; taken.has(id) || (FIXED_FIELD_IDS as readonly string[]).includes(id); i++) id = `${base}_${i}`;
  return id;
}

/** Normalizes a config coming from the admin UI or the database. */
export function sanitizeFormConfig(raw: unknown): PartnerFormConfig {
  const r = (raw ?? {}) as Partial<PartnerFormConfig>;
  const taken = new Set<string>();
  const validTypes = new Set<string>(FIELD_TYPES.map((t) => t.value));

  const fields: FormField[] = [];
  for (const f of Array.isArray(r.fields) ? r.fields.slice(0, 40) : []) {
    const label = clip(f?.label, 400);
    if (!label || !validTypes.has(f?.type as string)) continue;
    const type = f.type as FieldType;
    let id = clip(f.id, 40).toLowerCase().replace(/[^a-z0-9_]/g, "");
    // Questions added in the admin arrive with a temporary "new_" id; give them a readable one.
    if (!id || id.startsWith("new_") || taken.has(id) || (FIXED_FIELD_IDS as readonly string[]).includes(id)) id = slugId(label, taken);
    taken.add(id);

    const field: FormField = { id, type, label, required: Boolean(f.required) };
    const help = clip(f.help, 300);
    const placeholder = clip(f.placeholder, 150);
    if (help) field.help = help;
    if (placeholder) field.placeholder = placeholder;
    if (OPTION_TYPES.includes(type)) {
      const options = (Array.isArray(f.options) ? f.options : [])
        .map((o) => clip(o, 150))
        .filter((o, i, arr) => o && arr.indexOf(o) === i)
        .slice(0, 30);
      if (options.length === 0) continue;
      field.options = options;
    }
    fields.push(field);
  }

  return {
    enabled: r.enabled !== false,
    title: clip(r.title, 150) || DEFAULT_PARTNER_FORM.title,
    intro: clip(r.intro, 1000),
    successMessage: clip(r.successMessage, 600) || DEFAULT_PARTNER_FORM.successMessage,
    fields,
  };
}

/** Validates submitted answers against the form. Returns a snapshot so later form edits never change old applications. */
export function validateAnswers(
  config: PartnerFormConfig,
  raw: Record<string, unknown>
): { ok: true; answers: ApplicationAnswer[] } | { ok: false; error: string } {
  const answers: ApplicationAnswer[] = [];
  for (const f of config.fields) {
    const v = raw?.[f.id];
    let value: ApplicationAnswer["value"];

    if (f.type === "consent") {
      value = v === true;
      if (f.required && !value) return { ok: false, error: "Please accept the required agreement to continue." };
    } else if (f.type === "checkboxes") {
      value = (Array.isArray(v) ? v : []).filter((x): x is string => typeof x === "string" && f.options!.includes(x));
      if (f.required && value.length === 0) return { ok: false, error: `Please answer: ${f.label}` };
    } else {
      value = clip(v, f.type === "textarea" ? 3000 : 400);
      if (f.required && !value) return { ok: false, error: `Please answer: ${f.label}` };
      if (value) {
        if ((f.type === "select" || f.type === "radio") && !f.options!.includes(value))
          return { ok: false, error: `Invalid choice for: ${f.label}` };
        if (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return { ok: false, error: `Enter a valid email for: ${f.label}` };
        if (f.type === "number" && !Number.isFinite(Number(value.replace(/,/g, ""))))
          return { ok: false, error: `Enter a number for: ${f.label}` };
      }
    }
    answers.push({ id: f.id, label: f.label, type: f.type, value });
  }
  return { ok: true, answers };
}

export function answerToText(a: ApplicationAnswer): string {
  if (typeof a.value === "boolean") return a.value ? "Yes" : "No";
  if (Array.isArray(a.value)) return a.value.join(", ");
  return a.value;
}
