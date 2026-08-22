const BASE = "https://api.whop.com";

function whopHeaders() {
  return {
    Authorization: `Bearer ${process.env.WHOP_API_KEY}`,
    "Content-Type": "application/json",
  };
}

export async function whopCreateProduct(opts: {
  name: string;
  headline?: string;
  image_url?: string | null;
}): Promise<{ id: string }> {
  const body: Record<string, unknown> = {
    name: opts.name,
    headline: (opts.headline ?? opts.name).slice(0, 200),
    visibility: "visible",
  };
  if (opts.image_url) body.image_url = opts.image_url;

  const res = await fetch(`${BASE}/api/v2/products`, {
    method: "POST",
    headers: whopHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Whop create product failed (${res.status}): ${text}`);
  }
  return res.json();
}

export async function whopCreatePlan(opts: {
  product_id: string;
  price_cents: number;
}): Promise<{ id: string }> {
  const res = await fetch(`${BASE}/api/v2/plans`, {
    method: "POST",
    headers: whopHeaders(),
    body: JSON.stringify({
      product_id: opts.product_id,
      plan_type: "one_time",
      initial_price: opts.price_cents,
      currency: "usd",
      unlimited: true,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Whop create plan failed (${res.status}): ${text}`);
  }
  return res.json();
}

export function whopCheckoutUrl(
  planOrProductId: string,
  redirectUrl?: string
): string {
  const url = new URL(`https://whop.com/checkout/${planOrProductId}/`);
  if (redirectUrl) url.searchParams.set("redirect_url", redirectUrl);
  return url.toString();
}
