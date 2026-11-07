import type { Metadata } from "next";
import { MerchComingSoon } from "@/components/ComingSoonSections";

export const metadata: Metadata = {
  title: "Merch — Coming Soon | Aurogen Labs",
  description: "Aurogen tees and hoodies are on the way. Join the list to hear when the first drop launches.",
};

export default function MerchPage() {
  return <MerchComingSoon standalone />;
}
