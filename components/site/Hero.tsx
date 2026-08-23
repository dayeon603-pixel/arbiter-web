import { contactHref, externalLinks } from '@/lib/site'

/**
 * One thesis above the fold.
 *
 * Optical alignment: the headline's first glyph is A, whose diagonal stem
 * leaves a visible notch against the column edge, so it hangs left by its side
 * bearing. Without it the line reads as indented next to the eyebrow above.
 */
export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="content hero__inner">
        <p className="eyebrow">Arbiter</p>
        <h1 className="display hero__title">
          <span className="hang-diag">A</span> decision a regulator can replay
        </h1>
        <p className="lede hero__sub">
          Screening decisions become signed receipts an examiner can re-derive on their own
          machine, offline, years later.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href={externalLinks.verifier}>
            Verify a receipt
          </a>
          <a className="btn btn--secondary" href={contactHref()}>
            Talk to us
          </a>
        </div>
      </div>
    </section>
  )
}
