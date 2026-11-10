import Image from "next/image";

/**
 * The Aurogen logo from the product label: the "A" with the DNA helix, followed by the AUROGEN wordmark.
 * `light` is for light backgrounds (navy logo), `dark` for dark backgrounds (white logo).
 * `markOnly` shows just the "A".
 */
export default function Logo({
  height = 40,
  variant = "light",
  markOnly = false,
}: {
  height?: number;
  variant?: "dark" | "light";
  markOnly?: boolean;
}) {
  const color = variant === "light" ? "navy" : "white";
  const markW = Math.round((height * 283) / 240);
  const wordH = Math.round(height * 0.4);
  const wordW = Math.round((wordH * 794) / 100);
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image src={`/brand/mark-${color}.png`} alt={markOnly ? "Aurogen" : ""} width={markW} height={height} priority />
      {!markOnly && <Image src={`/brand/wordmark-${color}.png`} alt="Aurogen" width={wordW} height={wordH} priority />}
    </span>
  );
}
