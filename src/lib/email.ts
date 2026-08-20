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

export async function sendOrderConfirmation(to: string, order: {
  id: string;
  name: string;
  items: OrderItem[];
  total: number;
  address: string;
}) {
  const itemRows = order.items.map((i) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #1a2e4a;color:#cbd5e1;font-size:14px;">
        ${i.name} ${i.concentration ? `· ${i.concentration}` : ""}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #1a2e4a;color:#cbd5e1;font-size:14px;text-align:right;">
        ×${i.quantity}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #1a2e4a;color:#ffffff;font-size:14px;text-align:right;font-weight:600;">
        $${(i.price * i.quantity).toFixed(2)}
      </td>
    </tr>
  `).join("");

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#020810;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:580px;margin:0 auto;padding:40px 20px;">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;background:linear-gradient(135deg,#1B6BDE,#2B7FEF);border-radius:12px;padding:12px 20px;margin-bottom:16px;">
        <span style="color:#ffffff;font-weight:800;font-size:20px;letter-spacing:3px;">AUROGEN</span>
        <span style="display:block;color:#93c5fd;font-size:9px;letter-spacing:5px;margin-top:2px;">LABS</span>
      </div>
      <h1 style="color:#ffffff;font-size:28px;font-weight:800;margin:0;letter-spacing:2px;">ORDER CONFIRMED</h1>
      <p style="color:#64748b;font-size:14px;margin:8px 0 0;">Your research compounds are being prepared for shipment.</p>
    </div>

    <!-- Order card -->
    <div style="background:#0a1628;border:1px solid rgba(27,107,222,0.2);border-radius:16px;overflow:hidden;margin-bottom:20px;">
      <div style="padding:16px 24px;border-bottom:1px solid #1a2e4a;display:flex;justify-content:space-between;align-items:center;">
        <span style="color:#94a3b8;font-size:13px;">Order</span>
        <span style="color:#4da3ff;font-family:monospace;font-weight:700;font-size:14px;">#${order.id}</span>
      </div>
      <div style="padding:20px 24px;">
        <table style="width:100%;border-collapse:collapse;">
          ${itemRows}
          <tr>
            <td colspan="2" style="padding:12px 0 4px;color:#64748b;font-size:13px;">Shipping</td>
            <td style="padding:12px 0 4px;color:#10b981;font-size:13px;text-align:right;font-weight:600;">FREE</td>
          </tr>
          <tr>
            <td colspan="2" style="padding:4px 0;color:#ffffff;font-size:16px;font-weight:700;">Total</td>
            <td style="padding:4px 0;color:#ffffff;font-size:20px;font-weight:800;text-align:right;">$${order.total.toFixed(2)}</td>
          </tr>
        </table>
      </div>
    </div>

    <!-- Delivery info -->
    <div style="background:rgba(27,107,222,0.06);border:1px solid rgba(27,107,222,0.15);border-radius:12px;padding:16px 20px;margin-bottom:20px;">
      <p style="color:#ffffff;font-weight:600;font-size:14px;margin:0 0 4px;">Estimated Delivery</p>
      <p style="color:#94a3b8;font-size:13px;margin:0 0 8px;">2–5 business days · Ships from US</p>
      <p style="color:#64748b;font-size:12px;margin:0;">Shipping to: ${order.address}</p>
    </div>

    <!-- Disclaimer -->
    <div style="background:rgba(161,130,0,0.04);border:1px solid rgba(161,130,0,0.15);border-radius:10px;padding:12px 16px;margin-bottom:28px;">
      <p style="color:#a16207;font-size:11px;margin:0;">⚠️ For Research Use Only · Not for Human Consumption · Not a drug or supplement</p>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding-top:20px;border-top:1px solid #1a2e4a;">
      <p style="color:#334155;font-size:12px;margin:0;">© 2025 Aurogen Labs · All rights reserved</p>
      <p style="color:#334155;font-size:11px;margin:6px 0 0;">COA Available on every product</p>
    </div>
  </div>
</body>
</html>`;

  return getResend().emails.send({
    from: FROM,
    to,
    subject: `Order Confirmed #${order.id} — Aurogen Labs`,
    html,
  });
}

export async function sendNewsletterWelcome(to: string) {
  const unsubUrl = `https://aurogenlabs.com/api/newsletter/unsubscribe?email=${encodeURIComponent(to)}`;
  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#020810;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 20px;text-align:center;">
    <div style="display:inline-block;background:linear-gradient(135deg,#1B6BDE,#2B7FEF);border-radius:12px;padding:12px 20px;margin-bottom:24px;">
      <span style="color:#ffffff;font-weight:800;font-size:20px;letter-spacing:3px;">AUROGEN</span>
      <span style="display:block;color:#93c5fd;font-size:9px;letter-spacing:5px;margin-top:2px;">LABS</span>
    </div>
    <h1 style="color:#ffffff;font-size:26px;font-weight:800;margin:0 0 12px;letter-spacing:1px;">WELCOME TO THE LOOP</h1>
    <p style="color:#94a3b8;font-size:15px;line-height:1.6;margin:0 0 28px;">
      You're now subscribed to Aurogen Labs updates. Expect new peptides, research protocols, and exclusive offers — no spam, ever.
    </p>
    <a href="https://aurogenlabs.com/shop" style="display:inline-block;background:linear-gradient(135deg,#1B6BDE,#2B7FEF);color:#ffffff;font-weight:700;font-size:14px;letter-spacing:1px;padding:14px 32px;border-radius:10px;text-decoration:none;">BROWSE PEPTIDES →</a>
    <p style="color:#334155;font-size:11px;margin:28px 0 0;">© 2025 Aurogen Labs · <a href="${unsubUrl}" style="color:#475569;">Unsubscribe</a></p>
  </div>
</body>
</html>`;

  return getResend().emails.send({
    from: FROM,
    to,
    subject: "Welcome to Aurogen Labs — You're on the list",
    html,
  });
}

export async function sendWaitlistConfirmation(to: string, productName: string) {
  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#020810;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 20px;text-align:center;">
    <div style="display:inline-block;background:linear-gradient(135deg,#1B6BDE,#2B7FEF);border-radius:12px;padding:12px 20px;margin-bottom:24px;">
      <span style="color:#ffffff;font-weight:800;font-size:20px;letter-spacing:3px;">AUROGEN</span>
      <span style="display:block;color:#93c5fd;font-size:9px;letter-spacing:5px;margin-top:2px;">LABS</span>
    </div>
    <h1 style="color:#ffffff;font-size:26px;font-weight:800;margin:0 0 12px;">YOU'RE ON THE LIST</h1>
    <div style="background:#0a1628;border:1px solid rgba(27,107,222,0.2);border-radius:12px;padding:16px;margin:0 0 20px;">
      <p style="color:#4da3ff;font-weight:600;font-size:15px;margin:0;">${productName}</p>
      <p style="color:#64748b;font-size:12px;margin:4px 0 0;">Out of stock · You'll be notified first when it's back</p>
    </div>
    <p style="color:#94a3b8;font-size:14px;line-height:1.6;margin:0 0 24px;">
      We'll email you the moment this compound is back in stock. You'll be among the first to know.
    </p>
    <a href="https://aurogenlabs.com/shop" style="display:inline-block;background:linear-gradient(135deg,#1B6BDE,#2B7FEF);color:#ffffff;font-weight:700;font-size:14px;letter-spacing:1px;padding:14px 32px;border-radius:10px;text-decoration:none;">BROWSE SIMILAR COMPOUNDS →</a>
    <p style="color:#334155;font-size:11px;margin:28px 0 0;">© 2025 Aurogen Labs</p>
  </div>
</body>
</html>`;

  return getResend().emails.send({
    from: FROM,
    to,
    subject: `Back in stock alert set — ${productName}`,
    html,
  });
}

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

  const html = `
<!DOCTYPE html>
<html>
<body style="font-family:sans-serif;background:#f4f4f4;padding:20px;">
  <div style="max-width:500px;margin:0 auto;background:#fff;border-radius:8px;padding:24px;">
    <h2 style="margin:0 0 16px;color:#1D1D1F;">🛒 New Order — #${order.id}</h2>
    <p><strong>Customer:</strong> ${order.name} (${order.email})</p>
    <p><strong>Ship to:</strong> ${order.address}</p>
    <p><strong>Items:</strong><br>${itemLines}</p>
    <p style="font-size:18px;font-weight:700;border-top:1px solid #eee;padding-top:12px;margin-top:12px;">
      Total: $${order.total.toFixed(2)}
    </p>
    <p style="color:#999;font-size:12px;">Aurogen Labs — Internal notification</p>
  </div>
</body>
</html>`;

  return getResend().emails.send({
    from: FROM,
    to: adminEmail,
    subject: `New order #${order.id} — $${order.total.toFixed(2)} — ${order.name}`,
    html,
  });
}

