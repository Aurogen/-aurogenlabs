import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";
import { isAdmin } from "@/lib/admin";
import { sendWaitlistRestock } from "@/lib/email";

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { product_name } = await req.json() as { product_name: string };
  if (!product_name) {
    return NextResponse.json({ error: "product_name required" }, { status: 400 });
  }

  const supabase = getServiceClient();

  const { data: entries, error } = await supabase
    .from("waitlist")
    .select("email")
    .eq("product_name", product_name);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const emails = entries ?? [];
  let sent = 0;
  let failed = 0;

  for (const entry of emails) {
    try {
      await sendWaitlistRestock(entry.email, product_name);
      sent++;
    } catch {
      failed++;
    }
  }

  return NextResponse.json({ ok: true, sent, failed, total: emails.length });
}
