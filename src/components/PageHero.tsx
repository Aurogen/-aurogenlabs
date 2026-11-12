import type { ReactNode } from "react";
import LabVideo from "./LabVideo";

/**
 * Page header used across the site: the same lab video as the home page plays behind
 * the eyebrow, title and intro, under a dark wash so the white text stays readable.
 * Works in server components (the video itself is a client component).
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  align = "center",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Extra content under the intro (buttons, dates, notes). */
  children?: ReactNode;
  align?: "center" | "left";
}) {
  const center = align === "center";
  return (
    <section className="relative overflow-hidden" style={{ background: "#0D1117" }}>
      <div className="absolute inset-0" aria-hidden="true">
        <LabVideo />
        <div
          className="absolute inset-0"
          style={{
            zIndex: 1,
            background: "linear-gradient(to bottom, rgba(8,10,14,0.62) 0%, rgba(8,10,14,0.48) 50%, rgba(8,10,14,0.78) 100%)",
          }}
        />
      </div>
      <div
        className={`relative z-[2] max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-20 md:py-24 ${center ? "text-center" : "text-center sm:text-left"}`}
      >
        {eyebrow && (
          <p className="text-[12px] sm:text-[13px] tracking-[0.25em] uppercase mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>
            {eyebrow}
          </p>
        )}
        <h1
          style={{
            fontFamily: "var(--font-heading, serif)",
            fontSize: "clamp(38px, 6vw, 68px)",
            lineHeight: 1.05,
            color: "#FFFFFF",
            fontWeight: 500,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <div
            className={`mt-4 text-[15px] sm:text-base leading-relaxed max-w-2xl ${center ? "mx-auto" : "mx-auto sm:mx-0"}`}
            style={{ color: "rgba(255,255,255,0.82)" }}
          >
            {subtitle}
          </div>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
