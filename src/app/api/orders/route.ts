import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getServiceClient } from "@/lib/supabase-server";
import { sendOrderConfirmation, sendAdminOrderNotification } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, date, name, email, address, items, total, status, payment_status, affiliate_code, discount_code, discount_amount } = body;

    if (!id || !email || !items || !total) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Sign in required" }, { status: 401 });
    }

    const supabase = getServiceClient();

    // Resolve commission if a referral code was provided
    let commission_amount: number | null = null;
    if (affiliate_code) {
      const { data: aff } = await supabase
        .from("affiliate_codes")
        .select("commission_rate")
        .eq("code", affiliate_code)
        .maybeSingle();
      if (aff) {
        commission_amount = Math.round((total * aff.commission_rate) / 100 * 100) / 100;
      }
    }

    const { error } = await supabase.from("orders").insert({
      id,
      created_at: date,
      name,
      email,
      address,
      items,
      total,
      status: status ?? "processing",
      ...(payment_status ? { payment_status } : {}),
      user_id: userId,
      ...(affiliate_code && commission_amount !== null
        ? { affiliate_code, commission_amount }
        : {}),
      ...(discount_code ? { discount_code, discount_amount: discount_amount ?? null } : {}),
    });

    if (error) {
      console.error("Order insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Manual-payment orders get their emails now; card-paid orders get them from the payment webhook.
    if (payment_status === "pending") {
      const user = await currentUser();
      const accountEmail = user?.primaryEmailAddress?.emailAddress ?? email;
      const results = await Promise.allSettled([
        sendOrderConfirmation(accountEmail, {
          id, name, items, total, address, date, email,
          discountCode: discount_code ?? null,
          discountAmount: discount_amount ?? null,
          paymentPending: true,
        }),
        sendAdminOrderNotification({ id, name, email, address, items, total }),
      ]);
      results.forEach((r) => {
        if (r.status === "rejected") console.error("Order email error:", r.reason);
      });
    }

    return NextResponse.json({ success: true, id });
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
