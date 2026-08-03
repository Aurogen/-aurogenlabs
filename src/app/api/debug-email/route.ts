import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET() {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "onboarding@resend.dev";

  if (!key) {
    return NextResponse.json({ error: "RESEND_API_KEY is not set", key: null });
  }

  const resend = new Resend(key);
  try {
    const result = await resend.emails.send({
      from,
      to: "hola@clippersflow.com",
      subject: "Aurogen Labs — Email test",
      html: "<p>Email test successful.</p>",
    });
    return NextResponse.json({ success: true, keyPrefix: key.slice(0, 8), from, result });
  } catch (err: unknown) {
    return NextResponse.json({
      error: err instanceof Error ? err.message : String(err),
      keyPrefix: key.slice(0, 8),
      from,
    });
  }
}
