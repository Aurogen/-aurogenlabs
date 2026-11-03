import Taxjar from "taxjar";

function getClient() {
  const key = process.env.TAXJAR_API_KEY;
  if (!key) throw new Error("TAXJAR_API_KEY is not set");
  return new Taxjar({ apiKey: key });
}

export interface TaxAddress {
  street?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface LineItem {
  id: string;
  quantity: number;
  unit_price: number;
  product_identifier?: string;
}

export async function calculateTax(
  toAddress: TaxAddress,
  lineItems: LineItem[],
  shipping: number
) {
  if (!process.env.TAXJAR_API_KEY) return null;

  const client = getClient();
  const fromState = process.env.SHIPPO_FROM_STATE ?? "FL";
  const fromZip = process.env.SHIPPO_FROM_ZIP ?? "00000";

  try {
    const tax = await client.taxForOrder({
      from_country: "US",
      from_state: fromState,
      from_zip: fromZip,
      to_country: toAddress.country,
      to_state: toAddress.state,
      to_zip: toAddress.zip,
      to_city: toAddress.city,
      to_street: toAddress.street,
      amount: lineItems.reduce((s, i) => s + i.unit_price * i.quantity, 0),
      shipping,
      line_items: lineItems.map((i) => ({
        id: i.id,
        quantity: i.quantity,
        unit_price: i.unit_price,
        product_identifier: i.product_identifier,
        // peptides as research chemicals — exempt from sales tax in most states
        // adjust per product as needed
      })),
    });
    return tax.tax;
  } catch {
    return null;
  }
}

export async function createTransaction(orderId: string, orderData: {
  toAddress: TaxAddress;
  lineItems: LineItem[];
  shipping: number;
  salesTax: number;
  transactionDate: string;
}) {
  if (!process.env.TAXJAR_API_KEY) return;

  const client = getClient();
  const fromState = process.env.SHIPPO_FROM_STATE ?? "FL";
  const fromZip = process.env.SHIPPO_FROM_ZIP ?? "00000";

  try {
    await client.createOrder({
      transaction_id: orderId,
      transaction_date: orderData.transactionDate,
      from_country: "US",
      from_state: fromState,
      from_zip: fromZip,
      to_country: orderData.toAddress.country,
      to_state: orderData.toAddress.state,
      to_zip: orderData.toAddress.zip,
      to_city: orderData.toAddress.city,
      to_street: orderData.toAddress.street,
      amount: orderData.lineItems.reduce((s, i) => s + i.unit_price * i.quantity, 0),
      shipping: orderData.shipping,
      sales_tax: orderData.salesTax,
      line_items: orderData.lineItems.map((i) => ({
        id: i.id,
        quantity: i.quantity,
        unit_price: i.unit_price,
        sales_tax: 0,
      })),
    });
  } catch (err) {
    console.error("TaxJar createTransaction error:", err);
  }
}
