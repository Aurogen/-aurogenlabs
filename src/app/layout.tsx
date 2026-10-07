import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
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
    default: "Aurogen | Performance Nutrition",
    template: "%s | Aurogen Labs",
  },
  description:
    "Aurogen performance nutrition: whey protein isolate, creatine monohydrate, pre-workout, electrolytes, collagen and magnesium. Clean labels, third-party tested.",
  keywords: ["whey protein", "creatine monohydrate", "pre-workout", "electrolytes", "collagen", "magnesium glycinate", "Aurogen"],
  openGraph: {
    siteName: "Aurogen Labs",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider signInUrl="/sign-in" signUpUrl="/sign-up">
      <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full`}>
        <body className="min-h-full flex flex-col" style={{ background: "#F5F4F0" }}>
          {/* Investor preview: no age gate, referral tracking, live chat or analytics. */}
          <CartProvider>
            <LanguageProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <CartDrawer />
              <CookieConsent />
            </LanguageProvider>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
