import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import AgeGate from "@/components/AgeGate";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Aurogen Labs | Premium Peptides for Research",
    template: "%s | Aurogen Labs",
  },
  description:
    "Premium quality research peptides — 99%+ purity, third-party tested, US manufactured. For laboratory and scientific research use only.",
  keywords: ["peptides", "research peptides", "BPC-157", "semaglutide", "TB-500", "IGF-1", "peptide research", "Aurogen Labs"],
  openGraph: {
    siteName: "Aurogen Labs",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col" style={{ background: "#F6F6F8" }}>
        <CartProvider>
          <LanguageProvider>
            <AgeGate />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
          </LanguageProvider>
        </CartProvider>
      </body>
    </html>
  );
}
