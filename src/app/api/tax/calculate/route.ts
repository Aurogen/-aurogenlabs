import { NextResponse } from "next/server";
import { calculateTax } from "@/lib/taxjar";

export async function POST(req: Request) {
  const { address, items, shipping } = await req.json();

  if (!address?.state || !address?.zip) {
    return NextResponse.json({ tax: null });
  }

  try {
    const tax = await calculateTax(
      {
        street: address.street,
        city: address.city ?? "",
        state: address.state,
        zip: address.zip,
        country: address.country ?? "US",
      },
      items.map((item: { id: string; quantity: number; price: number }) => ({
        id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
      })),
      shipping ?? 0
    );

    return NextResponse.json({
      tax: tax ? {
        amount: tax.amount_to_collect,
        rate: tax.rate,
        hasNexus: tax.has_nexus,
      } : null,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Tax calculation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
