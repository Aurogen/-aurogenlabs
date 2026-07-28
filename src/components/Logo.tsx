export default function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="19" stroke="url(#g1)" strokeWidth="1.5" />
      <path d="M20 8L28 28H24L22 23H18L16 28H12L20 8Z" fill="white" opacity="0.95" />
      <path d="M19.2 20.5H20.8L20 17.5Z" fill="#1B6BDE" />
      <circle cx="32" cy="13" r="1.8" fill="#4DA3FF" opacity="0.9" />
      <circle cx="8" cy="13" r="1.8" fill="#4DA3FF" opacity="0.9" />
      <circle cx="33.5" cy="20" r="1.2" fill="#4DA3FF" opacity="0.55" />
      <circle cx="6.5" cy="20" r="1.2" fill="#4DA3FF" opacity="0.55" />
      <circle cx="32" cy="27" r="1.8" fill="#4DA3FF" opacity="0.9" />
      <circle cx="8" cy="27" r="1.8" fill="#4DA3FF" opacity="0.9" />
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1B6BDE" />
          <stop offset="100%" stopColor="#4DA3FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
