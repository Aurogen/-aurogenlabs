import type { MerchDesign } from "@/data/coming-soon";

/** Flat apparel mockups for the Merch "coming soon" preview, drawn in SVG (no external images). */

const TEE =
  "M110 52 L140 42 C150 60 170 60 180 42 L210 52 L262 86 L240 128 L214 114 L214 278 C214 282 211 285 207 285 L113 285 C109 285 106 282 106 278 L106 114 L80 128 L58 86 Z";
const HOODIE_BODY =
  "M118 74 L100 80 L72 104 L52 232 L48 264 L74 268 L82 238 L98 150 L100 290 L220 290 L222 150 L238 238 L246 268 L272 264 L268 232 L248 104 L220 80 L202 74 Z";
const HOOD = "M114 78 C104 22 216 22 206 78 C192 98 128 98 114 78 Z";
const HOOD_OPENING = "M130 74 C138 50 182 50 190 74 C180 88 140 88 130 74 Z";
const POCKET = "M126 224 L194 224 L206 266 L114 266 Z";

/** The Aurogen "A" mark centred on (0,0), about 50 units tall. */
function AMark({ color, cut }: { color: string; cut: string }) {
  return (
    <g>
      <path d="M0 -26 L21 24 L11.5 24 L6.5 11 L-6.5 11 L-11.5 24 L-21 24 Z" fill={color} />
      <path d="M-3.2 3.5 L3.2 3.5 L0 -5.5 Z" fill={cut} />
    </g>
  );
}

function helixPath(x: number, y0: number, y1: number, amp: number, phase: number) {
  const pts: string[] = [];
  for (let y = y0; y <= y1; y += 2) {
    const px = x + Math.sin((y - y0) / 11 + phase) * amp;
    pts.push(`${pts.length ? "L" : "M"}${px.toFixed(1)} ${y}`);
  }
  return pts.join(" ");
}

function Helix({ x, y0, y1, color }: { x: number; y0: number; y1: number; color: string }) {
  const rungs = [];
  for (let y = y0 + 4; y < y1; y += 9) {
    const a = Math.sin((y - y0) / 11) * 14;
    rungs.push(<line key={y} x1={x + a} y1={y} x2={x - a} y2={y} stroke={color} strokeWidth="1.4" opacity="0.55" />);
  }
  return (
    <g>
      {rungs}
      <path d={helixPath(x, y0, y1, 14, 0)} stroke={color} strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d={helixPath(x, y0, y1, 14, Math.PI)} stroke={color} strokeWidth="2.6" fill="none" strokeLinecap="round" />
    </g>
  );
}

function Shading({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#000" stopOpacity="0.18" />
        <stop offset="0.35" stopColor="#fff" stopOpacity="0.06" />
        <stop offset="0.7" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.2" />
      </linearGradient>
    </defs>
  );
}

export default function MerchArt({ design }: { design: MerchDesign }) {
  const shade = `shade-${design}`;

  if (design === "core-tee" || design === "lab-tee") {
    const dark = design === "core-tee";
    const fabric = dark ? "#17171A" : "#F5F5F2";
    const ink = dark ? "#FFFFFF" : "#0E1B3D";
    return (
      <svg viewBox="0 0 320 320" className="w-full h-full" role="img" aria-label={dark ? "Black tee with Aurogen logo" : "White tee with Research Dept. print"}>
        <Shading id={shade} />
        <ellipse cx="160" cy="296" rx="92" ry="7" fill="#000" opacity="0.08" />
        <path d={TEE} fill={fabric} stroke={dark ? "#000" : "#D9D9D4"} strokeWidth="1.5" />
        <path d={TEE} fill={`url(#${shade})`} />
        <path d="M140 42 C150 60 170 60 180 42" fill="none" stroke={dark ? "#2E2E33" : "#CFCFC9"} strokeWidth="5" strokeLinecap="round" />
        {dark ? (
          <g>
            <g transform="translate(160 118) scale(0.62)"><AMark color={ink} cut={fabric} /></g>
            <text x="160" y="158" textAnchor="middle" fill={ink} fontSize="15" fontWeight="700" letterSpacing="5" fontFamily="Helvetica, Arial, sans-serif">AUROGEN</text>
            <text x="160" y="171" textAnchor="middle" fill="#7FA8FF" fontSize="6.5" letterSpacing="4" fontFamily="Helvetica, Arial, sans-serif">BIOTECH</text>
          </g>
        ) : (
          <g>
            <g transform="translate(184 96) scale(0.3)"><AMark color={ink} cut={fabric} /></g>
            <text x="160" y="152" textAnchor="middle" fill={ink} fontSize="17" fontWeight="800" letterSpacing="2" fontFamily="Helvetica, Arial, sans-serif">RESEARCH</text>
            <text x="160" y="172" textAnchor="middle" fill={ink} fontSize="17" fontWeight="800" letterSpacing="2" fontFamily="Helvetica, Arial, sans-serif">DEPT.</text>
            <line x1="122" y1="182" x2="198" y2="182" stroke="#1E5BFF" strokeWidth="2" />
            <text x="160" y="196" textAnchor="middle" fill="#1E5BFF" fontSize="7" letterSpacing="3" fontFamily="Helvetica, Arial, sans-serif">AUROGEN · 001</text>
          </g>
        )}
      </svg>
    );
  }

  const navy = design === "signature-hoodie";
  const fabric = navy ? "#16264A" : "#A7A9AF";
  const deep = navy ? "#0E1A35" : "#8D9097";
  const ink = navy ? "#FFFFFF" : "#16264A";
  return (
    <svg viewBox="0 0 320 320" className="w-full h-full" role="img" aria-label={navy ? "Navy hoodie with Aurogen logo" : "Grey hoodie with DNA helix print"}>
      <Shading id={shade} />
      <ellipse cx="160" cy="300" rx="100" ry="7" fill="#000" opacity="0.08" />
      <path d={HOOD} fill={fabric} stroke={deep} strokeWidth="1.5" />
      <path d={HOODIE_BODY} fill={fabric} stroke={deep} strokeWidth="1.5" />
      <path d={HOODIE_BODY} fill={`url(#${shade})`} />
      <path d={HOOD_OPENING} fill={deep} />
      <path d={POCKET} fill="none" stroke={deep} strokeWidth="2" />
      <rect x="100" y="281" width="120" height="9" fill={deep} opacity="0.6" />
      <line x1="150" y1="86" x2="147" y2="132" stroke="#E9E9EC" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="170" y1="86" x2="173" y2="132" stroke="#E9E9EC" strokeWidth="2.5" strokeLinecap="round" />
      {navy ? (
        <g>
          <g transform="translate(160 152) scale(0.78)"><AMark color={ink} cut={fabric} /></g>
          <text x="160" y="198" textAnchor="middle" fill={ink} fontSize="15" fontWeight="700" letterSpacing="5" fontFamily="Helvetica, Arial, sans-serif">AUROGEN</text>
          <text x="160" y="210" textAnchor="middle" fill="#7FA8FF" fontSize="6.5" letterSpacing="4" fontFamily="Helvetica, Arial, sans-serif">BIOTECH</text>
        </g>
      ) : (
        <g>
          <Helix x={160} y0={138} y1={198} color={ink} />
          <text x="160" y="215" textAnchor="middle" fill={ink} fontSize="13" fontWeight="700" letterSpacing="5" fontFamily="Helvetica, Arial, sans-serif">AUROGEN</text>
        </g>
      )}
    </svg>
  );
}
