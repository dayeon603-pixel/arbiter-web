import type { Metadata } from 'next'
import Link from 'next/link'
import { harvestguard, contactHref } from '@/lib/data'
import DeckEmbed from '@/components/DeckEmbed'

export const metadata: Metadata = {
  title: 'HarvestGuard — Arbiter',
  description: harvestguard.tagline,
}

export default function HarvestGuardPage() {
  return (
    <>
      <header className="nav">
        <div className="wrap nav__inner">
          <Link href="/" className="wordmark">ARBITER</Link>
          <nav className="nav__links" aria-label="Primary">
            <Link href="/#agriculture">Agriculture</Link>
            <Link href="/#company">Company</Link>
            <a href={contactHref('HarvestGuard — Inquiry')} className="nav__cta">Contact</a>
          </nav>
        </div>
      </header>

      <main className="cv">
        <section className="wrap cv__hero">
          <p className="eyebrow">{harvestguard.eyebrow}</p>
          <h1 className="cv__name">{harvestguard.name}</h1>
          <p className="cv__tagline">{harvestguard.tagline}</p>
          <p className="cv__lead">{harvestguard.lead}</p>
        </section>

        <section className="wrap cv__block">
          <DeckEmbed src="/decks/harvestguard-deck" label="HarvestGuard · Research & Pilot Proposal" slides={12} caption="Technical proposal" />
        </section>

        <section className="wrap cv__block">
          <div className="cv__block-head">
            <span className="sector__fig">FIG. 01</span>
            <span className="sector__rule" />
            {harvestguard.problem.label}
          </div>
          <p className="cv__body">{harvestguard.problem.body}</p>
        </section>

        <section className="wrap cv__block">
          <div className="cv__block-head">
            <span className="sector__fig">FIG. 02</span>
            <span className="sector__rule" />
            {harvestguard.how.label}
          </div>
          <div className="cv__points">
            {harvestguard.how.points.map((pt, i) => (
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
            {harvestguard.status.label}
          </div>
          <p className="cv__body">{harvestguard.status.body}</p>
        </section>

        <section className="wrap cv__cta">
          <Link href="/#agriculture" className="btn btn--ghost">← Back to Agriculture</Link>
          <a href={contactHref('HarvestGuard — Inquiry')} className="btn btn--solid">Get in touch</a>
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
