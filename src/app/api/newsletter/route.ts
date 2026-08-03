import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";
import { sendNewsletterWelcome } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const supabase = getServiceClient();
    const { error } = await supabase
      .from("newsletter")
      .upsert({ email }, { onConflict: "email", ignoreDuplicates: true });

    if (error) {
      console.error("Newsletter insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Send welcome email (non-blocking)
    sendNewsletterWelcome(email).catch((err) =>
      console.error("Newsletter email error:", err)
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Newsletter POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