export async function sendWaitlistRestock(to: string, productName: string) {
  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#020810;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 20px;text-align:center;">
    <div style="display:inline-block;background:linear-gradient(135deg,#1B6BDE,#2B7FEF);border-radius:12px;padding:12px 20px;margin-bottom:24px;">
      <span style="color:#ffffff;font-weight:800;font-size:20px;letter-spacing:3px;">AUROGEN</span>
      <span style="display:block;color:#93c5fd;font-size:9px;letter-spacing:5px;margin-top:2px;">LABS</span>
    </div>
    <h1 style="color:#ffffff;font-size:26px;font-weight:800;margin:0 0 12px;">BACK IN STOCK</h1>
    <div style="background:#0a1628;border:1px solid rgba(27,107,222,0.2);border-radius:12px;padding:20px;margin:0 0 20px;">
      <p style="color:#4da3ff;font-weight:700;font-size:18px;margin:0 0 6px;">${productName}</p>
      <p style="color:#64748b;font-size:13px;margin:0;">Available now — limited stock</p>
    </div>
    <p style="color:#94a3b8;font-size:15px;line-height:1.6;margin:0 0 28px;">
      You're one of the first to know. Don't wait — stock goes fast.
    </p>
    <a href="https://aurogenlabs.com/shop" style="display:inline-block;background:linear-gradient(135deg,#1B6BDE,#2B7FEF);color:#ffffff;font-weight:700;font-size:14px;letter-spacing:1px;padding:14px 32px;border-radius:10px;text-decoration:none;">ORDER NOW →</a>
    <p style="color:#334155;font-size:11px;margin:28px 0 0;">© 2025 Aurogen Labs · You received this because you joined the waitlist.</p>
  </div>
</body>
</html>`;

  return getResend().emails.send({
    from: FROM,
    to,
    subject: `${productName} is back in stock — Aurogen Labs`,
    html,
  });
}

export async function sendAffiliateApproved(to: string, name: string) {
  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#020810;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 20px;text-align:center;">
    <div style="display:inline-block;background:linear-gradient(135deg,#1B6BDE,#2B7FEF);border-radius:12px;padding:12px 20px;margin-bottom:24px;">
      <span style="color:#ffffff;font-weight:800;font-size:20px;letter-spacing:3px;">AUROGEN</span>
      <span style="display:block;color:#93c5fd;font-size:9px;letter-spacing:5px;margin-top:2px;">LABS</span>
    </div>
    <h1 style="color:#ffffff;font-size:26px;font-weight:800;margin:0 0 12px;">YOU'RE APPROVED ✓</h1>
    <p style="color:#94a3b8;font-size:15px;line-height:1.6;margin:0 0 20px;">
      Congrats ${name}! Your Aurogen Labs affiliate application has been approved.
    </p>
    <div style="background:#0a1628;border:1px solid rgba(27,107,222,0.2);border-radius:12px;padding:20px;margin:0 0 24px;text-align:left;">
      <p style="color:#ffffff;font-weight:600;font-size:14px;margin:0 0 12px;">What's next:</p>
      <p style="color:#94a3b8;font-size:13px;margin:0 0 8px;">✓ &nbsp;We'll send your unique affiliate link & coupon code within 24 hours</p>
      <p style="color:#94a3b8;font-size:13px;margin:0 0 8px;">✓ &nbsp;Earn 20% commission on every referred sale</p>
      <p style="color:#94a3b8;font-size:13px;margin:0;">✓ &nbsp;Real-time dashboard to track your conversions</p>
    </div>
    <p style="color:#334155;font-size:11px;margin:0;">© 2025 Aurogen Labs · <a href="https://aurogenlabs.com/affiliates" style="color:#475569;">Affiliate Program</a></p>
  </div>
</body>
</html>`;

  return getResend().emails.send({
    from: FROM,
    to,
    subject: "Affiliate application approved — Aurogen Labs",
    html,
  });
}

