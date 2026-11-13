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
    const [{ data: previous }, { data: partner }] = await Promise.all([
      // One application per email (the table has a unique email): a new one reuses the old row.
      supabase.from("affiliate_applications").select("id, status").eq("email", email).limit(1).maybeSingle(),
      supabase.from("affiliate_codes").select("id").eq("email", email).limit(1).maybeSingle(),
    ]);
    if (partner) {
      return NextResponse.json({ error: "This email is already a partner. Sign in to open your affiliate portal." }, { status: 409 });
    }
    if (previous?.status === "pending") {
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

    // A rejected (or older) application from the same email goes back to review with the new answers.
    const save = (r: Record<string, unknown>) =>
      previous
        ? supabase
            .from("affiliate_applications")
            .update({ ...r, status: "pending", reviewed_at: null, created_at: new Date().toISOString() })
            .eq("id", previous.id)
        : supabase.from("affiliate_applications").insert(r);

    let { error } = await save(row);
    // Before the migration runs there is no answers column; keep the answers readable in message.
    if (error && /answers|reviewed_at/.test(error.message)) {
      delete row.answers;
      row.message = summary.slice(0, 5000);
      ({ error } = previous
        ? await supabase.from("affiliate_applications").update({ ...row, status: "pending" }).eq("id", previous.id)
        : await supabase.from("affiliate_applications").insert(row));
    }
    // Two submits at the same moment: the first one won.
    if (error?.code === "23505") {
      return NextResponse.json({ error: "We already have a pending application for this email. We'll reply soon." }, { status: 409 });
    }
    if (error) {
      console.error("Affiliate insert error:", error);
      // The database error code (no details) helps us find the cause from a screenshot.
      return NextResponse.json(
        { error: `We couldn't save your application. Please try again. (ref ${error.code ?? "db"})` },
        { status: 500 },
      );
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
