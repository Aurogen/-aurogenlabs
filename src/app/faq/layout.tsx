import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Aurogen Labs supplements — creatine, whey isolate, stacking, third-party testing, ordering, shipping, and returns.",
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
