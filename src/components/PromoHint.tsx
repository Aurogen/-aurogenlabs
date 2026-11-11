"use client";

import { Tag, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { FIRST_ORDER_PCT, BUNDLE_PCT, BUNDLE_MIN_UNITS, peptideUnits } from "@/lib/promos";

/**
 * Tells shoppers about the store discounts before checkout (where they are applied).
 * With the cart it also shows how close they are to the 4-peptide discount.
 */
export default function PromoHint({ compact = false }: { compact?: boolean }) {
  const { state } = useCart();
  const { t } = useLanguage();
  const units = peptideUnits(state.items.map((i) => ({ slug: i.product.slug, goals: i.product.goals, quantity: i.quantity })));
  const left = Math.max(0, BUNDLE_MIN_UNITS - units);
  const unlocked = left === 0;

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
        <li className="flex items-start gap-1.5">
          {unlocked && <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "#1B7A45" }} aria-hidden="true" />}
          <span>
            {t(`${BUNDLE_PCT}% off when you buy ${BUNDLE_MIN_UNITS}+ peptides`, `${BUNDLE_PCT}% al comprar ${BUNDLE_MIN_UNITS} o más péptidos`)}
            {units > 0 && (
              <span style={{ color: unlocked ? "#1B7A45" : "#6E6E73" }}>
                {" — "}
                {unlocked
                  ? t("unlocked", "desbloqueado")
                  : t(`add ${left} more`, `te falta${left === 1 ? "" : "n"} ${left}`)}
              </span>
            )}
          </span>
        </li>
        <li>{t("15% off with an affiliate code", "15% con código de afiliado")}</li>
      </ul>
      <p className="mt-1.5 text-[11.5px]" style={{ color: "#6E6E73" }}>
        {t(
          "One discount per order, chosen at checkout. BAC water doesn't count toward the 4.",
          "Un descuento por compra, se elige al pagar. El agua BAC no cuenta para los 4.",
        )}
      </p>
    </div>
  );
}
