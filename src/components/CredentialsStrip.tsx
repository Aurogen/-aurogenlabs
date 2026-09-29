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

function CredentialItem({ c, sep }: { c: (typeof CREDENTIALS)[0]; sep: boolean }) {
  return (
    <div className="flex items-center gap-8 shrink-0">
      <div className="flex items-center gap-2.5">
        <span
          className="font-bold text-[11px]"
          style={{ fontFamily: "var(--font-jetbrains, monospace)", color: "#111111", letterSpacing: "0.1em" }}
        >
          {c.code}
        </span>
        <span className="text-[11px]" style={{ color: "#9E9EA8", letterSpacing: "0.02em" }}>
          {c.label}
        </span>
      </div>
      {sep && <div style={{ width: 1, height: 12, background: "rgba(0,0,0,0.1)", flexShrink: 0 }} />}
    </div>
  );
}

export default function CredentialsStrip() {
  return (
    <div
      style={{
        background: "#EFEDE8",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
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
          width: 60,
          background: "linear-gradient(to right, #EFEDE8, transparent)",
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
          width: 60,
          background: "linear-gradient(to left, #EFEDE8, transparent)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div className="animate-creds-scroll flex items-center py-3.5" style={{ willChange: "transform" }}>
        {/* Double-render for seamless loop */}
        {[...CREDENTIALS, ...CREDENTIALS].map((c, i) => (
          <CredentialItem key={i} c={c} sep={i < CREDENTIALS.length * 2 - 1} />
        ))}
      </div>
    </div>
  );
}
