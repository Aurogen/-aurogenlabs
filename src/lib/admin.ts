import { auth, currentUser } from "@clerk/nextjs/server";

export async function isAdmin(): Promise<boolean> {
  const { userId } = await auth();
  if (!userId) return false;
  const user = await currentUser();
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return false;
  return user?.primaryEmailAddress?.emailAddress === adminEmail;
}
