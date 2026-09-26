import { NextResponse } from "next/server";
import { getRates } from "@/lib/shippo";

export async function POST(req: Request) {
  const { address, parcel } = await req.json();

  if (!address?.zip || !address?.state) {
    return NextResponse.json({ error: "Address required" }, { status: 400 });
  }

  try {
    const rates = await getRates(
      {
        name: address.name ?? "Customer",
        street1: address.street ?? "",
        city: address.city ?? "",
        state: address.state,
        zip: address.zip,
        country: address.country ?? "US",
      },
      parcel ?? {
        length: "6",
        width: "4",
        height: "2",
        distanceUnit: "in",
        weight: "0.5",
        massUnit: "lb",
      }
    );

    const simplified = rates.map((r: Record<string, unknown>) => ({
      objectId: r.objectId,
      provider: r.provider,
      servicelevel: (r.servicelevel as Record<string, unknown>)?.name,
      amount: r.amount,
      currency: r.currency,
      estimatedDays: r.estimatedDays,
    }));

    return NextResponse.json({ rates: simplified });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Shipping unavailable";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
