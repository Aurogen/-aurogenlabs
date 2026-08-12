import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getServiceClient } from "@/lib/supabase-server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil" as never,
});

export async function POST(req: NextRequest) {
  try {
    const { amount, orderId, name, email, address, items } = await req.json();

    if (!amount || !orderId || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save order to Supabase with pending status before charging
    const supabase = getServiceClient();
    await supabase.from("orders").insert({
      id: orderId,
      created_at: new Date().toISOString(),
      name,
      email,
      address,
      items,
      total: amount,
      status: "pending_payment",
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      metadata: { order_id: orderId, email, name },
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("create-payment-intent error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
