import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { syncInventoryFromQuickBooks } from "@/lib/quickbooks";

export async function POST() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await syncInventoryFromQuickBooks();
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
