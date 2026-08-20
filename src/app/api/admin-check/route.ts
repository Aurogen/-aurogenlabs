import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ loggedIn: false });

  const user = await currentUser();
  const adminEmail = process.env.ADMIN_EMAIL;

  return NextResponse.json({
    loggedIn: true,
    userEmail: user?.primaryEmailAddress?.emailAddress ?? null,
    adminEmailSet: !!adminEmail,
    adminEmailEndsWith: adminEmail ? adminEmail.split("@")[1] : null,
    match: user?.primaryEmailAddress?.emailAddress === adminEmail,
  });
}
