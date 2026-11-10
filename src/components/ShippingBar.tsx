"use client";

import { Truck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { FLAT_SHIPPING, FREE_SHIPPING_MIN } from "@/lib/shipping";

/** Thin bar above the header on every page: the free-shipping threshold and the carrier. */
export default function ShippingBar() {
  const { t } = useLanguage();
  return (
    <div className="w-full text-center text-[12px] sm:text-[13px] py-2 px-4" style={{ background: "#16264A", color: "#FFFFFF" }}>
      <Truck className="inline-block w-3.5 h-3.5 mr-1.5 -mt-0.5" aria-hidden="true" />
      {t(`Free UPS shipping on orders of $${FREE_SHIPPING_MIN} or more`, `Envío gratis por UPS en compras de $${FREE_SHIPPING_MIN} o más`)}
      <span className="hidden sm:inline">
        {t(` · $${FLAT_SHIPPING.toFixed(2)} below that`, ` · $${FLAT_SHIPPING.toFixed(2)} por debajo de ese monto`)}
      </span>
    </div>
  );
}