export async function sendAffiliateRejected(to: string, name: string) {
  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#020810;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 20px;text-align:center;">
    <div style="display:inline-block;background:linear-gradient(135deg,#1B6BDE,#2B7FEF);border-radius:12px;padding:12px 20px;margin-bottom:24px;">
      <span style="color:#ffffff;font-weight:800;font-size:20px;letter-spacing:3px;">AUROGEN</span>
      <span style="display:block;color:#93c5fd;font-size:9px;letter-spacing:5px;margin-top:2px;">LABS</span>
    </div>
    <h1 style="color:#ffffff;font-size:26px;font-weight:800;margin:0 0 12px;">APPLICATION UPDATE</h1>
    <p style="color:#94a3b8;font-size:15px;line-height:1.6;margin:0 0 20px;">
      Hi ${name}, thank you for your interest in the Aurogen Labs Affiliate Program.
    </p>
    <div style="background:#0a1628;border:1px solid rgba(100,100,100,0.2);border-radius:12px;padding:20px;margin:0 0 24px;">
      <p style="color:#94a3b8;font-size:14px;margin:0;line-height:1.6;">
        After reviewing your application, we're unable to move forward at this time. We appreciate your interest and encourage you to re-apply in the future if your profile changes.
      </p>
    </div>
    <a href="https://aurogenlabs.com/shop" style="display:inline-block;background:linear-gradient(135deg,#1B6BDE,#2B7FEF);color:#ffffff;font-weight:700;font-size:14px;letter-spacing:1px;padding:14px 32px;border-radius:10px;text-decoration:none;">BROWSE COMPOUNDS →</a>
    <p style="color:#334155;font-size:11px;margin:28px 0 0;">© 2025 Aurogen Labs</p>
  </div>
</body>
</html>`;

  return getResend().emails.send({
    from: FROM,
    to,
    subject: "Affiliate application update — Aurogen Labs",
    html,
  });
}

export async function sendShippingConfirmation(to: string, order: {
  id: string;
  name: string;
  tracking_number: string;
  tracking_url?: string;
}) {
  const trackingLink = order.tracking_url
    ? `<a href="${order.tracking_url}" style="display:inline-block;background:linear-gradient(135deg,#1B6BDE,#2B7FEF);color:#ffffff;font-weight:700;font-size:14px;letter-spacing:1px;padding:14px 32px;border-radius:10px;text-decoration:none;margin-top:16px;">TRACK YOUR ORDER →</a>`
    : `<p style="color:#94a3b8;font-size:14px;margin:16px 0 0;">Tracking #: <span style="color:#4da3ff;font-weight:700;font-family:monospace;">${order.tracking_number}</span></p>`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#020810;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:580px;margin:0 auto;padding:40px 20px;">
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;background:linear-gradient(135deg,#1B6BDE,#2B7FEF);border-radius:12px;padding:12px 20px;margin-bottom:16px;">
        <span style="color:#ffffff;font-weight:800;font-size:20px;letter-spacing:3px;">AUROGEN</span>
        <span style="display:block;color:#93c5fd;font-size:9px;letter-spacing:5px;margin-top:2px;">LABS</span>
      </div>
      <h1 style="color:#ffffff;font-size:28px;font-weight:800;margin:0;letter-spacing:2px;">YOUR ORDER SHIPPED</h1>
      <p style="color:#64748b;font-size:14px;margin:8px 0 0;">Your research compounds are on the way.</p>
    </div>

    <div style="background:#0a1628;border:1px solid rgba(27,107,222,0.2);border-radius:16px;padding:24px;margin-bottom:20px;text-align:center;">
      <div style="display:inline-block;background:rgba(10,132,255,0.12);border-radius:50%;padding:16px;margin-bottom:16px;">
        <span style="font-size:32px;">📦</span>
      </div>
      <p style="color:#94a3b8;font-size:14px;margin:0 0 6px;">Order</p>
      <p style="color:#4da3ff;font-family:monospace;font-weight:700;font-size:18px;margin:0 0 20px;">#${order.id}</p>
      <div style="background:#020810;border:1px solid rgba(27,107,222,0.15);border-radius:10px;padding:16px;">
        <p style="color:#64748b;font-size:12px;margin:0 0 4px;text-transform:uppercase;letter-spacing:1px;">Tracking Number</p>
        <p style="color:#ffffff;font-family:monospace;font-weight:700;font-size:16px;margin:0;">${order.tracking_number}</p>
      </div>
      ${trackingLink}
    </div>

    <div style="text-align:center;padding-top:20px;border-top:1px solid #1a2e4a;">
      <p style="color:#334155;font-size:12px;margin:0;">© 2025 Aurogen Labs · All rights reserved</p>
    </div>
  </div>
</body>
</html>`;

  return getResend().emails.send({
    from: FROM,
    to,
    subject: `Your order #${order.id} has shipped — Aurogen Labs`,
    html,
  });
}

