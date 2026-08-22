import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";
import crypto from "crypto";

// Whop sends different event types depending on product type.
// For one-time purchases: "payment.succeeded" or "membership.created"
const PAID_EVENTS = new Set([
  "payment.succeeded",
  "membership.created",
  "checkout.completed",
]);

export async function POST(req: Request) {
  const body = await req.text();

  const secret = process.env.WHOP_WEBHOOK_SECRET;
  if (secret) {
    const sig =
      req.headers.get("x-whop-signature") ??
      req.headers.get("whop-signature") ??
      "";
    const expected = `sha256=${crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex")}`;
    if (sig !== expected) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  let event: Record<string, unknown>;
  try {
    event = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventType =
    (event.action as string) ?? (event.event as string) ?? "";

  if (PAID_EVENTS.has(eventType)) {
    // Whop sends metadata.order_id which we pass when creating the checkout
    const data = event.data as Record<string, unknown> | undefined;
    const metadata = (data?.metadata ?? event.metadata ?? {}) as Record<string, unknown>;
    const orderId = metadata.order_id as string | undefined;
    const whopOrderId = (data?.id ?? event.id) as string | undefined;

    if (orderId) {
      const supabase = getServiceClient();
      await supabase
        .from("orders")
        .update({
          payment_status: "paid",
          status: "processing",
          ...(whopOrderId ? { whop_order_id: whopOrderId } : {}),
        })
        .eq("id", orderId);
    }
  }

  return NextResponse.json({ ok: true });
}
