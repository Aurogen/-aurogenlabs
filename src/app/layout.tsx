import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import AgeGate from "@/components/AgeGate";
import Footer from "@/components/Footer";
import RefTracker from "@/components/RefTracker";
import { PostHogProvider } from "@/components/PostHogProvider";
import { CrispChat } from "@/components/CrispChat";
import CookieConsent from "@/components/CookieConsent";

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

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://aurogenlabs.com"),
  title: {
    default: "Aurogen Labs | Premium Peptides for Research",
    template: "%s | Aurogen Labs",
  },
  description:
    "Premium quality research peptides — ≥98% purity, third-party tested, US manufactured. For laboratory and scientific research use only.",
  keywords: ["research peptides", "peptide reagents", "BPC-157", "TB-500", "retatrutide", "tirzepatide", "HPLC-verified", "certificate of analysis", "Aurogen Labs"],
  openGraph: {
    siteName: "Aurogen Labs",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/og.png`,
        width: 1200,
        height: 630,
        alt: "Aurogen Labs — Premium Research Peptides",
      },
    ],
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
    <ClerkProvider>
      <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full`}>
        <body className="min-h-full flex flex-col" style={{ background: "#F5F4F0" }}>
          <PostHogProvider>
            <CartProvider>
              <LanguageProvider>
                <AgeGate />
                <Suspense fallback={null}>
                  <RefTracker />
                </Suspense>
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
                <CartDrawer />
                <CrispChat />
                <CookieConsent />
              </LanguageProvider>
            </CartProvider>
          </PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
