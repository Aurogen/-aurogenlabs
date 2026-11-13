import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { buyUpsLabel, LabelError, parseOrderAddress, type StreetAddress } from "@/lib/shippo";
import { getServiceClient } from "@/lib/supabase-server";
import { sendShippingConfirmation } from "@/lib/email";
import { trackOrderShipped } from "@/lib/klaviyo";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/**
 * Admin: buy the UPS label for a paid order (Ground for standard, Next Day Air for overnight),
 * save the 4×6 PDF and tracking on the order, mark it shipped and email the customer.
 * Body: { orderId, address? } — address corrects an order whose address couldn't be read.
 */
export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const orderId = clean(body.orderId, 64);
  if (!orderId) return NextResponse.json({ error: "orderId required" }, { status: 400 });

  const supabase = getServiceClient();
  const { data: order, error } = await supabase
    .from("orders")
    .select("id, name, email, address, payment_status, shipping_method, label_url, tracking_number, tracking_url")
    .eq("id", orderId)
    .maybeSingle();
  if (error || !order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  // Never buy a second label for the same order.
  if (order.label_url) {
    return NextResponse.json({
      labelUrl: order.label_url,
      trackingNumber: order.tracking_number,
      trackingUrl: order.tracking_url,
      existing: true,
    });
  }
  if (order.payment_status !== "paid") {
    return NextResponse.json({ error: "This order is not paid yet." }, { status: 400 });
  }

  let to: StreetAddress | null;
  if (body.address && typeof body.address === "object") {
    const a = body.address;
    to = {
      street1: clean(a.street1, 120),
      street2: clean(a.street2, 120) || undefined,
      city: clean(a.city, 80),
      state: clean(a.state, 2).toUpperCase(),
      zip: clean(a.zip, 10),
    };
    if (!to.street1 || !to.city || !/^[A-Z]{2}$/.test(to.state) || !/^\d{5}(-\d{4})?$/.test(to.zip)) {
      return NextResponse.json({ error: "Complete street, city, 2-letter state and ZIP.", code: "address" }, { status: 400 });
    }
  } else {
    to = parseOrderAddress(order.address ?? "");
    if (!to) {
      return NextResponse.json(
        { error: "Couldn't read this address. Check it and try again.", code: "address", parsed: null },
        { status: 400 },
      );
    }
  }

  try {
    const label = await buyUpsLabel({
      id: order.id,
      name: order.name,
      email: order.email,
      to,
      shippingMethod: order.shipping_method === "overnight" ? "overnight" : "standard",
    });

    const { error: saveError } = await supabase
      .from("orders")
      .update({
        status: "shipped",
        shipped_at: new Date().toISOString(),
        label_url: label.labelUrl,
        tracking_number: label.trackingNumber,
        tracking_url: label.trackingUrl,
        tracking_carrier: "ups",
      })
      .eq("id", order.id);
    if (saveError) {
      // The label is bought; return it so it can still be printed.
      console.error("label saved to Shippo but not to the order", order.id, saveError.message);
    }

    if (label.trackingNumber) {
      await sendShippingConfirmation(order.email, {
        id: order.id,
        name: order.name,
        tracking_number: label.trackingNumber,
        tracking_url: label.trackingUrl || undefined,
      }).catch(console.error);
      trackOrderShipped({
        id: order.id,
        email: order.email,
        trackingNumber: label.trackingNumber,
        carrier: "UPS",
      }).catch(console.error);
    }

    return NextResponse.json(label);
  } catch (err) {
    if (err instanceof LabelError) {
      return NextResponse.json({ error: err.message, code: err.code, parsed: to }, { status: 400 });
    }
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
