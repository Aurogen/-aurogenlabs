const CREDENTIALS = [
  { code: "ISO 9001", label: "Quality Management" },
  { code: "cGMP", label: "Good Manufacturing Practice" },
  { code: "HPLC", label: "Purity Verified" },
  { code: "CoA", label: "Certificate of Analysis" },
  { code: "USP", label: "Grade Reagents" },
  { code: "US-MFG", label: "Domestic Manufacturing" },
];

export default function CredentialsStrip() {
  return (
    <div
      style={{
        background: "#EFEDE8",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-4 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-10 min-w-max mx-auto justify-center">
          {CREDENTIALS.map((c, i) => (
            <div key={c.code} className="flex items-center gap-10">
              <div className="flex items-center gap-3">
                <span
                  className="font-bold text-[11px]"
                  style={{
                    fontFamily: "var(--font-jetbrains, monospace)",
                    color: "#111111",
                    letterSpacing: "0.1em",
                  }}
                >
                  {c.code}
                </span>
                <span
                  className="text-[11px]"
                  style={{
                    color: "#9E9EA8",
                    letterSpacing: "0.02em",
                  }}
                >
                  {c.label}
                </span>
              </div>
              {i < CREDENTIALS.length - 1 && (
                <div style={{ width: "1px", height: "12px", background: "rgba(0,0,0,0.1)" }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
