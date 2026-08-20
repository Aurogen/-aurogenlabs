import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";
import { isAdmin } from "@/lib/admin";

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
  }

  const slug = (formData.get("slug") as string | null) ?? "product";
  const timestamp = Date.now();
  const filename = `${slug}-coa-${timestamp}.pdf`;

  const supabase = getServiceClient();
  const { error } = await supabase.storage
    .from("coa")
    .upload(filename, file, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: urlData } = supabase.storage.from("coa").getPublicUrl(filename);

  return NextResponse.json({ url: urlData.publicUrl });
}
