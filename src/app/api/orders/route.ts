import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getServiceClient } from "@/lib/supabase-server";
import { sendOrderConfirmation, sendAdminOrderNotification } from "@/lib/email";
import { resolveAttribution, REF_COOKIE } from "@/lib/affiliates";
import { priceOrder, recordDiscountUse } from "@/lib/pricing";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, address, items: cartItems, discount_code } = body as {
      name?: string;
      email?: string;
      address?: string;
      items?: { slug?: unknown; quantity?: unknown }[];
      discount_code?: string | null;
    };

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Sign in required" }, { status: 401 });
    }

    const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
    const customerName = clean(name, 120);
    const customerEmail = clean(email, 200).toLowerCase();
    const shippingAddress = clean(address, 400);
    if (!customerName || !shippingAddress || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      return NextResponse.json({ error: "Please complete your name, email and shipping address." }, { status: 400 });
    }

    // Prices, stock and the discount are resolved from the database, never from the browser.
    const priced = await priceOrder(cartItems ?? [], discount_code ?? null);
    if (!priced.ok) {
      return NextResponse.json({ error: priced.error }, { status: 400 });
    }
    const { total, discount } = priced;
    const items = priced.lines.map(({ name, concentration, quantity, price }) => ({ name, concentration, quantity, price }));
    const discount_amount = discount?.discount_amount ?? null;

    const id = `ORD-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 4).toUpperCase()}`;
    const date = new Date().toISOString();
    const status = "pending_payment";
    const payment_status = "pending";

    const supabase = getServiceClient();

    // Attribution is decided server-side: influencer coupon first, then the link cookie.
    const buyer = await currentUser();
    const attribution = await resolveAttribution({
      couponCode: discount?.referral ? discount.code : null,
      refCookie: req.cookies.get(REF_COOKIE)?.value ?? null,
      buyerUserId: userId,
      buyerEmails: (buyer?.emailAddresses ?? []).map((e) => e.emailAddress),
    });
    const commission_amount = attribution
      ? Math.round(Number(total) * Number(attribution.affiliate.commission_rate) / 100 * 100) / 100
      : null;

    const row: Record<string, unknown> = {
      id,
      created_at: date,
      name: customerName,
      email: customerEmail,
      address: shippingAddress,
      items,
      total,
      status,
      payment_status,
      user_id: userId,
      ...(attribution
        ? {
            affiliate_code: attribution.affiliate.code,
            attribution_source: attribution.source,
            commission_amount,
            commission_status: "pending",
          }
        : {}),
      ...(discount ? { discount_code: discount.code, discount_amount } : {}),
    };
    let { error } = await supabase.from("orders").insert(row);
    // Orders must never fail because the affiliate migration hasn't been applied yet.
    if (error && /attribution_source|commission_status/.test(error.message)) {
      delete row.attribution_source;
      delete row.commission_status;
      ({ error } = await supabase.from("orders").insert(row));
    }

    if (error) {
      console.error("Order insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await recordDiscountUse(discount?.code_id ?? null);

    // Until a card processor is connected every order is paid manually, so emails go out now.
    {
      const accountEmail = buyer?.primaryEmailAddress?.emailAddress ?? customerEmail;
      const results = await Promise.allSettled([
        sendOrderConfirmation(accountEmail, {
          id, name: customerName, items, total, address: shippingAddress, date, email: customerEmail,
          discountCode: discount?.code ?? null,
          discountAmount: discount_amount,
          paymentPending: true,
        }),
        sendAdminOrderNotification({ id, name: customerName, email: customerEmail, address: shippingAddress, items, total }),
      ]);
      results.forEach((r) => {
        if (r.status === "rejected") console.error("Order email error:", r.reason);
      });
    }

    return NextResponse.json({ success: true, id, total, items, date });
  } catch (err) {
    console.error("Order POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = req.nextUrl.searchParams.get("email");
    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const user = await currentUser();
    const ownEmails = (user?.emailAddresses ?? []).map((e) => e.emailAddress.toLowerCase());
    if (!ownEmails.includes(email.toLowerCase())) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("email", email)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Orders fetch error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const orders = (data ?? []).map((row) => ({
      id: row.id,
      date: row.created_at,
      name: row.name,
      email: row.email,
      items: row.items,
      total: row.total,
      status: row.status,
    }));

    return NextResponse.json({ orders });
  } catch (err) {
    console.error("Orders GET error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
