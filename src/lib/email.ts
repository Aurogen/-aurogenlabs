import { Resend } from "resend";

const FROM = process.env.EMAIL_FROM ?? "onboarding@resend.dev";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

interface OrderItem {
  name: string;
  concentration?: string;
  quantity: number;
  price: number;
}

/* ── Shared layout helpers ── */
const BODY = `margin:0;padding:0;background:#F6F6F8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;`;
const WRAP = `max-width:580px;margin:0 auto;padding:40px 20px;`;
const LOGO = `
  <div style="text-align:center;margin-bottom:32px;">
    <div style="display:inline-block;padding:8px 0;">
      <span style="font-weight:800;font-size:18px;letter-spacing:4px;color:#1D1D1F;">AUROGEN</span><span style="font-weight:800;font-size:11px;letter-spacing:5px;color:#0A84FF;margin-left:6px;">LABS</span>
    </div>
  </div>`;
const FOOTER = `
  <div style="text-align:center;padding-top:24px;border-top:1px solid rgba(0,0,0,0.07);margin-top:8px;">
    <p style="color:#9E9EA8;font-size:11px;margin:0;">© 2025 Aurogen Labs · For research use only</p>
  </div>`;

/* ── Order Confirmation ── */
export async function sendOrderConfirmation(to: string, order: {
  id: string;
  name: string;
  items: OrderItem[];
  total: number;
  address: string;
}) {
  const itemRows = order.items.map((i) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid rgba(0,0,0,0.06);color:#1D1D1F;font-size:14px;">
        ${i.name}${i.concentration ? ` · ${i.concentration}` : ""}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid rgba(0,0,0,0.06);color:#6E6E73;font-size:14px;text-align:center;">
        ×${i.quantity}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid rgba(0,0,0,0.06);color:#1D1D1F;font-size:14px;text-align:right;font-weight:600;">
        $${(i.price * i.quantity).toFixed(2)}
      </td>
    </tr>
  `).join("");

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="${BODY}">
  <div style="${WRAP}">
    ${LOGO}

    <div style="text-align:center;margin-bottom:28px;">
      <div style="display:inline-block;background:rgba(27,122,69,0.08);border:1px solid rgba(27,122,69,0.2);border-radius:50%;padding:16px;margin-bottom:16px;">
        <span style="font-size:28px;">✓</span>
      </div>
      <h1 style="color:#1D1D1F;font-size:26px;font-weight:800;margin:0 0 8px;">Order Confirmed</h1>
      <p style="color:#6E6E73;font-size:14px;margin:0;">Your research compounds are being prepared for shipment.</p>
    </div>

    <div style="background:#FFFFFF;border:1px solid rgba(0,0,0,0.08);border-radius:16px;overflow:hidden;margin-bottom:16px;">
      <div style="padding:14px 20px;border-bottom:1px solid rgba(0,0,0,0.06);display:flex;justify-content:space-between;align-items:center;">
        <span style="color:#6E6E73;font-size:13px;">Order</span>
        <span style="color:#0A84FF;font-family:monospace;font-weight:700;font-size:14px;">#${order.id}</span>
      </div>
      <div style="padding:16px 20px;">
        <table style="width:100%;border-collapse:collapse;">
          ${itemRows}
          <tr>
            <td colspan="2" style="padding:10px 0 4px;color:#6E6E73;font-size:13px;">Shipping</td>
            <td style="padding:10px 0 4px;color:#1B7A45;font-size:13px;text-align:right;font-weight:600;">FREE</td>
          </tr>
          <tr>
            <td colspan="2" style="padding:4px 0;color:#1D1D1F;font-size:16px;font-weight:700;">Total</td>
            <td style="padding:4px 0;color:#1D1D1F;font-size:20px;font-weight:800;text-align:right;">$${order.total.toFixed(2)}</td>
          </tr>
        </table>
      </div>
    </div>

    <div style="background:#FFFFFF;border:1px solid rgba(0,0,0,0.08);border-radius:12px;padding:16px 20px;margin-bottom:16px;">
      <p style="color:#1D1D1F;font-weight:600;font-size:13px;margin:0 0 4px;">Estimated Delivery</p>
      <p style="color:#6E6E73;font-size:13px;margin:0 0 6px;">2–5 business days · Ships from US</p>
      <p style="color:#9E9EA8;font-size:12px;margin:0;">Shipping to: ${order.address}</p>
    </div>

    <div style="background:rgba(234,179,8,0.06);border:1px solid rgba(234,179,8,0.2);border-radius:10px;padding:12px 16px;margin-bottom:24px;">
      <p style="color:#9A6400;font-size:11px;margin:0;">For Research Use Only · Not for Human Consumption · Not a drug or supplement</p>
    </div>

    ${FOOTER}
  </div>
</body></html>`;

  return getResend().emails.send({
    from: FROM,
    to,
    subject: `Order Confirmed #${order.id} — Aurogen Labs`,
    html,
  });
}

/* ── Newsletter Welcome ── */
export async function sendNewsletterWelcome(to: string) {
  const unsubUrl = `https://aurogenlabs.com/api/newsletter/unsubscribe?email=${encodeURIComponent(to)}`;
  const html = `<!DOCTYPE html><html><body style="${BODY}">
  <div style="${WRAP}text-align:center;">
    ${LOGO}
    <h1 style="color:#1D1D1F;font-size:24px;font-weight:800;margin:0 0 12px;">You&apos;re on the list</h1>
    <p style="color:#6E6E73;font-size:15px;line-height:1.6;margin:0 0 28px;">
      Expect new peptides, research protocols, and exclusive offers — no spam, ever.
    </p>
    <a href="https://aurogenlabs.com/shop" style="display:inline-block;background:#0A84FF;color:#ffffff;font-weight:700;font-size:14px;letter-spacing:0.5px;padding:14px 32px;border-radius:100px;text-decoration:none;">Browse Compounds</a>
    <p style="color:#9E9EA8;font-size:11px;margin:28px 0 0;">© 2025 Aurogen Labs · <a href="${unsubUrl}" style="color:#9E9EA8;">Unsubscribe</a></p>
  </div>
</body></html>`;

  return getResend().emails.send({
    from: FROM,
    to,
    subject: "Welcome to Aurogen Labs — You're on the list",
    html,
  });
}

/* ── Waitlist Confirmation ── */
export async function sendWaitlistConfirmation(to: string, productName: string) {
  const html = `<!DOCTYPE html><html><body style="${BODY}">
  <div style="${WRAP}text-align:center;">
    ${LOGO}
    <h1 style="color:#1D1D1F;font-size:24px;font-weight:800;margin:0 0 12px;">You&apos;re on the waitlist</h1>
    <div style="background:#FFFFFF;border:1px solid rgba(0,0,0,0.08);border-radius:12px;padding:16px;margin:0 0 20px;">
      <p style="color:#0A84FF;font-weight:600;font-size:15px;margin:0;">${productName}</p>
      <p style="color:#9E9EA8;font-size:12px;margin:4px 0 0;">Out of stock · You&apos;ll be notified first when it&apos;s back</p>
    </div>
    <p style="color:#6E6E73;font-size:14px;line-height:1.6;margin:0 0 24px;">
      We&apos;ll email you the moment this compound is back in stock.
    </p>
    <a href="https://aurogenlabs.com/shop" style="display:inline-block;background:#0A84FF;color:#ffffff;font-weight:700;font-size:14px;padding:14px 32px;border-radius:100px;text-decoration:none;">Browse Similar Compounds</a>
    ${FOOTER}
  </div>
</body></html>`;

  return getResend().emails.send({
    from: FROM,
    to,
    subject: `Back in stock alert set — ${productName}`,
    html,
  });
}

/* ── Admin Order Notification ── */
export async function sendAdminOrderNotification(order: {
  id: string;
  name: string;
  email: string;
  address: string;
  items: OrderItem[];
  total: number;
}) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return;

  const itemLines = order.items
    .map((i) => `${i.name} ${i.concentration ?? ""} ×${i.quantity} — $${(i.price * i.quantity).toFixed(2)}`)
    .join("<br>");

  const html = `<!DOCTYPE html><html>
<body style="font-family:sans-serif;background:#F6F6F8;padding:20px;">
  <div style="max-width:500px;margin:0 auto;background:#fff;border-radius:12px;padding:24px;border:1px solid rgba(0,0,0,0.08);">
    <h2 style="margin:0 0 16px;color:#1D1D1F;">New Order — #${order.id}</h2>
    <p style="color:#1D1D1F;"><strong>Customer:</strong> ${order.name} (${order.email})</p>
    <p style="color:#1D1D1F;"><strong>Ship to:</strong> ${order.address}</p>
    <p style="color:#1D1D1F;"><strong>Items:</strong><br>${itemLines}</p>
    <p style="font-size:18px;font-weight:700;border-top:1px solid rgba(0,0,0,0.08);padding-top:12px;margin-top:12px;color:#1B7A45;">
      Total: $${order.total.toFixed(2)}
    </p>
    <p style="color:#9E9EA8;font-size:12px;">Aurogen Labs — Internal notification</p>
  </div>
</body></html>`;

  return getResend().emails.send({
    from: FROM,
    to: adminEmail,
    subject: `New order #${order.id} — $${order.total.toFixed(2)} — ${order.name}`,
    html,
  });
}

