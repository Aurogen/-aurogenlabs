import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { notifyWaitlist } from "@/lib/waitlist";

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { product_name } = await req.json() as { product_name: string };
  if (!product_name) {
    return NextResponse.json({ error: "product_name required" }, { status: 400 });
  }

  try {
    const result = await notifyWaitlist(product_name);
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
