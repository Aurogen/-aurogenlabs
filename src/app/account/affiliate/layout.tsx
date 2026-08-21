import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Portal",
  description: "Track your referral link, commissions, and referred orders in your Aurogen Labs affiliate dashboard.",
};

export default function AffiliateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
