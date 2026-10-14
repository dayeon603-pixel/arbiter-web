import type { Metadata } from 'next'
import Link from 'next/link'
import { landauer, contactHref } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Landauer — Arbiter',
  description: landauer.tagline,
}

export default function LandauerPage() {
  return (
    <>
      <header className="nav">
        <div className="wrap nav__inner">
          <Link href="/" className="wordmark">ARBITER</Link>
          <nav className="nav__links" aria-label="Primary">
            <Link href="/#energy">Energy</Link>
            <Link href="/#company">Company</Link>
            <a href={contactHref('Landauer — Inquiry')} className="nav__cta">Contact</a>
          </nav>
        </div>
      </header>

      <main className="cv">
        <section className="wrap cv__hero">
          <p className="eyebrow">{landauer.eyebrow}</p>
          <h1 className="cv__name">{landauer.name}</h1>
          <p className="cv__tagline">{landauer.tagline}</p>
          <p className="cv__lead">{landauer.lead}</p>
        </section>

        <section className="wrap cv__block">
          <img
            src="/img/energy.jpg"
            alt="Fifteen measured power traces from an NVIDIA Tesla T4 serving an LLM, each showing watts over time against the idle baseline"
            style={{ width: '100%', height: 'auto', borderRadius: 12, display: 'block' }}
          />
          <p className="cv__body" style={{ marginTop: 12, fontSize: 14, opacity: 0.7 }}>
            Measured GPU power during batched LLM serving on an NVIDIA Tesla T4, one panel per run. The dashed line is idle power.
          </p>
        </section>


        <section className="wrap cv__block">
          <div className="cv__block-head">
            <span className="sector__fig">FIG. 01</span>
            <span className="sector__rule" />
            {landauer.problem.label}
          </div>
          <p className="cv__body">{landauer.problem.body}</p>
        </section>

        <section className="wrap cv__block">
          <div className="cv__block-head">
            <span className="sector__fig">FIG. 02</span>
            <span className="sector__rule" />
            {landauer.how.label}
          </div>
          <div className="cv__points">
            {landauer.how.points.map((pt, i) => (
              <div key={i} className="cv__point">
                <span className="cv__point-num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="cv__point-h">{pt.h}</h3>
                <p className="cv__point-p">{pt.p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="wrap cv__block">
          <div className="cv__block-head">
            <span className="sector__fig">FIG. 03</span>
            <span className="sector__rule" />
            {landauer.status.label}
          </div>
          <p className="cv__body">{landauer.status.body}</p>
        </section>

        <section className="wrap cv__cta">
          <Link href="/#energy" className="btn btn--ghost">← Back to Energy</Link>
          <a href={contactHref('Landauer — Inquiry')} className="btn btn--solid">Get in touch</a>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer__bar-only">
          <span>© 2026 Arbiter</span>
          <Link href="/">arbiter.company →</Link>
        </div>
      </footer>
    </>
  )
}
