import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) {
    return new NextResponse("Email required", { status: 400 });
  }

  const supabase = getServiceClient();
  await supabase.from("newsletter").delete().eq("email", email);

  return new NextResponse(
    `<!DOCTYPE html><html><body style="font-family:sans-serif;text-align:center;padding:60px 20px;">
      <h2 style="color:#1D1D1F;">Unsubscribed</h2>
      <p style="color:#6E6E73;">You have been removed from the Aurogen Labs mailing list.</p>
      <a href="/" style="color:#1D1D1F;">← Back to site</a>
    </body></html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}
