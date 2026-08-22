import { NextResponse } from "next/server";
import { Resend } from "resend";

const FROM = process.env.EMAIL_FROM ?? "noreply@aurogenlabs.com";

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    return NextResponse.json({ error: "Contact not configured" }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: FROM,
    to: adminEmail,
    replyTo: email,
    subject: `[Contact] ${subject || "General Inquiry"} — ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:500px;padding:24px;background:#fff;border-radius:12px;">
        <h2 style="margin:0 0 16px;color:#1D1D1F;">New Contact Form Submission</h2>
        <p style="color:#1D1D1F;"><strong>Name:</strong> ${name}</p>
        <p style="color:#1D1D1F;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${subject ? `<p style="color:#1D1D1F;"><strong>Subject:</strong> ${subject}</p>` : ""}
        <p style="color:#1D1D1F;"><strong>Message:</strong></p>
        <div style="background:#F6F6F8;border-radius:8px;padding:16px;color:#1D1D1F;white-space:pre-wrap;">${message}</div>
        <p style="color:#9E9EA8;font-size:12px;margin-top:16px;">Aurogen Labs — Contact Form</p>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
