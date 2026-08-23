import ProofPanel from '@/components/ui/ProofPanel'
import { contactHref, externalLinks } from '@/lib/site'

/**
 * Two structural options, both built so they can be compared at real size.
 *
 *  'stack' — text block at full content width, receipt directly beneath it.
 *  'split' — true 5/7, both columns top-aligned, the panel filling its column.
 *
 * Optical alignment: the headline opens on A, whose diagonal left stem leaves
 * a visible notch against the column edge, so it hangs left by its side
 * bearing. At display size the uncorrected version reads as an indent.
 */
export default function Hero({ variant = 'split' }: { variant?: 'split' | 'stack' }) {
  const text = (
    <div className="hero__lead">
      <p className="eyebrow">Decision infrastructure</p>
      <h1 className="hero__title">
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
  )

  return (
    <section className={`hero hero--${variant}`} id="top">
      <div className="content hero__inner">
        {text}
        <div className="hero__panel">
          <ProofPanel />
        </div>
      </div>
    </section>
  )
}
