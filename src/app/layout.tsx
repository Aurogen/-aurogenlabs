import type { Metadata } from "next";
import { Rajdhani, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import ResearchBanner from "@/components/ResearchBanner";
import AgeGate from "@/components/AgeGate";
import Footer from "@/components/Footer";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aurogen Labs | Premium Peptides for Research",
  description:
    "Premium quality research peptides — pure, tested, trusted. Exclusive for laboratory and scientific research use. Made in USA.",
  keywords: ["peptides", "research peptides", "BPC-157", "semaglutide", "research only", "Aurogen Labs"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rajdhani.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col" style={{ background: "#050D1A" }}>
        <CartProvider>
          <AgeGate />
          <ResearchBanner />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