/* ── Waitlist Restock ── */
export async function sendWaitlistRestock(to: string, productName: string) {
  const html = `<!DOCTYPE html><html><body style="${BODY}">
  <div style="${WRAP}text-align:center;">
    ${LOGO}
    <h1 style="color:#1D1D1F;font-size:24px;font-weight:800;margin:0 0 12px;">Back in Stock</h1>
    <div style="background:#FFFFFF;border:1px solid rgba(0,0,0,0.08);border-radius:12px;padding:20px;margin:0 0 20px;">
      <p style="color:#0A84FF;font-weight:700;font-size:18px;margin:0 0 6px;">${productName}</p>
      <p style="color:#9E9EA8;font-size:13px;margin:0;">Available now — limited stock</p>
    </div>
    <p style="color:#6E6E73;font-size:15px;line-height:1.6;margin:0 0 28px;">
      You&apos;re one of the first to know. Don&apos;t wait — stock goes fast.
    </p>
    <a href="https://aurogenlabs.com/shop" style="display:inline-block;background:#0A84FF;color:#ffffff;font-weight:700;font-size:14px;padding:14px 32px;border-radius:100px;text-decoration:none;">Order Now</a>
    <p style="color:#9E9EA8;font-size:11px;margin:28px 0 0;">© 2025 Aurogen Labs · You received this because you joined the waitlist.</p>
  </div>
</body></html>`;

  return getResend().emails.send({
    from: FROM,
    to,
    subject: `${productName} is back in stock — Aurogen Labs`,
    html,
  });
}

