"use client";

import { Tag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { FIRST_ORDER_PCT, AFFILIATE_DEFAULT_PCT } from "@/lib/promos";

/** Tells shoppers about the store discounts before checkout (where they are applied). */
export default function PromoHint({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();

  return (
    <div
      className={`rounded-xl ${compact ? "px-3 py-2.5" : "px-4 py-3"} text-left`}
      style={{ background: "#FFFFFF", border: "1px solid rgba(22,38,74,0.15)" }}
    >
      <p className="flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: "#16264A" }}>
        <Tag className="w-3.5 h-3.5" aria-hidden="true" />
        {t("Discounts", "Descuentos")}
      </p>
      <ul className="mt-1.5 space-y-1 text-[12.5px]" style={{ color: "#3A3A3F" }}>
        <li>{t(`${FIRST_ORDER_PCT}% off your first order`, `${FIRST_ORDER_PCT}% en tu primera compra`)}</li>
        <li>{t(`${AFFILIATE_DEFAULT_PCT}% off with an affiliate code`, `${AFFILIATE_DEFAULT_PCT}% con código de afiliado`)}</li>
      </ul>
      <p className="mt-1.5 text-[11.5px]" style={{ color: "#6E6E73" }}>
        {t("One discount per order, chosen at checkout.", "Un descuento por compra, se elige al pagar.")}
      </p>
    </div>
  );
}
