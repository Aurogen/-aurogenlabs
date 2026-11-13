import { Shippo } from "shippo";

function getClient() {
  const key = process.env.SHIPPO_API_KEY;
  if (!key) throw new Error("SHIPPO_API_KEY is not set");
  return new Shippo({ apiKeyHeader: key });
}

export interface ShipmentAddress {
  name: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  email?: string;
  phone?: string;
}

export interface ParcelDimensions {
  length: string;
  width: string;
  height: string;
  distanceUnit: "in" | "cm";
  weight: string;
  massUnit: "lb" | "oz" | "g" | "kg";
}

/** Our return address, printed on every label. Set in Vercel (UPS requires a phone for the sender). */
function fromAddress(): ShipmentAddress {
  return {
    name: process.env.SHIPPO_FROM_NAME ?? "Aurogen Labs",
    street1: process.env.SHIPPO_FROM_STREET ?? "",
    street2: process.env.SHIPPO_FROM_STREET2 || undefined,
    city: process.env.SHIPPO_FROM_CITY ?? "",
    state: process.env.SHIPPO_FROM_STATE ?? "",
    zip: process.env.SHIPPO_FROM_ZIP ?? "",
    country: "US",
    phone: process.env.SHIPPO_FROM_PHONE || undefined,
    email: process.env.SHIPPO_FROM_EMAIL || undefined,
  };
}

/** The box every order ships in, from Vercel env (inches / pounds). */
function defaultParcel(): ParcelDimensions {
  return {
    length: process.env.SHIPPO_PARCEL_LENGTH_IN || "6",
    width: process.env.SHIPPO_PARCEL_WIDTH_IN || "4",
    height: process.env.SHIPPO_PARCEL_HEIGHT_IN || "2",
    distanceUnit: "in",
    weight: process.env.SHIPPO_PARCEL_WEIGHT_LB || "0.5",
    massUnit: "lb",
  };
}

export async function getRates(to: ShipmentAddress, parcel: ParcelDimensions) {
  const client = getClient();
  const shipment = await client.shipments.create({
    addressFrom: fromAddress() as never,
    addressTo: to as never,
    parcels: [parcel as never],
    async: false,
  });
  return shipment.rates ?? [];
}

export async function createLabel(rateObjectId: string) {
  const client = getClient();
  const transaction = await client.transactions.create({
    rate: rateObjectId,
    labelFileType: "PDF_4x6",
    async: false,
  });
  return transaction;
}

export async function getTracking(carrier: string, trackingNumber: string) {
  const client = getClient();
  return client.trackingStatus.get(carrier, trackingNumber);
}

/* ─── UPS labels for orders ─────────────────────────────── */

export interface StreetAddress {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
}

/**
 * Checkout stores the address as "street, city, ST 12345" (the street itself may contain commas,
 * e.g. "12 Main St, Apt 4"). Returns null when it doesn't have that shape.
 */
export function parseOrderAddress(address: string): StreetAddress | null {
  const parts = address.split(",").map((p) => p.trim()).filter(Boolean);
  if (parts.length < 3) return null;
  const m = parts[parts.length - 1].match(/^([A-Za-z]{2})\s+(\d{5}(?:-\d{4})?)$/);
  if (!m) return null;
  const city = parts[parts.length - 2];
  const street = parts.slice(0, -2);
  return {
    street1: street[0],
    street2: street.slice(1).join(", ") || undefined,
    city,
    state: m[1].toUpperCase(),
    zip: m[2],
  };
}

/** Checkout option → UPS service. */
export const UPS_SERVICE = {
  standard: { token: "ups_ground", label: "UPS Ground" },
  overnight: { token: "ups_next_day_air", label: "UPS Next Day Air" },
} as const;

export class LabelError extends Error {
  constructor(message: string, readonly code: "config" | "address" | "rate" | "purchase") {
    super(message);
  }
}

/** Buys a 4×6 UPS label for one order and returns the PDF link and tracking. */
export async function buyUpsLabel(order: {
  id: string;
  name: string;
  email: string;
  to: StreetAddress;
  shippingMethod: "standard" | "overnight";
}) {
  const from = fromAddress();
  if (!from.street1 || !from.city || !from.state || !from.zip || !from.phone) {
    throw new LabelError(
      "Sender address is not set up. Add SHIPPO_FROM_STREET, _CITY, _STATE, _ZIP and _PHONE in Vercel.",
      "config",
    );
  }
  const service = UPS_SERVICE[order.shippingMethod];
  const client = getClient();

  const shipment = await client.shipments.create({
    addressFrom: from as never,
    addressTo: { name: order.name, email: order.email, country: "US", ...order.to } as never,
    parcels: [defaultParcel() as never],
    metadata: order.id,
    async: false,
  });

  const rates = shipment.rates ?? [];
  const rate = rates.find((r) => r.provider?.toUpperCase() === "UPS" && r.servicelevel?.token === service.token);
  if (!rate) {
    const addressProblem = (shipment.messages ?? []).map((m) => m.text).filter(Boolean).join(" ");
    const offered = rates
      .filter((r) => r.provider?.toUpperCase() === "UPS")
      .map((r) => r.servicelevel?.name)
      .filter(Boolean);
    throw new LabelError(
      offered.length
        ? `${service.label} is not available for this address (UPS offers: ${offered.join(", ")}).`
        : `UPS returned no rates for this address. ${addressProblem}`.trim(),
      offered.length ? "rate" : "address",
    );
  }

  const tx = await client.transactions.create({ rate: rate.objectId, labelFileType: "PDF_4x6", async: false });
  if (tx.status !== "SUCCESS" || !tx.labelUrl) {
    const why = (tx.messages ?? []).map((m) => m.text).filter(Boolean).join(" ");
    throw new LabelError(`UPS could not create the label. ${why}`.trim(), "purchase");
  }

  return {
    labelUrl: tx.labelUrl,
    trackingNumber: tx.trackingNumber ?? "",
    trackingUrl: tx.trackingUrlProvider ?? "",
    service: service.label,
    cost: rate.amount,
  };
}
