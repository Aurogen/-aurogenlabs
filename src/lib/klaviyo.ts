import { ApiKeySession, EventsApi, ProfilesApi } from "klaviyo-api";

function getSession() {
  return new ApiKeySession(process.env.KLAVIYO_PRIVATE_KEY!);
}

// ── Profiles ──────────────────────────────────────────────────────────────

export async function upsertProfile(email: string, name?: string) {
  if (!process.env.KLAVIYO_PRIVATE_KEY) return;
  try {
    const api = new ProfilesApi(getSession());
    await api.createOrUpdateProfile({
      data: {
        type: "profile",
        attributes: {
          email,
          firstName: name?.split(" ")[0],
          lastName: name?.split(" ").slice(1).join(" ") || undefined,
        },
      },
    });
  } catch (err) {
    console.error("Klaviyo upsertProfile error:", err);
  }
}

// ── Events ────────────────────────────────────────────────────────────────

export async function trackEvent(
  event: string,
  email: string,
  properties: Record<string, unknown>
) {
  if (!process.env.KLAVIYO_PRIVATE_KEY) return;
  try {
    const api = new EventsApi(getSession());
    await api.createEvent({
      data: {
        type: "event",
        attributes: {
          metric: { data: { type: "metric", attributes: { name: event } } },
          profile: {
            data: { type: "profile", attributes: { email } },
          },
          properties,
          time: new Date(),
        },
      },
    });
  } catch (err) {
    console.error("Klaviyo trackEvent error:", err);
  }
}

// ── Convenience wrappers ──────────────────────────────────────────────────

export async function trackOrderPlaced(order: {
  id: string;
  email: string;
  name: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
}) {
  await upsertProfile(order.email, order.name);
  await trackEvent("Placed Order", order.email, {
    order_id: order.id,
    value: order.total,
    items: order.items,
  });
}

export async function trackOrderShipped(order: {
  id: string;
  email: string;
  trackingNumber: string;
  carrier: string;
}) {
  await trackEvent("Order Shipped", order.email, {
    order_id: order.id,
    tracking_number: order.trackingNumber,
    carrier: order.carrier,
  });
}
