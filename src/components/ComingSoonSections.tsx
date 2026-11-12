import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { MERCH_PREVIEW, SUPPLEMENTS_PREVIEW } from "@/data/coming-soon";
import LaunchNotifyForm from "./LaunchNotifyForm";
import PageHero from "./PageHero";
import T from "./T";

/**
 * Previews of lines that are not on sale yet. On the home page each section links to its own page;
 * on that page (`standalone`) it is the main content.
 */

function SoonBadge() {
  return (
    <span
      className="absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-semibold tracking-wide"
      style={{ background: "#111111", color: "#FFFFFF" }}
    >
      <T en="COMING SOON" es="PRÓXIMAMENTE" />
    </span>
  );
}

/** One product tile, identical in both sections: same frame, backdrop, badge, type and hover. */
function PreviewCard({ name, detail, detail_es, image }: { name: string; detail: string; detail_es: string; image: string }) {
  return (
    <div className="group rounded-xl overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)" }}>
      <div className="relative aspect-square overflow-hidden" style={{ background: "#ECE8E3" }}>
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 1023px) 50vw, 300px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <SoonBadge />
      </div>
      <div className="p-3 sm:p-4 text-center sm:text-left">
        <h3 className="font-semibold text-[14px] sm:text-[15px] leading-snug" style={{ color: "#111111" }}>{name}</h3>
        <p className="text-[12px] sm:text-[13px] mt-1" style={{ color: "#6B6B6B" }}><T en={detail} es={detail_es} /></p>
      </div>
    </div>
  );
}

/** Four across; a set of 6 goes three across so no row is left half empty. */
function PreviewGrid({ children, count }: { children: ReactNode; count: number }) {
  const cols = count % 4 !== 0 && count % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4";
  return <div className={`grid grid-cols-2 ${cols} gap-3 sm:gap-5`}>{children}</div>;
}

function SectionHeader({
  eyebrow,
  title,
  text,
  href,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  text: ReactNode;
  href: string;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 text-center md:text-left">
      <div>
        <p className="text-[13px] mb-2" style={{ color: "#6B6B6B" }}>{eyebrow}</p>
        <h2
          className="text-4xl md:text-5xl"
          style={{ fontFamily: "var(--font-heading, serif)", color: "#111111", lineHeight: 1.05 }}
        >
          {title}
        </h2>
        <p className="mt-3 text-[15px] max-w-xl mx-auto md:mx-0" style={{ color: "#55555A" }}>{text}</p>
      </div>
      <Link href={href} className="inline-flex items-center justify-center gap-1.5 text-[14px] font-medium underline-offset-4 hover:underline" style={{ color: "#111111" }}>
        <T en="See all" es="Ver todo" /> <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export function SupplementsComingSoon({ standalone = false }: { standalone?: boolean }) {
  const items = standalone ? SUPPLEMENTS_PREVIEW : SUPPLEMENTS_PREVIEW.slice(0, 4);
  const eyebrow = <T en="Coming soon" es="Próximamente" />;
  const title = <T en="Protein & Supplements" es="Proteína y suplementos" />;
  const text = (
    <T
      en="A sports nutrition line from Aurogen is on the way. Leave your email and we'll let you know the day it launches."
      es="Una línea de nutrición deportiva de Aurogen viene en camino. Déjanos tu correo y te avisamos el día del lanzamiento."
    />
  );
  return (
    <>
    {standalone && <PageHero eyebrow={eyebrow} title={title} subtitle={text} />}
    <section className="py-16 md:py-20" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {!standalone && <SectionHeader eyebrow={eyebrow} title={title} text={text} href="/supplements" />}
        <PreviewGrid count={items.length}>
          {items.map((s) => (
            <PreviewCard key={s.slug} name={s.name} detail={s.detail} detail_es={s.detail_es} image={s.image} />
          ))}
        </PreviewGrid>
        <div className="mt-8 flex justify-center md:justify-start">
          <LaunchNotifyForm label="supplements" label_es="los suplementos" />
        </div>
      </div>
    </section>
    </>
  );
}

export function MerchComingSoon({ standalone = false }: { standalone?: boolean }) {
  const merch = standalone ? MERCH_PREVIEW : MERCH_PREVIEW.slice(0, 4);
  const eyebrow = <T en="Coming soon" es="Próximamente" />;
  const title = <T en="Aurogen Merch" es="Merch Aurogen" />;
  const text = (
    <T
      en="Tees, a polo, a half-zip hoodie, caps and a vial case with the Aurogen mark. The first drop is in the works — get on the list to hear first."
      es="Camisetas, un polo, una sudadera con medio cierre, gorras y un estuche para viales con el logo de Aurogen. El primer lanzamiento está en preparación: apúntate a la lista y entérate antes que nadie."
    />
  );
  return (
    <>
    {standalone && <PageHero eyebrow={eyebrow} title={title} subtitle={text} />}
    <section className="py-16 md:py-20" style={{ background: "#F5F4F0" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {!standalone && <SectionHeader eyebrow={eyebrow} title={title} text={text} href="/merch" />}

        {standalone && (
          <div className="relative overflow-hidden rounded-2xl mb-8 aspect-[16/9] md:aspect-[21/9]" style={{ background: "#16264A" }}>
            <Image
              src="/merch/polo-lifestyle.webp"
              alt="Aurogen Polo, worn"
              fill
              priority
              sizes="(max-width: 1279px) 100vw, 1200px"
              className="object-cover merch-kenburns"
              style={{ objectPosition: "50% 30%" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(10,16,32,0.72) 0%, rgba(10,16,32,0.25) 55%, rgba(10,16,32,0) 100%)" }} />
            <div className="absolute inset-0 flex flex-col justify-end md:justify-center p-6 md:p-12 max-w-lg">
              <p className="text-[12px] tracking-[0.25em] mb-2" style={{ color: "#9DB8FF" }}>
                <T en="FIRST DROP" es="PRIMER LANZAMIENTO" />
              </p>
              <p className="text-3xl md:text-5xl text-white" style={{ fontFamily: "var(--font-heading, serif)", lineHeight: 1.05 }}>
                <T en="Wear the lab." es="Viste el laboratorio." />
              </p>
              <p className="mt-3 text-sm md:text-base" style={{ color: "rgba(255,255,255,0.8)" }}>
                <T en="Apparel, caps and a vial case — coming soon." es="Ropa, gorras y estuche para viales: muy pronto." />
              </p>
            </div>
          </div>
        )}

        <PreviewGrid count={merch.length}>
          {merch.map((m) => (
            <PreviewCard key={m.slug} name={m.name} detail={m.detail} detail_es={m.detail_es} image={m.image} />
          ))}
        </PreviewGrid>
        <div className="mt-8 flex justify-center md:justify-start">
          <LaunchNotifyForm label="merch" label_es="la merch" />
        </div>
      </div>
    </section>
    </>
  );
}
