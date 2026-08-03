import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Aurogen Labs peptides — quality, ordering, shipping, research use, and more.",
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
