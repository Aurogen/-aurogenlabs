import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";
import { isAdmin } from "@/lib/admin";
import { sendAffiliateApproved, sendAffiliateRejected } from "@/lib/email";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const { status } = await req.json() as { status: "approved" | "rejected" };

  if (status !== "approved" && status !== "rejected") {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const supabase = getServiceClient();

  const { data: app, error: fetchError } = await supabase
    .from("affiliate_applications")
    .select("name, email")
    .eq("id", id)
    .single();

  if (fetchError || !app) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { error: updateError } = await supabase
    .from("affiliate_applications")
    .update({ status })
    .eq("id", id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  try {
    if (status === "approved") {
      await sendAffiliateApproved(app.email, app.name);
    } else {
      await sendAffiliateRejected(app.email, app.name);
    }
  } catch {
    // Email failure doesn't roll back status update
  }

  return NextResponse.json({ ok: true });
}
