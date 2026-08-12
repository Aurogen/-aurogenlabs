import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getServiceClient } from "@/lib/supabase-server";
import { sendOrderConfirmation } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil" as never,
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature error:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object as Stripe.PaymentIntent;
    const orderId = pi.metadata?.order_id;

    if (!orderId) {
      return NextResponse.json({ received: true });
    }

    const supabase = getServiceClient();

    // Update order to paid
    const { data: order } = await supabase
      .from("orders")
      .update({ status: "paid" })
      .eq("id", orderId)
      .select()
      .single();

    // Send confirmation email
    if (order) {
      sendOrderConfirmation(order.email, {
        id: order.id,
        name: order.name,
        items: order.items,
        total: order.total,
        address: order.address,
      }).catch(console.error);
    }
  }

  return NextResponse.json({ received: true });
}
