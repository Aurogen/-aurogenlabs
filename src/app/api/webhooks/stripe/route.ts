import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getServiceClient } from "@/lib/supabase-server";
import { getStripe } from "@/lib/stripe";
import { recordDiscountUse } from "@/lib/pricing";
import { sendOrderConfirmation, sendAdminOrderNotification } from "@/lib/email";
import { syncOrderToQuickBooks } from "@/lib/quickbooks";
import { trackOrderPlaced } from "@/lib/klaviyo";
import { captureServerEvent } from "@/lib/posthog";

export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!stripe || !secret) {
    console.error("Stripe webhook rejected: STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  // The signature is computed over the raw body, so read it as text before parsing.
  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, req.headers.get("stripe-signature") ?? "", secret);
  } catch (err) {
    console.error("Stripe webhook signature error:", (err as Error).message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      const session = event.data.object;
      if (session.payment_status === "paid") await markPaid(session);
      break;
    }
    case "checkout.session.async_payment_failed":
    case "checkout.session.expired": {
      const session = event.data.object;
      const orderId = session.metadata?.order_id ?? session.client_reference_id;
      if (orderId) {
        await getServiceClient()
          .from("orders")
          .update({ status: "cancelled", payment_status: event.type === "checkout.session.expired" ? "expired" : "failed" })
          .eq("id", orderId)
          .neq("payment_status", "paid");
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}

async function markPaid(session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.order_id ?? session.client_reference_id;
  if (!orderId) {
    console.error("Stripe session without order id:", session.id);
    return;
  }

  // Only the first delivery flips the order to paid; Stripe retries are ignored.
  const { data: order, error } = await getServiceClient()
    .from("orders")
    .update({
      payment_status: "paid",
      status: "processing",
      ...(session.amount_total != null ? { total: session.amount_total / 100 } : {}),
    })
    .eq("id", orderId)
    .neq("payment_status", "paid")
    .select("*")
    .maybeSingle();

  if (error) {
    console.error("Stripe webhook order update error:", error.message);
    throw new Error(error.message); // non-2xx makes Stripe retry later
  }
  if (!order) return;

  const { id, name, email, address, items, total } = order;
  await recordDiscountUse(session.metadata?.discount_code_id || null);

  const results = await Promise.allSettled([
    sendOrderConfirmation(email, {
      id,
      name,
      items,
      total: Number(total),
      address,
      date: order.created_at,
      email,
      discountCode: order.discount_code ?? null,
      discountAmount: order.discount_amount != null ? Number(order.discount_amount) : null,
      shipping: order.shipping_amount != null ? Number(order.shipping_amount) : null,
    }),
    sendAdminOrderNotification({ id, name, email, address, items, total: Number(total) }),
    syncOrderToQuickBooks({ id, name, email, items, total: Number(total) }),
    trackOrderPlaced({ id, name, email, items, total: Number(total) }),
  ]);
  results.forEach((r) => {
    if (r.status === "rejected") console.error("Post-payment task error:", r.reason);
  });
  captureServerEvent(email, "order_placed", { order_id: id, total: Number(total) });
}
