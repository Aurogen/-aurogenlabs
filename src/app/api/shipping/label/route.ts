import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { createLabel } from "@/lib/shippo";
import { getServiceClient } from "@/lib/supabase-server";
import { trackOrderShipped } from "@/lib/klaviyo";

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { orderId, rateObjectId } = await req.json();
  if (!orderId || !rateObjectId) {
    return NextResponse.json({ error: "orderId and rateObjectId required" }, { status: 400 });
  }

  try {
    const transaction = await createLabel(rateObjectId);

    if (transaction.status !== "SUCCESS") {
      return NextResponse.json({ error: "Label creation failed", details: transaction.messages }, { status: 500 });
    }

    const supabase = getServiceClient();
    const { data: order } = await supabase
      .from("orders")
      .update({
        status: "shipped",
        tracking_number: transaction.trackingNumber,
        tracking_carrier: transaction.trackingUrlProvider,
        label_url: transaction.labelUrl,
      })
      .eq("id", orderId)
      .select("email")
      .maybeSingle();

    if (order?.email && transaction.trackingNumber) {
      trackOrderShipped({
        id: orderId,
        email: order.email,
        trackingNumber: transaction.trackingNumber,
        carrier: transaction.trackingUrlProvider ?? "",
      }).catch(console.error);
    }

    return NextResponse.json({
      labelUrl: transaction.labelUrl,
      trackingNumber: transaction.trackingNumber,
      trackingUrl: transaction.trackingUrlProvider,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
