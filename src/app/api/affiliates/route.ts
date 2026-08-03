import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, website, audience, message } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email required" }, { status: 400 });
    }

    const supabase = getServiceClient();
    const { error } = await supabase.from("affiliate_applications").insert({
      name,
      email,
      website: website ?? null,
      audience: audience ?? null,
      message: message ?? null,
    });

    if (error) {
      console.error("Affiliate insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Affiliates POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
