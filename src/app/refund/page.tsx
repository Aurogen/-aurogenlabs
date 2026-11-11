import type { Metadata } from "next";
import { RotateCcw, AlertCircle, CheckCircle, Mail } from "lucide-react";
import Link from "next/link";
import T from "@/components/T";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Aurogen Labs refund and returns policy for research compounds. All sales are final. Learn about eligible claims for damaged or incorrect orders.",
};

export default function RefundPage() {
  return (
    <div className="min-h-screen py-16 px-4" style={{ background: "#F5F4F0" }}>
      <div className="max-w-3xl mx-auto">

        <T
          en={
            <>
                {/* Header */}
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(22,38,74,0.08)", border: "1px solid rgba(22,38,74,0.18)" }}
                    >
                      <RotateCcw className="w-5 h-5" style={{ color: "#6B7A8D" }} />
                    </div>
                    <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "#6E6E73" }}>
                      Policies
                    </span>
                  </div>
                  <h1
                    className="text-4xl font-medium mb-3"
                    style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
                  >
                    Refund Policy
                  </h1>
                  <p className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}>
                    Last updated: September 2026
                  </p>
                </div>

                {/* All Sales Final Notice */}
                <div
                  className="p-5 rounded-2xl mb-8 flex gap-4"
                  style={{ background: "rgba(255,59,48,0.06)", border: "1px solid rgba(255,59,48,0.18)" }}
                >
                  <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "#FF3B30" }} />
                  <div>
                    <p className="font-semibold text-sm mb-1" style={{ color: "#1D1D1F" }}>All Sales Are Final</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}>
                      Due to the sensitive and perishable nature of research compounds, we do not accept returns, exchanges,
                      or cancellations once an order has been placed and confirmed.
                    </p>
                  </div>
                </div>

                {/* Eligible Claims */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-5">
                    <CheckCircle className="w-5 h-5" style={{ color: "#6B7A8D" }} />
                    <h2
                      className="font-medium text-xl"
                      style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
                    >
                      Eligible Refund Claims
                    </h2>
                  </div>
                  <div
                    className="p-5 rounded-2xl text-sm leading-relaxed mb-4"
                    style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", color: "#6E6E73" }}
                  >
                    <p className="mb-4">
                      Refunds or replacements may be issued only in the following circumstances:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex gap-2">
                        <span className="shrink-0 font-bold" style={{ color: "#1D1D1F" }}>1.</span>
                        <span><strong style={{ color: "#1D1D1F" }}>Damaged shipment</strong> — the product arrived visibly damaged due to carrier mishandling.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="shrink-0 font-bold" style={{ color: "#1D1D1F" }}>2.</span>
                        <span><strong style={{ color: "#1D1D1F" }}>Wrong item received</strong> — you received a product different from what you ordered.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="shrink-0 font-bold" style={{ color: "#1D1D1F" }}>3.</span>
                        <span><strong style={{ color: "#1D1D1F" }}>Missing item</strong> — a confirmed item from your order was not included in the shipment.</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-sm" style={{ color: "#6E6E73" }}>
                    Claims must be submitted within <strong style={{ color: "#1D1D1F" }}>7 days of the confirmed delivery date</strong>.
                    Claims submitted after this window will not be eligible.
                  </p>
                </div>

                {/* How to File */}
                <div className="mb-10">
                  <h2
                    className="font-medium text-xl mb-5"
                    style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
                  >
                    How to File a Claim
                  </h2>
                  <div className="space-y-3">
                    {[
                      { step: "1", text: "Email us at support@aurogenbio.com with the subject line: Refund Request – Order #[your order number]" },
                      { step: "2", text: "Attach clear photographs of the product, packaging, and any visible damage or discrepancy." },
                      { step: "3", text: "Include a brief description of the issue." },
                      { step: "4", text: "Our team will review your claim and respond within 2–3 business days." },
                    ].map(({ step, text }) => (
                      <div
                        key={step}
                        className="p-5 rounded-2xl flex gap-4"
                        style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
                      >
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                          style={{ background: "rgba(22,38,74,0.08)", color: "#16264A" }}
                        >
                          {step}
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}>{text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resolution */}
                <div className="mb-10">
                  <h2
                    className="font-medium text-xl mb-5"
                    style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
                  >
                    Resolution
                  </h2>
                  <div
                    className="p-5 rounded-2xl text-sm leading-relaxed"
                    style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", color: "#6E6E73" }}
                  >
                    <p className="mb-3">
                      Approved claims will be resolved with one of the following at our discretion:
                    </p>
                    <ul className="list-disc list-inside space-y-1 pl-1">
                      <li>Replacement shipment of the same product</li>
                      <li>Store credit for a future order</li>
                      <li>Partial or full refund to the original payment method</li>
                    </ul>
                    <p className="mt-3">
                      Refunds to the original payment method, when issued, may take 5–10 business days to appear
                      depending on your financial institution.
                    </p>
                  </div>
                </div>

                {/* Research Use Disclaimer */}
                <div
                  className="p-5 rounded-2xl mb-10 text-sm leading-relaxed"
                  style={{ background: "rgba(22,38,74,0.07)", border: "1px solid rgba(22,38,74,0.25)", color: "#6E6E73" }}
                >
                  <p className="font-semibold mb-2" style={{ color: "#1D1D1F" }}>Research Use Only</p>
                  <p>
                    All products sold by Aurogen Labs are intended exclusively for in-vitro laboratory and scientific
                    research purposes. They are not intended for human consumption, are not drugs or supplements, and
                    have not been evaluated by the FDA. By placing an order, you confirm that you are a qualified
                    researcher and that the compounds will be used solely for research purposes.
                  </p>
                </div>

                {/* Contact */}
                <div
                  className="p-6 rounded-2xl flex gap-4"
                  style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
                >
                  <Mail className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "#6B7A8D" }} />
                  <div>
                    <p className="font-semibold text-sm mb-1" style={{ color: "#1D1D1F" }}>Questions?</p>
                    <p className="text-sm" style={{ color: "#6E6E73" }}>
                      Contact our support team at{" "}
                      <a href="mailto:support@aurogenbio.com" className="underline" style={{ color: "#16264A" }}>
                        support@aurogenbio.com
                      </a>{" "}
                      or visit our{" "}
                      <Link href="/shipping" className="underline" style={{ color: "#16264A" }}>
                        Shipping & Returns
                      </Link>{" "}
                      page for more information.
                    </p>
                  </div>
                </div>
            </>
          }
          es={
            <>
                {/* Header */}
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(22,38,74,0.08)", border: "1px solid rgba(22,38,74,0.18)" }}
                    >
                      <RotateCcw className="w-5 h-5" style={{ color: "#6B7A8D" }} />
                    </div>
                    <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "#6E6E73" }}>
                      Políticas
                    </span>
                  </div>
                  <h1
                    className="text-4xl font-medium mb-3"
                    style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
                  >
                    Política de Reembolso
                  </h1>
                  <p className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}>
                    Última actualización: septiembre de 2026
                  </p>
                  <p className="text-sm mt-2 italic" style={{ color: "#6E6E73" }}>
                    Esta es una traducción de cortesía. En caso de discrepancia, prevalece la versión en inglés.
                  </p>
                </div>

                {/* All Sales Final Notice */}
                <div
                  className="p-5 rounded-2xl mb-8 flex gap-4"
                  style={{ background: "rgba(255,59,48,0.06)", border: "1px solid rgba(255,59,48,0.18)" }}
                >
                  <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "#FF3B30" }} />
                  <div>
                    <p className="font-semibold text-sm mb-1" style={{ color: "#1D1D1F" }}>Todas las ventas son definitivas</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}>
                      Debido a la naturaleza delicada y perecedera de los compuestos de investigación, no aceptamos devoluciones,
                      cambios ni cancelaciones una vez que un pedido ha sido realizado y confirmado.
                    </p>
                  </div>
                </div>

                {/* Eligible Claims */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-5">
                    <CheckCircle className="w-5 h-5" style={{ color: "#6B7A8D" }} />
                    <h2
                      className="font-medium text-xl"
                      style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
                    >
                      Reclamos de reembolso elegibles
                    </h2>
                  </div>
                  <div
                    className="p-5 rounded-2xl text-sm leading-relaxed mb-4"
                    style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", color: "#6E6E73" }}
                  >
                    <p className="mb-4">
                      Solo se podrán emitir reembolsos o reemplazos en las siguientes circunstancias:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex gap-2">
                        <span className="shrink-0 font-bold" style={{ color: "#1D1D1F" }}>1.</span>
                        <span><strong style={{ color: "#1D1D1F" }}>Envío dañado</strong> — el producto llegó visiblemente dañado debido a una manipulación inadecuada por parte del transportista.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="shrink-0 font-bold" style={{ color: "#1D1D1F" }}>2.</span>
                        <span><strong style={{ color: "#1D1D1F" }}>Artículo incorrecto</strong> — recibió un producto distinto al que ordenó.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="shrink-0 font-bold" style={{ color: "#1D1D1F" }}>3.</span>
                        <span><strong style={{ color: "#1D1D1F" }}>Artículo faltante</strong> — un artículo confirmado de su pedido no se incluyó en el envío.</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-sm" style={{ color: "#6E6E73" }}>
                    Los reclamos deben presentarse dentro de los <strong style={{ color: "#1D1D1F" }}>7 días posteriores a la fecha de entrega confirmada</strong>.
                    Los reclamos presentados después de este plazo no serán elegibles.
                  </p>
                </div>

                {/* How to File */}
                <div className="mb-10">
                  <h2
                    className="font-medium text-xl mb-5"
                    style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
                  >
                    Cómo presentar un reclamo
                  </h2>
                  <div className="space-y-3">
                    {[
                      { step: "1", text: "Envíenos un correo electrónico a support@aurogenbio.com con el asunto: Refund Request – Order #[su número de pedido]" },
                      { step: "2", text: "Adjunte fotografías nítidas del producto, del empaque y de cualquier daño o discrepancia visible." },
                      { step: "3", text: "Incluya una breve descripción del problema." },
                      { step: "4", text: "Nuestro equipo revisará su reclamo y responderá dentro de 2 a 3 días hábiles." },
                    ].map(({ step, text }) => (
                      <div
                        key={step}
                        className="p-5 rounded-2xl flex gap-4"
                        style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
                      >
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                          style={{ background: "rgba(22,38,74,0.08)", color: "#16264A" }}
                        >
                          {step}
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}>{text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resolution */}
                <div className="mb-10">
                  <h2
                    className="font-medium text-xl mb-5"
                    style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
                  >
                    Resolución
                  </h2>
                  <div
                    className="p-5 rounded-2xl text-sm leading-relaxed"
                    style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", color: "#6E6E73" }}
                  >
                    <p className="mb-3">
                      Los reclamos aprobados se resolverán mediante una de las siguientes opciones, a nuestra discreción:
                    </p>
                    <ul className="list-disc list-inside space-y-1 pl-1">
                      <li>Envío de reemplazo del mismo producto</li>
                      <li>Crédito en la tienda para un pedido futuro</li>
                      <li>Reembolso parcial o total al método de pago original</li>
                    </ul>
                    <p className="mt-3">
                      Los reembolsos al método de pago original, cuando se emitan, pueden tardar de 5 a 10 días hábiles en
                      reflejarse, según su institución financiera.
                    </p>
                  </div>
                </div>

                {/* Research Use Disclaimer */}
                <div
                  className="p-5 rounded-2xl mb-10 text-sm leading-relaxed"
                  style={{ background: "rgba(22,38,74,0.07)", border: "1px solid rgba(22,38,74,0.25)", color: "#6E6E73" }}
                >
                  <p className="font-semibold mb-2" style={{ color: "#1D1D1F" }}>Solo para uso en investigación</p>
                  <p>
                    Todos los productos vendidos por Aurogen Labs están destinados exclusivamente a fines de investigación
                    científica y de laboratorio in vitro. No están destinados al consumo humano, no son medicamentos ni
                    suplementos y no han sido evaluados por la FDA. Al realizar un pedido, usted confirma que es un
                    investigador calificado y que los compuestos se utilizarán únicamente con fines de investigación.
                  </p>
                </div>

                {/* Contact */}
                <div
                  className="p-6 rounded-2xl flex gap-4"
                  style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
                >
                  <Mail className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "#6B7A8D" }} />
                  <div>
                    <p className="font-semibold text-sm mb-1" style={{ color: "#1D1D1F" }}>¿Preguntas?</p>
                    <p className="text-sm" style={{ color: "#6E6E73" }}>
                      Comuníquese con nuestro equipo de soporte en{" "}
                      <a href="mailto:support@aurogenbio.com" className="underline" style={{ color: "#16264A" }}>
                        support@aurogenbio.com
                      </a>{" "}
                      o visite nuestra página de{" "}
                      <Link href="/shipping" className="underline" style={{ color: "#16264A" }}>
                        Envíos y Devoluciones
                      </Link>{" "}
                      para obtener más información.
                    </p>
                  </div>
                </div>
            </>
          }
        />
      </div>
    </div>
  );
}
