import type { Division } from '@/lib/divisions'

/**
 * One mark per sector, so each reads as its own company rather than as a
 * coloured section heading.
 *
 * They are a family, not five unrelated logos: same 48-unit square, same
 * stroke weight, same flat terminals, all built from the arch in the parent
 * wordmark. What differs is what the arch is doing — carrying a chain, a
 * signal, a row, a pulse, a lattice. The shared construction is what says
 * these belong to one group; the difference is what says they are separate.
 */
const PATHS: Record<Division['mark'], React.ReactNode> = {
  arch: <path d="M10 38V22a14 14 0 0 1 28 0v16" />,
  // finance — links carried under the arch
  chain: (
    <>
      <path d="M10 30V22a14 14 0 0 1 28 0v8" />
      <path d="M14 38h8M26 38h8" />
    </>
  ),
  // cybersecurity — a signal crossing the span
  wave: (
    <>
      <path d="M10 34V22a14 14 0 0 1 28 0v12" />
      <path d="M10 40h6l4-7 5 12 5-9 4 4h4" />
    </>
  ),
  // agriculture — rows under shelter
  field: (
    <>
      <path d="M10 30V22a14 14 0 0 1 28 0v8" />
      <path d="M12 40h24M16 36v8M24 36v8M32 36v8" />
    </>
  ),
  // health — a trace read under the arch
  pulse: (
    <>
      <path d="M10 32V22a14 14 0 0 1 28 0v10" />
      <path d="M10 39h7l3-6 4 12 4-9 3 3h5" />
    </>
  ),
  // research — a lattice held in the span
  grid: (
    <>
      <path d="M10 30V22a14 14 0 0 1 28 0v8" />
      <path d="M14 36h20M14 42h20M20 34v10M28 34v10" />
    </>
  ),
}

export default function SectorMark({
  mark,
  size = 40,
  className,
}: {
  mark: Division['mark']
  size?: number
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
        {PATHS[mark]}
      </g>
    </svg>
  )
}
