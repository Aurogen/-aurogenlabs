import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const { email, product_name } = await req.json();
    if (!email || !product_name) {
      return NextResponse.json({ error: "Email and product_name required" }, { status: 400 });
    }

    const supabase = getServiceClient();
    const { error } = await supabase
      .from("waitlist")
      .upsert({ email, product_name }, { onConflict: "email,product_name", ignoreDuplicates: true });

    if (error) {
      console.error("Waitlist insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
