'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Lenis from 'lenis'
import GradientCanvas from './GradientCanvas'
import LogoMark from './LogoMark'
import { sectors, hero, company, founder, navLinks, type Sector } from '@/lib/data'

const EASE = [0.16, 0.7, 0.18, 1] as const

function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.1, lerp: 0.1, smoothWheel: true })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
}

function Badge({ stage }: { stage: string }) {
  const ship = /shipping/i.test(stage)
  return <span className={`badge${ship ? ' badge--ship' : ''}`}>{stage}</span>
}

function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <a href="#top" className="brand" aria-label="Arbiter — home">
          <LogoMark size={26} />
          <span className="wordmark">ARBITER</span>
        </a>
        <nav className="nav__links" aria-label="Primary">
          {navLinks.map((l) => (<a key={l.id} href={`#${l.id}`}>{l.label}</a>))}
          <a href="#company">Company</a>
          <a href={`mailto:${founder.contact}`} className="nav__cta">Contact</a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="hero hero--center">
      <GradientCanvas />
      <motion.div
        className="wrap hero__inner"
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}
      >
        <LogoMark size={62} className="hero__mark" />
        <p className="eyebrow eyebrow--plain">{hero.eyebrow}</p>
        <h1 className="hero__title">{hero.title}</h1>
        <p className="hero__sub">{hero.sub}</p>
        <div className="hero__actions">
          <a href={`#${sectors[0].id}`} className="btn btn--solid">See the work</a>
          <a href="#company" className="btn-link">About the company&nbsp;→</a>
        </div>
      </motion.div>
    </section>
  )
}

function SectorBlock({ s, index }: { s: Sector; index: number }) {
  const rev = index % 2 === 1
  return (
    <section id={s.id} className={`sector${rev ? ' sector--rev' : ''}`}>
      <div className="sector__bg">
        <img src={s.image} alt="" loading="lazy" />
      </div>
      <div className="wrap">
        <motion.div
          className="sector__content"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }} transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="sector__eyebrow">
            <span className="sector__fig">FIG. {s.fig}</span>
            <span className="sector__rule" />
            {s.kicker}
            <Badge stage={s.stage} />
          </div>
          <h2 className="sector__title">{s.title}</h2>
          <p className="sector__mission">{s.mission}</p>
          <div className="sector__for">
            <span className="sector__for-label">For</span>
            <span className="sector__for-text">{s.target}</span>
          </div>
          {s.product && (
            <Link href={s.product.href} className="product-card" aria-label={`Learn about ${s.product.name}`}>
              <span className="product-card__tag">Product</span>
              <span className="product-card__body">
                <span className="product-card__name">{s.product.name}</span>
                <span className="product-card__note">{s.product.note}</span>
              </span>
              <span className="product-card__arrow" aria-hidden>→</span>
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  )
}

function Company() {
  return (
    <section id="company" className="band">
      <div className="wrap split">
        <div>
          <p className="eyebrow">{company.kicker}</p>
          <h2 className="section-title">{company.title}</h2>
        </div>
        <div className="prose" style={{ alignSelf: 'end' }}>
          {company.body.map((p, i) => (
            <motion.p key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-12%' }} transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}>{p}</motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}

function Founder() {
  return (
    <section id="founder" className="founder">
      <div className="wrap founder__inner">
        <p className="eyebrow">{founder.kicker}</p>
        <h2 className="founder__name">{founder.name}</h2>
        <div className="prose" style={{ marginTop: 'var(--s-5)' }}>
          {founder.lines.map((l, i) => (<p key={i}>{l}</p>))}
        </div>
        <a href={`mailto:${founder.contact}`} className="founder__contact">{founder.contact}</a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div>
          <div className="footer__brand"><LogoMark size={24} /><span>ARBITER</span></div>
          <p className="footer__note">Decision, safety, and infrastructure across five regulated and high-stakes domains. Built in the open.</p>
        </div>
        <div className="footer__col">
          <h4>Sectors</h4>
          <ul>{navLinks.map((l) => (<li key={l.id}><a href={`#${l.id}`}>{l.label}</a></li>))}</ul>
        </div>
        <div className="footer__col">
          <h4>Company</h4>
          <ul>
            <li><a href="#company">About</a></li>
            <li><a href="#founder">Founder</a></li>
            <li><a href={`mailto:${founder.contact}`}>Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="footer__bar"><div className="wrap"><span>© 2026 Arbiter</span><span>Described by mission, not unreleased product names.</span></div></div>
    </footer>
  )
}

export default function Site() {
  useLenis()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        {sectors.map((s, i) => (<SectorBlock key={s.id} s={s} index={i} />))}
        <Company />
        <Founder />
      </main>
      <Footer />
    </>
  )
}
