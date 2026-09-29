import { Shippo } from "shippo";

function getClient() {
  const key = process.env.SHIPPO_API_KEY;
  if (!key) throw new Error("SHIPPO_API_KEY is not set");
  return new Shippo({ apiKeyHeader: key });
}

export interface ShipmentAddress {
  name: string;
  street1: string;
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

const FROM_ADDRESS: ShipmentAddress = {
  name: process.env.SHIPPO_FROM_NAME ?? "Aurogen Labs",
  street1: process.env.SHIPPO_FROM_STREET ?? "",
  city: process.env.SHIPPO_FROM_CITY ?? "",
  state: process.env.SHIPPO_FROM_STATE ?? "",
  zip: process.env.SHIPPO_FROM_ZIP ?? "",
  country: "US",
};

export async function getRates(to: ShipmentAddress, parcel: ParcelDimensions) {
  const client = getClient();
  const shipment = await client.shipments.create({
    addressFrom: FROM_ADDRESS as never,
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
    labelFileType: "PDF",
    async: false,
  });
  return transaction;
}

export async function getTracking(carrier: string, trackingNumber: string) {
  const client = getClient();
  return client.trackingStatus.get(carrier, trackingNumber);
}
