import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";
import { sendAffiliateReceived, sendAdminPartnerApplication } from "@/lib/email";
import { loadPartnerForm } from "@/lib/partner-form-server";
import { answerToText, validateAnswers } from "@/lib/partner-form";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { name?: string; email?: string; answers?: Record<string, unknown>; company_url?: string };

    // Honeypot: real visitors never see or fill this field.
    if (body.company_url) return NextResponse.json({ success: true });

    const name = (body.name ?? "").trim().slice(0, 120);
    const email = (body.email ?? "").trim().toLowerCase().slice(0, 200);
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter your name and a valid email." }, { status: 400 });
    }

    const form = await loadPartnerForm();
    if (!form.enabled) {
      return NextResponse.json({ error: "Applications are currently closed." }, { status: 403 });
    }
    const checked = validateAnswers(form, body.answers ?? {});
    if (!checked.ok) return NextResponse.json({ error: checked.error }, { status: 400 });
    const { answers } = checked;

    const supabase = getServiceClient();
    const [{ data: pending }, { data: partner }] = await Promise.all([
      supabase.from("affiliate_applications").select("id").eq("email", email).eq("status", "pending").limit(1).maybeSingle(),
      supabase.from("affiliate_codes").select("id").eq("email", email).limit(1).maybeSingle(),
    ]);
    if (partner) {
      return NextResponse.json({ error: "This email is already a partner. Sign in to open your affiliate portal." }, { status: 409 });
    }
    if (pending) {
      return NextResponse.json({ error: "We already have a pending application for this email. We'll reply soon." }, { status: 409 });
    }

    const firstUrl = answers.find((a) => a.type === "url" && typeof a.value === "string" && a.value);
    const summary = answers.map((a) => `${a.label}: ${answerToText(a) || "—"}`).join("\n");
    const row: Record<string, unknown> = {
      name,
      email,
      website: (firstUrl?.value as string | undefined) ?? null,
      answers,
    };

    let { error } = await supabase.from("affiliate_applications").insert(row);
    // Before the migration runs there is no answers column; keep the answers readable in message.
    if (error && /answers/.test(error.message)) {
      delete row.answers;
      row.message = summary.slice(0, 5000);
      ({ error } = await supabase.from("affiliate_applications").insert(row));
    }
    if (error) {
      console.error("Affiliate insert error:", error);
      return NextResponse.json({ error: "We couldn't save your application. Please try again." }, { status: 500 });
    }

    await Promise.allSettled([
      sendAffiliateReceived(email, name),
      sendAdminPartnerApplication({ name, email, answers: answers.map((a) => ({ label: a.label, value: answerToText(a) })) }),
    ]).then((results) =>
      results.forEach((r) => r.status === "rejected" && console.error("Partner application email error:", r.reason))
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Affiliates POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
