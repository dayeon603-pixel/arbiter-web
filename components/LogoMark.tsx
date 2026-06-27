/* Arbiter mark — a tall archway (gate of judgment) over an orange threshold bar,
   on a near-black app tile. Matched to the reference brand mark. */
export default function LogoMark({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 100 100" fill="none"
      className={className} role="img" aria-label="Arbiter"
    >
      <rect width="100" height="100" rx="26" fill="#10141A" />
      <path
        d="M31 79 V49 A19 19 0 0 1 69 49 V79"
        stroke="#E7E9F1" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round"
      />
      <rect x="28.5" y="73" width="43" height="9.5" rx="4.75" fill="#E85F30" />
    </svg>
  )
}
