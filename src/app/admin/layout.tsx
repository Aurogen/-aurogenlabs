import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Aurogen Labs",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  const adminEmail = process.env.ADMIN_EMAIL;

  const userEmail = user?.primaryEmailAddress?.emailAddress;
  if (!adminEmail || userEmail !== adminEmail) {
    redirect(`/?admin_debug=${encodeURIComponent(userEmail ?? "no-email")}&expected=${encodeURIComponent(adminEmail ?? "not-set")}`);
  }

  return <>{children}</>;
}
