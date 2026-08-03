import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Program",
  description: "Join the Aurogen Labs affiliate program. Earn 10–20% commission on every referral. Three tiers: Researcher, Associate, and Elite.",
};

export default function AffiliatesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
