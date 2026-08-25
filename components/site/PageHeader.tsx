/**
 * The masthead every non-home page opens with. One eyebrow, one headline of
 * seven words or fewer, one subhead of twenty-five or fewer.
 *
 * `accent` is the single treatment that distinguishes a division from its
 * siblings: a short rule set in that division's tone above the eyebrow. The
 * grid, type scale and components are otherwise identical everywhere, so the
 * five pages read as one company rather than five microsites.
 */
export default function PageHeader({
  eyebrow,
  title,
  subhead,
  accent = false,
  mark,
  relation,
}: {
  eyebrow: string
  title: React.ReactNode
  subhead: string
  accent?: boolean
  /** The sector's own mark, when this page belongs to one. */
  mark?: React.ReactNode
  /** How this sector relates to the parent. Never asserts incorporation. */
  relation?: string
}) {
  return (
    <header className="pagehead">
      <div className="content">
        {mark ? (
          <div className="pagehead__id">
            <span className="pagehead__mark">{mark}</span>
            <span>
              <span className="eyebrow pagehead__name">{eyebrow}</span>
              {relation && <span className="small pagehead__relation">{relation}</span>}
            </span>
          </div>
        ) : (
          <>
            {accent && <span className="pagehead__rule" aria-hidden="true" />}
            <p className="eyebrow">{eyebrow}</p>
          </>
        )}
        <h1 className="h1 pagehead__title">{title}</h1>
        <p className="lede measure pagehead__sub">{subhead}</p>
      </div>
    </header>
  )
}
