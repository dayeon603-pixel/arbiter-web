/* Arbiter mark — an archway (gate of judgment) over an orange threshold,
   on a near-black app tile. Recreated from the reference brand mark. */
export default function LogoMark({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 100 100" fill="none"
      className={className} role="img" aria-label="Arbiter"
    >
      <rect width="100" height="100" rx="27" fill="#11141A" />
      <path d="M33 71 V50 A17 17 0 0 1 67 50 V71" stroke="#E6E8EC" strokeWidth="8" strokeLinecap="round" />
      <rect x="28.5" y="64.5" width="43" height="8.5" rx="4.25" fill="#F0571E" />
    </svg>
  )
}
