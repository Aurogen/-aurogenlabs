const CREDENTIALS = [
  { code: "ISO 9001", label: "Quality Management" },
  { code: "cGMP", label: "Current Good Manufacturing Practice" },
  { code: "HPLC", label: "Purity Verified" },
  { code: "CoA", label: "Certificate of Analysis" },
  { code: "USP", label: "Grade Reagents" },
  { code: "US-MFG", label: "Domestic Manufacturing" },
];

export default function CredentialsStrip() {
  return (
    <div
      style={{
        background: "#FEFDF9",
        borderTop: "1px solid rgba(0,0,0,0.05)",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-5 overflow-x-auto">
        <div className="flex items-center gap-10 min-w-max mx-auto justify-center">
          {CREDENTIALS.map((c, i) => (
            <div key={c.code} className="flex items-center gap-10">
              <div className="flex items-center gap-3">
                <span
                  className="font-bold text-xs"
                  style={{
                    fontFamily: "var(--font-dm-sans, sans-serif)",
                    color: "#111111",
                    letterSpacing: "0.08em",
                  }}
                >
                  {c.code}
                </span>
                <span className="text-xs" style={{ color: "#A0A0A0" }}>
                  {c.label}
                </span>
              </div>
              {i < CREDENTIALS.length - 1 && (
                <div style={{ width: "1px", height: "14px", background: "rgba(0,0,0,0.08)" }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
