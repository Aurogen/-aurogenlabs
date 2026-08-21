import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";
import { isAdmin } from "@/lib/admin";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Only JPG, PNG, WebP or AVIF images allowed" }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
  }

  const slug = (formData.get("slug") as string | null) ?? "product";
  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = `${slug}-${Date.now()}.${ext}`;

  const supabase = getServiceClient();
  const { error } = await supabase.storage
    .from("product-images")
    .upload(filename, file, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(filename);
  return NextResponse.json({ url: urlData.publicUrl });
}
