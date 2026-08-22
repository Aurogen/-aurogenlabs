/**
 * sync-whop.mjs
 *
 * Crea todos los productos de Supabase en Whop y guarda las URLs de checkout.
 *
 * Uso:
 *   node scripts/sync-whop.mjs
 *
 * Variables de entorno necesarias (en .env.local o exportadas):
 *   WHOP_API_KEY=apik_...
 *   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY=eyJ...
 */

import { createClient } from "@supabase/supabase-js";

const WHOP_KEY = process.env.WHOP_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!WHOP_KEY || !SUPABASE_URL || !SUPABASE_KEY) {
  console.error("❌ Faltan variables de entorno. Necesitas:");
  console.error("   WHOP_API_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function whopHeaders() {
  return {
    Authorization: `Bearer ${WHOP_KEY}`,
    "Content-Type": "application/json",
  };
}

// Intentar crear producto con varios endpoints hasta encontrar el correcto
async function createWhopProduct(name, description, imageUrl) {
  const endpoints = [
    "https://api.whop.com/api/v2/products",
    "https://api.whop.com/v5/products",
  ];

  for (const url of endpoints) {
    const body = {
      name,
      headline: description?.slice(0, 200) ?? name,
      visibility: "visible",
    };
    if (imageUrl) body.image_url = imageUrl;

    const res = await fetch(url, {
      method: "POST",
      headers: whopHeaders(),
      body: JSON.stringify(body),
    });

    const text = await res.text();
    if (res.ok) {
      const data = JSON.parse(text);
      console.log(`   ✅ Producto creado en ${url}: ${data.id}`);
      return data;
    }
    console.log(`   ⚠️  ${url} → ${res.status}: ${text.slice(0, 120)}`);
  }
  throw new Error("Ningún endpoint de Whop funcionó para crear productos");
}

async function createWhopPlan(productId, priceCents) {
  const res = await fetch("https://api.whop.com/api/v2/plans", {
    method: "POST",
    headers: whopHeaders(),
    body: JSON.stringify({
      product_id: productId,
      plan_type: "one_time",
      initial_price: priceCents,
      currency: "usd",
      unlimited: true,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.warn(`   ⚠️  Plan creation failed: ${text.slice(0, 120)}`);
    return null;
  }
  return res.json();
}

async function main() {
  console.log("🔄 Leyendo productos de Supabase...\n");
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("❌ Error leyendo Supabase:", error.message);
    process.exit(1);
  }

  console.log(`📦 ${products.length} productos encontrados\n`);

  for (const p of products) {
    if (p.whop_checkout_url) {
      console.log(`⏭️  ${p.name} ${p.concentration} — ya tiene URL, skip`);
      continue;
    }

    console.log(`→ Sincronizando: ${p.name} ${p.concentration} ($${p.price})`);

    try {
      const whopProduct = await createWhopProduct(
        `${p.name}${p.concentration ? " " + p.concentration : ""}`,
        p.description || p.name,
        p.image
      );

      await createWhopPlan(whopProduct.id, Math.round(Number(p.price) * 100));

      const checkoutUrl = `https://whop.com/checkout/${whopProduct.id}/`;

      const { error: updateErr } = await supabase
        .from("products")
        .update({
          whop_product_id: whopProduct.id,
          whop_checkout_url: checkoutUrl,
        })
        .eq("id", p.id);

      if (updateErr) {
        console.error(`   ❌ Error guardando en Supabase: ${updateErr.message}`);
      } else {
        console.log(`   ✅ Guardado: ${checkoutUrl}`);
      }
    } catch (err) {
      console.error(`   ❌ Error: ${err.message}`);
    }

    // Pequeña pausa para no saturar la API
    await new Promise((r) => setTimeout(r, 400));
  }

  console.log("\n✅ Sincronización completada");
}

main().catch((err) => {
  console.error("Error fatal:", err);
  process.exit(1);
});
