import type { Metadata } from "next";
import { SupplementsComingSoon } from "@/components/ComingSoonSections";

export const metadata: Metadata = {
  title: "Protein & Supplements — Coming Soon | Aurogen Labs",
  description: "Aurogen's protein and sports supplement line is on the way. Join the list to hear when it launches.",
};

export default function SupplementsPage() {
  return <SupplementsComingSoon standalone />;
}
