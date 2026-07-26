import type { Metadata } from 'next'
import Link from 'next/link'
import { farmpilot, contactHref } from '@/lib/data'

export const metadata: Metadata = {
  title: 'FarmPilot — Arbiter',
  description: farmpilot.tagline,
}

export default function FarmPilotPage() {
  return (
    <>
      <header className="nav">
        <div className="wrap nav__inner">
          <Link href="/" className="wordmark">ARBITER</Link>
          <nav className="nav__links" aria-label="Primary">
            <Link href="/#agriculture">Agriculture</Link>
            <Link href="/#company">Company</Link>
            <a href={contactHref('FarmPilot — Inquiry')} className="nav__cta">Contact</a>
          </nav>
        </div>
      </header>

      <main className="cv">
        <section className="wrap cv__hero">
          <p className="eyebrow">{farmpilot.eyebrow}</p>
          <h1 className="cv__name">{farmpilot.name}</h1>
          <p className="cv__tagline">{farmpilot.tagline}</p>
          <p className="cv__lead">{farmpilot.lead}</p>
          <p className="cv__hero-links">
            <a href="https://github.com/dayeon603-pixel/farmpilot-mvp" className="btn-link" target="_blank" rel="noopener noreferrer">View the code&nbsp;↗</a>
            <a href="/farmpilot/demo/" className="btn-link" target="_blank" rel="noopener noreferrer">Try the live demo&nbsp;↗</a>
          </p>
        </section>

        <section className="wrap cv__block">
          <div className="cv__block-head">
            <span className="sector__fig">FIG. 01</span>
            <span className="sector__rule" />
            {farmpilot.problem.label}
          </div>
          <p className="cv__body">{farmpilot.problem.body}</p>
        </section>

        <section className="wrap cv__block">
          <div className="cv__block-head">
            <span className="sector__fig">FIG. 02</span>
            <span className="sector__rule" />
            {farmpilot.how.label}
          </div>
          <div className="cv__points">
            {farmpilot.how.points.map((pt, i) => (
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
            {farmpilot.status.label}
          </div>
          <p className="cv__body">{farmpilot.status.body}</p>
        </section>

        <section className="wrap cv__cta">
          <Link href="/#agriculture" className="btn btn--ghost">← Back to Agriculture</Link>
          <a href="https://github.com/dayeon603-pixel/farmpilot-mvp" className="btn btn--ghost" target="_blank" rel="noopener noreferrer">View the code ↗</a>
          <a href="/farmpilot/demo/" className="btn btn--solid" target="_blank" rel="noopener noreferrer">Try the live demo ↗</a>
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
