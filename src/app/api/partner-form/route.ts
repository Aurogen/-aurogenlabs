import { NextResponse } from "next/server";
import { loadPartnerForm } from "@/lib/partner-form-server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ form: await loadPartnerForm() });
}
