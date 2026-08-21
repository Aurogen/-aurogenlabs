import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";
import { isAdmin } from "@/lib/admin";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const supabase = getServiceClient();

  const [{ data: apps, error }, { data: codes }] = await Promise.all([
    supabase
      .from("affiliate_applications")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase.from("affiliate_codes").select("email, code, commission_rate"),
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Map email → code so approved affiliates show their referral code
  const codeByEmail = Object.fromEntries(
    (codes ?? []).map((c) => [c.email, c.code])
  );

  const applications = (apps ?? []).map((a) => ({
    ...a,
    code: codeByEmail[a.email] ?? null,
  }));

  return NextResponse.json({ applications });
}
