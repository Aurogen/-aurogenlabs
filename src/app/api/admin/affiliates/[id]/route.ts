import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";
import { isAdmin } from "@/lib/admin";
import { sendAffiliateApproved, sendAffiliateRejected } from "@/lib/email";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 20);
}

function randomSuffix(): string {
  return Math.random().toString(36).slice(2, 6);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const { status } = await req.json() as { status: "approved" | "rejected" };

  if (status !== "approved" && status !== "rejected") {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const supabase = getServiceClient();

  const { data: app, error: fetchError } = await supabase
    .from("affiliate_applications")
    .select("name, email")
    .eq("id", id)
    .single();

  if (fetchError || !app) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { error: updateError } = await supabase
    .from("affiliate_applications")
    .update({ status })
    .eq("id", id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  let affiliateCode: string | undefined;

  if (status === "approved") {
    // Generate a unique referral code
    const base = slugify(app.name);
    let code = `${base}-${randomSuffix()}`;

    // Retry until unique (very unlikely to collide)
    for (let i = 0; i < 5; i++) {
      const { data: existing } = await supabase
        .from("affiliate_codes")
        .select("id")
        .eq("code", code)
        .maybeSingle();
      if (!existing) break;
      code = `${base}-${randomSuffix()}`;
    }

    const { error: codeErr } = await supabase
      .from("affiliate_codes")
      .insert({
        application_id: id,
        name: app.name,
        email: app.email,
        code,
        commission_rate: 20,
      });

    if (!codeErr) {
      affiliateCode = code;
    }
  }

  try {
    if (status === "approved") {
      await sendAffiliateApproved(app.email, app.name, affiliateCode);
    } else {
      await sendAffiliateRejected(app.email, app.name);
    }
  } catch {
    // Email failure doesn't roll back status
  }

  return NextResponse.json({ ok: true, code: affiliateCode });
}