/* ── Affiliate Approved ── */
export async function sendAffiliateApproved(to: string, name: string) {
  const html = `<!DOCTYPE html><html><body style="${BODY}">
  <div style="${WRAP}text-align:center;">
    ${LOGO}
    <h1 style="color:#1D1D1F;font-size:24px;font-weight:800;margin:0 0 12px;">You&apos;re approved</h1>
    <p style="color:#6E6E73;font-size:15px;line-height:1.6;margin:0 0 20px;">
      Congrats ${name}! Your Aurogen Labs affiliate application has been approved.
    </p>
    <div style="background:#FFFFFF;border:1px solid rgba(0,0,0,0.08);border-radius:12px;padding:20px;margin:0 0 24px;text-align:left;">
      <p style="color:#1D1D1F;font-weight:600;font-size:14px;margin:0 0 12px;">What&apos;s next:</p>
      <p style="color:#6E6E73;font-size:13px;margin:0 0 8px;">✓ &nbsp;We&apos;ll send your unique affiliate link &amp; coupon code within 24 hours</p>
      <p style="color:#6E6E73;font-size:13px;margin:0 0 8px;">✓ &nbsp;Earn 20% commission on every referred sale</p>
      <p style="color:#6E6E73;font-size:13px;margin:0;">✓ &nbsp;Real-time dashboard to track your conversions</p>
    </div>
    ${FOOTER}
  </div>
</body></html>`;

  return getResend().emails.send({
    from: FROM,
    to,
    subject: "Affiliate application approved — Aurogen Labs",
    html,
  });
}

