import { getServiceClient } from "@/lib/supabase-server";
import { sendAdminStockAlert } from "@/lib/email";

/** Units at or below this count trigger a low-stock warning to the admin. */
export const LOW_STOCK_AT = 3;

interface StockRow {
  slug: string;
  name: string;
  concentration: string;
  stock_count: number;
  in_stock: boolean;
}

/**
 * Subtracts the units of a paid order and marks products out of stock at 0.
 * Never throws: a stock problem must not undo a paid order, it is logged and the admin is warned.
 */
export async function takeStock(items: { slug?: string; quantity: number }[]) {
  const lines = items.filter((i) => i.slug && i.quantity > 0).map((i) => ({ slug: i.slug, quantity: i.quantity }));
  if (lines.length === 0) return;

  const { data, error } = await getServiceClient().rpc("decrement_stock", { p_items: lines });
  if (error) {
    console.error("Stock update failed (run supabase/migrations/stock_tracking.sql?):", error.message);
    return;
  }

  const low = ((data ?? []) as StockRow[]).filter((r) => r.stock_count <= LOW_STOCK_AT);
  if (low.length === 0) return;
  try {
    await sendAdminStockAlert(low);
  } catch (err) {
    console.error("Stock alert email error:", err);
  }
}
