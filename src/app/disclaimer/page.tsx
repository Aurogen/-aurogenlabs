import type { Metadata } from "next";
import T from "@/components/T";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important disclaimer regarding Aurogen Labs research peptides and compounds.",
  robots: { index: true, follow: true },
};

const SECTION = "mb-8";
const H2 = "text-xl font-bold mb-3";
const P = "text-sm leading-relaxed mb-3";

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen" style={{ background: "#F5F4F0" }}>
      <PageHero
        eyebrow="Legal"
        title={<T en="Research Use Disclaimer" es="Aviso legal sobre uso en investigación" />}
        subtitle={
          <>
            <p className="text-sm">
              <T en="Last updated: January 2026" es="Última actualización: enero de 2026" />
            </p>
            <T
              en={null}
              es={
                <p className="text-sm mt-2 italic">
                  Esta es una traducción de cortesía. En caso de discrepancia, prevalece la versión en inglés.
                </p>
              }
            />
          </>
        }
      />
      <div className="max-w-3xl mx-auto px-4 pt-12 pb-16">

        <T
          en={
            <>
                <div
                  className="p-8 rounded-2xl space-y-0"
                  style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
                >

                  <div className={SECTION}>
                    <h2 className={H2} style={{ color: "#1D1D1F" }}>Not for Human Consumption</h2>
                    <p className={P} style={{ color: "#6E6E73" }}>
                      ALL products sold by Aurogen Labs are strictly intended for <strong>in vitro laboratory
                      research and scientific study only</strong>. They are NOT intended for human consumption,
                      veterinary use, food additive use, or any other use outside of controlled scientific
                      research settings. These compounds are not drugs, dietary supplements, or medical devices.
                    </p>
                  </div>

                  <div className={SECTION}>
                    <h2 className={H2} style={{ color: "#1D1D1F" }}>FDA Statement</h2>
                    <p className={P} style={{ color: "#6E6E73" }}>
                      These statements have not been evaluated by the Food and Drug Administration (FDA).
                      Aurogen Labs products are not intended to diagnose, treat, cure, or prevent any disease
                      or medical condition. No claims are made regarding the safety or efficacy of these
                      compounds for use in humans or animals.
                    </p>
                  </div>

                  <div className={SECTION}>
                    <h2 className={H2} style={{ color: "#1D1D1F" }}>Age Restriction</h2>
                    <p className={P} style={{ color: "#6E6E73" }}>
                      All purchasers must be 18 years of age or older and must be qualified research
                      professionals, licensed scientists, or otherwise authorized to work with research
                      compounds in their jurisdiction. By purchasing from Aurogen Labs, you confirm
                      that you meet these requirements.
                    </p>
                  </div>

                  <div className={SECTION}>
                    <h2 className={H2} style={{ color: "#1D1D1F" }}>Purchaser Responsibility</h2>
                    <p className={P} style={{ color: "#6E6E73" }}>
                      The purchaser assumes full responsibility for complying with all applicable federal,
                      state, and local laws regarding the purchase, possession, and use of these research
                      compounds. Aurogen Labs is not responsible for any misuse of its products.
                      Purchasers are solely responsible for ensuring that research use complies with all
                      applicable laws in their jurisdiction.
                    </p>
                  </div>

                  <div className={SECTION}>
                    <h2 className={H2} style={{ color: "#1D1D1F" }}>No Medical Advice</h2>
                    <p className={P} style={{ color: "#6E6E73" }}>
                      Nothing on this website or in any Aurogen Labs communication constitutes medical advice.
                      Any information provided about research compounds is for educational and scientific
                      reference purposes only. Always consult a licensed medical professional before making
                      any health decisions.
                    </p>
                  </div>

                  <div className={SECTION}>
                    <h2 className={H2} style={{ color: "#1D1D1F" }}>Limitation of Liability</h2>
                    <p className={P} style={{ color: "#6E6E73" }}>
                      Aurogen Labs shall not be held liable for any direct, indirect, incidental, special,
                      or consequential damages arising from the misuse, improper handling, or unauthorized
                      use of its products outside of their intended research application.
                    </p>
                  </div>

                  <div className={SECTION}>
                    <h2 className={H2} style={{ color: "#1D1D1F" }}>Third-Party Research References</h2>
                    <p className={P} style={{ color: "#6E6E73" }}>
                      Any scientific studies, research citations, or references to published literature
                      provided on this website are for informational purposes only. Aurogen Labs makes no
                      representations regarding the accuracy, completeness, or applicability of such
                      third-party research to any specific use case.
                    </p>
                  </div>

                  <div style={{ background: "rgba(255,59,48,0.04)", border: "1px solid rgba(255,59,48,0.15)", borderRadius: "12px", padding: "20px" }}>
                    <p className="text-sm font-semibold mb-1" style={{ color: "#FF3B30" }}>
                      Important Notice
                    </p>
                    <p className="text-sm" style={{ color: "#6E6E73" }}>
                      By purchasing from Aurogen Labs you expressly acknowledge that you have read,
                      understood, and agree to this disclaimer in its entirety. If you do not agree
                      with any part of this disclaimer, do not purchase or use our products.
                    </p>
                  </div>

                </div>
            </>
          }
          es={
            <>
                <div
                  className="p-8 rounded-2xl space-y-0"
                  style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
                >

                  <div className={SECTION}>
                    <h2 className={H2} style={{ color: "#1D1D1F" }}>No apto para el consumo humano</h2>
                    <p className={P} style={{ color: "#6E6E73" }}>
                      TODOS los productos vendidos por Aurogen Labs están destinados estrictamente <strong>solo a la
                      investigación de laboratorio in vitro y al estudio científico</strong>. NO están destinados al
                      consumo humano, al uso veterinario, al uso como aditivo alimentario ni a ningún otro uso fuera de
                      entornos controlados de investigación científica. Estos compuestos no son medicamentos,
                      suplementos dietéticos ni dispositivos médicos.
                    </p>
                  </div>

                  <div className={SECTION}>
                    <h2 className={H2} style={{ color: "#1D1D1F" }}>Declaración de la FDA</h2>
                    <p className={P} style={{ color: "#6E6E73" }}>
                      Estas declaraciones no han sido evaluadas por la Administración de Alimentos y Medicamentos
                      (Food and Drug Administration, FDA). Los productos de Aurogen Labs no están destinados a
                      diagnosticar, tratar, curar ni prevenir ninguna enfermedad o afección médica. No se hace ninguna
                      afirmación sobre la seguridad o eficacia de estos compuestos para su uso en seres humanos o animales.
                    </p>
                  </div>

                  <div className={SECTION}>
                    <h2 className={H2} style={{ color: "#1D1D1F" }}>Restricción de edad</h2>
                    <p className={P} style={{ color: "#6E6E73" }}>
                      Todos los compradores deben tener 18 años de edad o más y deben ser profesionales de
                      investigación calificados, científicos con licencia o estar autorizados de otro modo para
                      trabajar con compuestos de investigación en su jurisdicción. Al comprar en Aurogen Labs,
                      usted confirma que cumple con estos requisitos.
                    </p>
                  </div>

                  <div className={SECTION}>
                    <h2 className={H2} style={{ color: "#1D1D1F" }}>Responsabilidad del comprador</h2>
                    <p className={P} style={{ color: "#6E6E73" }}>
                      El comprador asume la plena responsabilidad de cumplir con todas las leyes federales,
                      estatales y locales aplicables en relación con la compra, posesión y uso de estos compuestos
                      de investigación. Aurogen Labs no se hace responsable de ningún mal uso de sus productos.
                      Los compradores son los únicos responsables de garantizar que el uso en investigación cumpla
                      con todas las leyes aplicables en su jurisdicción.
                    </p>
                  </div>

                  <div className={SECTION}>
                    <h2 className={H2} style={{ color: "#1D1D1F" }}>Sin asesoramiento médico</h2>
                    <p className={P} style={{ color: "#6E6E73" }}>
                      Nada de lo contenido en este sitio web ni en ninguna comunicación de Aurogen Labs constituye
                      asesoramiento médico. Toda información proporcionada sobre compuestos de investigación tiene
                      únicamente fines educativos y de referencia científica. Consulte siempre a un profesional
                      médico con licencia antes de tomar cualquier decisión relacionada con la salud.
                    </p>
                  </div>

                  <div className={SECTION}>
                    <h2 className={H2} style={{ color: "#1D1D1F" }}>Limitación de responsabilidad</h2>
                    <p className={P} style={{ color: "#6E6E73" }}>
                      Aurogen Labs no será responsable de ningún daño directo, indirecto, incidental, especial
                      o consecuente derivado del mal uso, la manipulación inadecuada o el uso no autorizado de
                      sus productos fuera de su aplicación de investigación prevista.
                    </p>
                  </div>

                  <div className={SECTION}>
                    <h2 className={H2} style={{ color: "#1D1D1F" }}>Referencias a investigaciones de terceros</h2>
                    <p className={P} style={{ color: "#6E6E73" }}>
                      Todos los estudios científicos, citas de investigaciones o referencias a literatura publicada
                      que se proporcionan en este sitio web tienen únicamente fines informativos. Aurogen Labs no
                      ofrece ninguna declaración respecto de la exactitud, integridad o aplicabilidad de dichas
                      investigaciones de terceros a ningún caso de uso específico.
                    </p>
                  </div>

                  <div style={{ background: "rgba(255,59,48,0.04)", border: "1px solid rgba(255,59,48,0.15)", borderRadius: "12px", padding: "20px" }}>
                    <p className="text-sm font-semibold mb-1" style={{ color: "#FF3B30" }}>
                      Aviso importante
                    </p>
                    <p className="text-sm" style={{ color: "#6E6E73" }}>
                      Al comprar en Aurogen Labs, usted reconoce expresamente que ha leído, comprendido y
                      acepta este aviso legal en su totalidad. Si no está de acuerdo con alguna parte de este
                      aviso legal, no compre ni utilice nuestros productos.
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
