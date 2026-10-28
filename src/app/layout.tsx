import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
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


export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://aurogenlabs.com"),
  title: {
    default: "Aurogen Labs | Performance Nutrition",
    template: "%s | Aurogen Labs",
  },
  description:
    "Aurogen performance nutrition: whey protein isolate, creatine monohydrate, pre-workout, electrolytes, collagen and magnesium. Full-dose, clean-label formulas, every batch third-party tested.",
  keywords: ["whey protein isolate", "creatine monohydrate", "pre-workout", "electrolytes", "collagen", "magnesium glycinate", "sports nutrition", "supplements", "Aurogen Labs"],
  openGraph: {
    siteName: "Aurogen Labs",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/og.png`,
        width: 1200,
        height: 630,
        alt: "Aurogen Labs — Performance Nutrition",
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
    <ClerkProvider signInUrl="/sign-in" signUpUrl="/sign-up">
      <html lang="en" className={`${cormorant.variable} ${dmSans.variable} h-full`}>
        <body className="min-h-full flex flex-col" style={{ background: "#F5F4F0" }}>
          <PostHogProvider>
            <CartProvider>
              <LanguageProvider>
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
