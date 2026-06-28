import type { Metadata } from 'next'
import Link from 'next/link'
import { goldentime, founder } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Goldentime — Arbiter',
  description: goldentime.tagline,
}

export default function GoldentimePage() {
  return (
    <>
      <header className="nav">
        <div className="wrap nav__inner">
          <Link href="/" className="wordmark">ARBITER</Link>
          <nav className="nav__links" aria-label="Primary">
            <Link href="/#cyber">Cybersecurity</Link>
            <Link href="/#company">Company</Link>
            <a href={`mailto:${founder.contact}`} className="nav__cta">Contact</a>
          </nav>
        </div>
      </header>

      <main className="cv">
        <section className="wrap cv__hero">
          <p className="eyebrow">{goldentime.eyebrow}</p>
          <h1 className="cv__name">{goldentime.name}</h1>
          <p className="cv__tagline">{goldentime.tagline}</p>
          <p className="cv__lead">{goldentime.lead}</p>
        </section>

        <section className="wrap cv__block">
          <div className="cv__block-head">
            <span className="sector__fig">FIG. 01</span>
            <span className="sector__rule" />
            {goldentime.problem.label}
          </div>
          <p className="cv__body">{goldentime.problem.body}</p>
        </section>

        <section className="wrap cv__block">
          <div className="cv__block-head">
            <span className="sector__fig">FIG. 02</span>
            <span className="sector__rule" />
            {goldentime.how.label}
          </div>
          <div className="cv__points">
            {goldentime.how.points.map((pt, i) => (
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
            {goldentime.status.label}
          </div>
          <p className="cv__body">{goldentime.status.body}</p>
        </section>

        <section className="wrap cv__cta">
          <Link href="/#cyber" className="btn btn--ghost">← Back to Cybersecurity</Link>
          <a href={`mailto:${founder.contact}`} className="btn btn--solid">Get in touch</a>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer__bar-only">
          <span>© 2026 Arbiter</span>
          <Link href="/">arbiter.inc →</Link>
        </div>
      </footer>
    </>
  )
}