export async function sendAffiliateReceived(to: string, name: string) {
  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#020810;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 20px;text-align:center;">
    <div style="display:inline-block;background:linear-gradient(135deg,#1B6BDE,#2B7FEF);border-radius:12px;padding:12px 20px;margin-bottom:24px;">
      <span style="color:#ffffff;font-weight:800;font-size:20px;letter-spacing:3px;">AUROGEN</span>
      <span style="display:block;color:#93c5fd;font-size:9px;letter-spacing:5px;margin-top:2px;">LABS</span>
    </div>
    <h1 style="color:#ffffff;font-size:26px;font-weight:800;margin:0 0 12px;">APPLICATION RECEIVED</h1>
    <p style="color:#94a3b8;font-size:15px;line-height:1.6;margin:0 0 20px;">
      Hi ${name}, thanks for applying to the Aurogen Labs Affiliate Program.
    </p>
    <div style="background:#0a1628;border:1px solid rgba(27,107,222,0.2);border-radius:12px;padding:20px;margin:0 0 24px;text-align:left;">
      <p style="color:#ffffff;font-weight:600;font-size:14px;margin:0 0 12px;">What happens next:</p>
      <p style="color:#94a3b8;font-size:13px;margin:0 0 8px;">✓ &nbsp;Our team reviews your application within 24–48 hours</p>
      <p style="color:#94a3b8;font-size:13px;margin:0 0 8px;">✓ &nbsp;You'll receive your unique affiliate link and coupon code</p>
      <p style="color:#94a3b8;font-size:13px;margin:0;">✓ &nbsp;Earn up to 20% commission on every referred sale</p>
    </div>
    <p style="color:#334155;font-size:11px;margin:0;">© 2025 Aurogen Labs · <a href="https://aurogenlabs.com/affiliates" style="color:#475569;">Affiliate Program</a></p>
  </div>
</body>
</html>`;

  return getResend().emails.send({
    from: FROM,
    to,
    subject: "Affiliate application received — Aurogen Labs",
    html,
  });
}
