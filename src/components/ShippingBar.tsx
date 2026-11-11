"use client";

import { useEffect, useState } from "react";
import { Truck, Tag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { FREE_SHIPPING_MIN } from "@/lib/shipping";
import { FIRST_ORDER_PCT, BUNDLE_PCT, BUNDLE_MIN_UNITS } from "@/lib/promos";

/**
 * Thin bar above the header on every page: discounts and free shipping.
 * Wide screens show everything in one line; phones rotate the messages.
 */
export default function ShippingBar() {
  const { t } = useLanguage();
  const messages = [
    { icon: Tag, text: t(`${FIRST_ORDER_PCT}% off your first order`, `${FIRST_ORDER_PCT}% de descuento en tu primera compra`) },
    { icon: Tag, text: t(`${BUNDLE_PCT}% off ${BUNDLE_MIN_UNITS}+ peptides`, `${BUNDLE_PCT}% al comprar ${BUNDLE_MIN_UNITS}+ péptidos`) },
    { icon: Truck, text: t(`Free UPS shipping on $${FREE_SHIPPING_MIN}+`, `Envío gratis por UPS desde $${FREE_SHIPPING_MIN}`) },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % 3), 4000);
    return () => clearInterval(id);
  }, []);
  const Cur = messages[i].icon;

  return (
    <div className="w-full text-center text-[12px] sm:text-[13px] py-2 px-4" style={{ background: "#16264A", color: "#FFFFFF" }}>
      {/* phones: one message at a time */}
      <p className="md:hidden" aria-live="polite">
        <Cur className="inline-block w-3.5 h-3.5 mr-1.5 -mt-0.5" aria-hidden="true" />
        {messages[i].text}
      </p>
      {/* wide screens: all at once */}
      <p className="hidden md:block">
        {messages.map((m, k) => (
          <span key={k}>
            {k > 0 && <span className="mx-3 opacity-40">|</span>}
            <m.icon className="inline-block w-3.5 h-3.5 mr-1.5 -mt-0.5" aria-hidden="true" />
            {m.text}
          </span>
        ))}
        <span className="mx-3 opacity-40">|</span>
        {t("One discount per order", "Un descuento por compra")}
      </p>
    </div>
  );
}
