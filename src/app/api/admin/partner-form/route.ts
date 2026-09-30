import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { loadPartnerForm, savePartnerForm } from "@/lib/partner-form-server";
import { sanitizeFormConfig } from "@/lib/partner-form";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  return NextResponse.json({ form: await loadPartnerForm() });
}

export async function PUT(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { form } = (await req.json()) as { form?: unknown };
  const config = sanitizeFormConfig(form);
  try {
    await savePartnerForm(config);
  } catch (e) {
    const msg = (e as Error).message;
    const hint = /site_settings/.test(msg) ? " — run the partner_application_form.sql migration in Supabase first." : "";
    return NextResponse.json({ error: msg + hint }, { status: 500 });
  }
  return NextResponse.json({ ok: true, form: config });
}
