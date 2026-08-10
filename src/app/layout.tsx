import type { Metadata } from "next";
import { Rajdhani, Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
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
    <ClerkProvider afterSignOutUrl="/" signInUrl="/sign-in" signUpUrl="/sign-up">
      <html lang="en" className={`${rajdhani.variable} ${inter.variable} h-full`}>
        <body className="min-h-full flex flex-col" style={{ background: "#000000" }}>
          <CartProvider>
            <AgeGate />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
