import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";
import { isAdmin } from "@/lib/admin";
import { sendAffiliateApproved, sendAffiliateRejected } from "@/lib/email";
import { generateUniqueCode, generateUniqueCoupon } from "@/lib/affiliates";

const DEFAULT_COMMISSION = 20;
const DEFAULT_DISCOUNT = 10;

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
  let couponCode: string | undefined;

  if (status === "approved") {
    const { data: existing } = await supabase
      .from("affiliate_codes")
      .select("code, coupon_code")
      .eq("email", app.email)
      .maybeSingle();

    if (existing) {
      affiliateCode = existing.code;
      couponCode = existing.coupon_code ?? undefined;
    } else {
      const code = await generateUniqueCode(app.name);
      const coupon = await generateUniqueCoupon(app.name, DEFAULT_DISCOUNT);
      const { error: codeErr } = await supabase.from("affiliate_codes").insert({
        application_id: id,
        name: app.name,
        email: app.email,
        code,
        coupon_code: coupon,
        commission_rate: DEFAULT_COMMISSION,
        customer_discount_pct: DEFAULT_DISCOUNT,
        active: true,
      });
      if (codeErr) {
        return NextResponse.json({ error: codeErr.message }, { status: 500 });
      }
      affiliateCode = code;
      couponCode = coupon;
    }
  }

  try {
    if (status === "approved") {
      await sendAffiliateApproved(app.email, app.name, {
        code: affiliateCode,
        coupon: couponCode,
        commissionRate: DEFAULT_COMMISSION,
        discountPct: DEFAULT_DISCOUNT,
      });
    } else {
      await sendAffiliateRejected(app.email, app.name);
    }
  } catch {
    // Email failure doesn't roll back status
  }

  return NextResponse.json({ ok: true, code: affiliateCode, coupon_code: couponCode });
}
