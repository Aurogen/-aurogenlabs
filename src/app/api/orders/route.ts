import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, date, name, email, address, items, total, status } = body;

    if (!id || !email || !items || !total) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = getServiceClient();
    const { error } = await supabase.from("orders").insert({
      id,
      created_at: date,
      name,
      email,
      address,
      items,
      total,
      status: status ?? "processing",
    });

    if (error) {
      console.error("Order insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("Order POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("email", email)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Orders fetch error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const orders = (data ?? []).map((row) => ({
      id: row.id,
      date: row.created_at,
      name: row.name,
      email: row.email,
      items: row.items,
      total: row.total,
      status: row.status,
    }));

    return NextResponse.json({ orders });
  } catch (err) {
    console.error("Orders GET error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
