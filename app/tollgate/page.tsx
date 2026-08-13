import type { Metadata } from 'next'
import Link from 'next/link'
import { tollgate, contactHref } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Tollgate — Arbiter',
  description: tollgate.tagline,
}

export default function TollgatePage() {
  return (
    <>
      <header className="nav">
        <div className="wrap nav__inner">
          <Link href="/" className="wordmark">ARBITER</Link>
          <nav className="nav__links" aria-label="Primary">
            <Link href="/#finance">Finance</Link>
            <Link href="/#company">Company</Link>
            <a href={contactHref('Tollgate — Inquiry')} className="nav__cta">Contact</a>
          </nav>
        </div>
      </header>

      <main className="cv">
        <section className="wrap cv__hero">
          <p className="eyebrow">{tollgate.eyebrow}</p>
          <h1 className="cv__name">{tollgate.name}</h1>
          <p className="cv__tagline">{tollgate.tagline}</p>
          <p className="cv__lead">{tollgate.lead}</p>
          <div className="cv__actions">
            <a href={tollgate.links.verifier} target="_blank" rel="noopener noreferrer" className="btn btn--solid">Open the offline verifier&nbsp;→</a>
          </div>
        </section>

        <section className="wrap cv__block">
          <div className="cv__block-head">
            <span className="sector__fig">FIG. 01</span>
            <span className="sector__rule" />
            {tollgate.problem.label}
          </div>
          <p className="cv__body">{tollgate.problem.body}</p>
        </section>

        <section className="wrap cv__block">
          <div className="cv__block-head">
            <span className="sector__fig">FIG. 02</span>
            <span className="sector__rule" />
            {tollgate.how.label}
          </div>
          <div className="cv__points">
            {tollgate.how.points.map((pt, i) => (
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
            {tollgate.twoSided.label}
          </div>
          <p className="cv__body">{tollgate.twoSided.body}</p>
        </section>

        <section className="wrap cv__block">
          <div className="cv__block-head">
            <span className="sector__fig">FIG. 04</span>
            <span className="sector__rule" />
            {tollgate.pricing.label}
          </div>
          <p className="cv__body">{tollgate.pricing.body}</p>
        </section>

        <section className="wrap cv__block">
          <div className="cv__block-head">
            <span className="sector__fig">FIG. 05</span>
            <span className="sector__rule" />
            {tollgate.northStar.label}
          </div>
          <p className="cv__body">{tollgate.northStar.body}</p>
        </section>

        <section className="wrap cv__block">
          <div className="cv__block-head">
            <span className="sector__fig">FIG. 06</span>
            <span className="sector__rule" />
            {tollgate.status.label}
          </div>
          <p className="cv__body">{tollgate.status.body}</p>
        </section>

        <section className="wrap cv__cta">
          <Link href="/#finance" className="btn btn--ghost">← Back to Finance</Link>
          <a href={contactHref('Tollgate — Inquiry')} className="btn btn--solid">Get in touch</a>
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