/* ── Affiliate Rejected ── */
export async function sendAffiliateRejected(to: string, name: string) {
  const html = `<!DOCTYPE html><html><body style="${BODY}">
  <div style="${WRAP}text-align:center;">
    ${LOGO}
    <h1 style="color:#1D1D1F;font-size:24px;font-weight:800;margin:0 0 12px;">Application Update</h1>
    <p style="color:#6E6E73;font-size:15px;line-height:1.6;margin:0 0 20px;">
      Hi ${name}, thank you for your interest in the Aurogen Labs Affiliate Program.
    </p>
    <div style="background:#FFFFFF;border:1px solid rgba(0,0,0,0.08);border-radius:12px;padding:20px;margin:0 0 24px;">
      <p style="color:#6E6E73;font-size:14px;margin:0;line-height:1.6;">
        After reviewing your application, we&apos;re unable to move forward at this time. We appreciate your interest and encourage you to re-apply in the future.
      </p>
    </div>
    <a href="https://aurogenlabs.com/shop" style="display:inline-block;background:#1D1D1F;color:#ffffff;font-weight:700;font-size:14px;padding:14px 32px;border-radius:100px;text-decoration:none;">Browse Compounds</a>
    ${FOOTER}
  </div>
</body></html>`;

  return getResend().emails.send({
    from: FROM,
    to,
    subject: "Affiliate application update — Aurogen Labs",
    html,
  });
}

/* ── Shipping Confirmation ── */
export async function sendShippingConfirmation(to: string, order: {
  id: string;
  name: string;
  tracking_number: string;
  tracking_url?: string;
}) {
  const trackingSection = order.tracking_url
    ? `<a href="${order.tracking_url}" style="display:inline-block;background:#0A84FF;color:#ffffff;font-weight:700;font-size:14px;padding:14px 32px;border-radius:100px;text-decoration:none;margin-top:16px;">Track Your Order</a>`
    : `<p style="color:#1D1D1F;font-size:14px;margin:16px 0 0;">Tracking #: <span style="color:#0A84FF;font-weight:700;font-family:monospace;">${order.tracking_number}</span></p>`;

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="${BODY}">
  <div style="${WRAP}text-align:center;">
    ${LOGO}

    <h1 style="color:#1D1D1F;font-size:26px;font-weight:800;margin:0 0 8px;">Your Order Shipped</h1>
    <p style="color:#6E6E73;font-size:14px;margin:0 0 28px;">Your research compounds are on the way.</p>

    <div style="background:#FFFFFF;border:1px solid rgba(0,0,0,0.08);border-radius:16px;padding:24px;margin-bottom:16px;">
      <p style="color:#6E6E73;font-size:13px;margin:0 0 6px;">Order</p>
      <p style="color:#0A84FF;font-family:monospace;font-weight:700;font-size:18px;margin:0 0 20px;">#${order.id}</p>
      <div style="background:#F6F6F8;border:1px solid rgba(0,0,0,0.08);border-radius:10px;padding:16px;">
        <p style="color:#9E9EA8;font-size:11px;margin:0 0 4px;text-transform:uppercase;letter-spacing:1px;">Tracking Number</p>
        <p style="color:#1D1D1F;font-family:monospace;font-weight:700;font-size:16px;margin:0;">${order.tracking_number}</p>
      </div>
      ${trackingSection}
    </div>

    ${FOOTER}
  </div>
</body></html>`;

  return getResend().emails.send({
    from: FROM,
    to,
    subject: `Your order #${order.id} has shipped — Aurogen Labs`,
    html,
  });
}

/* ── Affiliate Received ── */
export async function sendAffiliateReceived(to: string, name: string) {
  const html = `<!DOCTYPE html><html><body style="${BODY}">
  <div style="${WRAP}text-align:center;">
    ${LOGO}
    <h1 style="color:#1D1D1F;font-size:24px;font-weight:800;margin:0 0 12px;">Application Received</h1>
    <p style="color:#6E6E73;font-size:15px;line-height:1.6;margin:0 0 20px;">
      Hi ${name}, thanks for applying to the Aurogen Labs Affiliate Program.
    </p>
    <div style="background:#FFFFFF;border:1px solid rgba(0,0,0,0.08);border-radius:12px;padding:20px;margin:0 0 24px;text-align:left;">
      <p style="color:#1D1D1F;font-weight:600;font-size:14px;margin:0 0 12px;">What happens next:</p>
      <p style="color:#6E6E73;font-size:13px;margin:0 0 8px;">✓ &nbsp;Our team reviews your application within 24–48 hours</p>
      <p style="color:#6E6E73;font-size:13px;margin:0 0 8px;">✓ &nbsp;You&apos;ll receive your unique affiliate link and coupon code</p>
      <p style="color:#6E6E73;font-size:13px;margin:0;">✓ &nbsp;Earn up to 20% commission on every referred sale</p>
    </div>
    ${FOOTER}
  </div>
</body></html>`;

  return getResend().emails.send({
    from: FROM,
    to,
    subject: "Affiliate application received — Aurogen Labs",
    html,
  });
}
