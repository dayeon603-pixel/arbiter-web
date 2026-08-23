/**
 * The Arbiter arch, drawn large. Stands in for the founder portrait.
 *
 * The previous placeholder was an empty bordered box with a grid in it, which
 * read as a broken image rather than as a deliberate choice. This is the
 * company's own mark at poster scale on ink — it holds the slot with intent
 * until a real photograph exists.
 *
 * TODO — replacing this with the real portrait:
 *   file   /public/img/founder-portrait.webp  (+ -640 and -1024 variants)
 *   ratio  4:5 portrait
 *   size   1600 x 2000 source, so the 1024 variant is a true downscale
 *   crop   head and shoulders, eyeline about one third from the top,
 *          subject facing into the text column (i.e. toward the right)
 *   then   set `founder.portrait` in lib/site.ts to that path
 */
export default function ArchMark() {
  return (
    <svg
      className="archmark"
      viewBox="0 0 320 400"
      role="img"
      aria-label="The Arbiter arch mark"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* The arch: two piers carrying a semicircle, the shape the wordmark's
          A is derived from. Stroked, not filled, so it reads as structure. */}
      <g fill="none" stroke="currentColor" strokeWidth="10" className="archmark__arch">
        <path d="M78 330V196a82 82 0 0 1 164 0v134" />
        <path d="M120 330v-132a40 40 0 0 1 80 0v132" />
      </g>
      <g className="archmark__base">
        <rect x="60" y="330" width="200" height="14" rx="2" />
      </g>
    </svg>
  )
}
