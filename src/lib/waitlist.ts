import { getServiceClient } from "@/lib/supabase-server";
import { sendWaitlistRestock } from "@/lib/email";

// Emails everyone waiting on a product, then removes them so a later restock doesn't re-send.
export async function notifyWaitlist(productName: string) {
  const supabase = getServiceClient();
  const { data: entries, error } = await supabase
    .from("waitlist")
    .select("id, email")
    .eq("product_name", productName);

  if (error) throw new Error(error.message);

  const notifiedIds: string[] = [];
  let failed = 0;
  for (const entry of entries ?? []) {
    try {
      await sendWaitlistRestock(entry.email, productName);
      notifiedIds.push(entry.id);
    } catch (err) {
      console.error("Waitlist restock email error:", err);
      failed++;
    }
  }

  if (notifiedIds.length > 0) {
    await supabase.from("waitlist").delete().in("id", notifiedIds);
  }

  return { sent: notifiedIds.length, failed, total: entries?.length ?? 0 };
}
