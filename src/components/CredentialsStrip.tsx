"use client";

const CREDENTIALS = [
  { code: "ISO 9001", label: "Quality Management" },
  { code: "cGMP", label: "Good Manufacturing Practice" },
  { code: "HPLC", label: "Purity Verified" },
  { code: "CoA", label: "Certificate of Analysis" },
  { code: "USP", label: "Grade Reagents" },
  { code: "US-MFG", label: "Domestic Manufacturing" },
  { code: "99%+", label: "Guaranteed Purity" },
  { code: "3RD PARTY", label: "Independent Testing" },
];

const BG = "#0D1117";

function CredentialItem({ c, sep }: { c: (typeof CREDENTIALS)[0]; sep: boolean }) {
  return (
    <div className="flex items-center gap-8 shrink-0">
      <div className="flex items-center gap-2.5">
        <span
          className="font-bold text-[11px]"
          style={{ fontFamily: "var(--font-jetbrains, monospace)", color: "#B8975A", letterSpacing: "0.12em" }}
        >
          {c.code}
        </span>
        <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.02em" }}>
          {c.label}
        </span>
      </div>
      {sep && <div style={{ width: 1, height: 12, background: "rgba(255,255,255,0.08)", flexShrink: 0 }} />}
    </div>
  );
}

export default function CredentialsStrip() {
  return (
    <div
      style={{
        background: BG,
        borderTop: "1px solid rgba(255,255,255,0.05)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Fade masks */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 80,
          background: `linear-gradient(to right, ${BG}, transparent)`,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 80,
          background: `linear-gradient(to left, ${BG}, transparent)`,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div className="animate-creds-scroll flex items-center py-4" style={{ willChange: "transform" }}>
        {/* Double-render for seamless loop */}
        {[...CREDENTIALS, ...CREDENTIALS].map((c, i) => (
          <CredentialItem key={i} c={c} sep={i < CREDENTIALS.length * 2 - 1} />
        ))}
      </div>
    </div>
  );
}
