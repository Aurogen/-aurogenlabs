import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ isAdmin: false });
  const user = await currentUser();
  const adminEmail = process.env.ADMIN_EMAIL;
  const isAdmin = !!adminEmail && user?.primaryEmailAddress?.emailAddress === adminEmail;
  return NextResponse.json({ isAdmin });
}
