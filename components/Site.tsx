'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Lenis from 'lenis'
import GradientCanvas from './GradientCanvas'
import LogoMark from './LogoMark'
import BusinessCard from './BusinessCard'
import { sectors, hero, company, founder, navLinks, contactHref, legal, type Sector } from '@/lib/data'

const EASE = [0.16, 0.7, 0.18, 1] as const

const heroStagger = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } } }
const heroItem = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } } }
// Headline: each word rises from behind a clip-mask, staggered (premium reveal).
const heroHeadline = { hidden: {}, show: { transition: { staggerChildren: 0.058, delayChildren: 0.04 } } }
const heroWord = { hidden: { y: '118%', opacity: 0 }, show: { y: '0%', opacity: 1, transition: { duration: 0.72, ease: EASE } } }

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

function Nav({ onContact }: { onContact: () => void }) {
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
          <button type="button" className="nav__cta" onClick={onContact}>Contact</button>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="hero hero--split">
      <GradientCanvas />
      <div className="wrap hero__grid">
        <motion.div className="hero__lead" variants={heroStagger} initial="hidden" animate="show">
          <motion.p variants={heroItem} className="eyebrow">{hero.eyebrow}</motion.p>
          <motion.h1 variants={heroHeadline} className="hero__title hero__title--anim">
            {hero.title.split(' ').flatMap((word, i) => [
              <span key={i} className="hw-mask">
                <motion.span className="hw-word" variants={heroWord}>{word}</motion.span>
              </span>,
              ' ',
            ])}
          </motion.h1>
          <motion.p variants={heroItem} className="hero__sub">{hero.sub}</motion.p>
          <motion.div variants={heroItem} className="hero__actions">
            <a href={`#${sectors[0].id}`} className="btn btn--solid">See the work</a>
            <a href="#company" className="btn-link">About the company&nbsp;→</a>
          </motion.div>
        </motion.div>
        <motion.aside
          className="hero__index"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
        >
          <div className="hero__index-head">The work</div>
          {sectors.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="hero__index-row">
              <span className="hero__index-fig">{s.fig}</span>
              <span className="hero__index-name">{s.kicker}</span>
              <span className="hero__index-stage">{s.stage}</span>
            </a>
          ))}
        </motion.aside>
      </div>
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
          {s.products?.map((p) => (
            <Link key={p.href} href={p.href} className="product-card" aria-label={`Learn about ${p.name}`}>
              <span className="product-card__tag">Product</span>
              <span className="product-card__body">
                <span className="product-card__name">{p.name}</span>
                <span className="product-card__note">{p.note}</span>
              </span>
              <span className="product-card__arrow" aria-hidden>→</span>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function StatBand() {
  const stats = [
    { n: String(sectors.length), l: 'regulated & high-stakes domains' },
    { n: 'Active', l: 'development across every domain' },
    { n: '2026', l: 'founded, Republic of Korea' },
    { n: 'Open', l: 'select repositories public' },
  ]
  return (
    <section className="statband" aria-label="Arbiter at a glance">
      <div className="wrap statband__grid">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            className="statband__cell"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
          >
            <div className="statband__n">{s.n}</div>
            <div className="statband__l">{s.l}</div>
          </motion.div>
        ))}
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
        <a href={contactHref('Arbiter — Inquiry')} className="founder__contact">{founder.contact}</a>
      </div>
    </section>
  )
}

function Footer({ onContact }: { onContact: () => void }) {
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
          <h4>Products</h4>
          <ul>
            {sectors.flatMap((s) => (s.product ? [s.product] : (s.products ?? []))).map((p) => (
              <li key={p.href}><Link href={p.href}>{p.name}</Link></li>
            ))}
          </ul>
        </div>
        <div className="footer__col">
          <h4>Company</h4>
          <ul>
            <li><a href="#company">About</a></li>
            <li><a href="#founder">Founder</a></li>
            <li><button type="button" className="footer__linkbtn" onClick={onContact}>Contact</button></li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>Connect</h4>
          <ul>
            <li><a href="https://github.com/dayeon603-pixel" target="_blank" rel="noopener">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/dayeon-kang-309a333a9" target="_blank" rel="noopener">LinkedIn</a></li>
            <li><a href={`mailto:${legal.contact}`}>Email</a></li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>Legal</h4>
          <ul>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Use</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer__biz">
        <div className="wrap">
          <p className="footer__biz-line">
            <strong>Arbiter</strong> is a brand operated by {legal.businessNameKo}({legal.businessNameEn}),
            a business registered in the {legal.jurisdiction}.
          </p>
          <p className="footer__biz-reg">
            상호 {legal.businessNameKo}({legal.businessNameEn}) · 대표 {legal.representativeKo} · 사업자등록번호 {legal.registrationNumber}
            {legal.showAddress && <> · {legal.registeredAddress}</>} · 이메일 {legal.contact}
          </p>
          <p className="footer__biz-notice">
            게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하며, 위반 시 정보통신망법에 따라 처벌될 수 있습니다.
          </p>
        </div>
      </div>
      <div className="footer__bar"><div className="wrap"><span>© 2026 {legal.businessNameEn}. All rights reserved.</span><span>Described by mission, not unreleased product names.</span></div></div>
    </footer>
  )
}

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="contact-modal" role="dialog" aria-modal="true" aria-label="Get in touch — Dayeon Kang, Arbiter">
      <div className="contact-modal__backdrop" onClick={onClose} />
      <button type="button" className="contact-modal__close" onClick={onClose} aria-label="Close" autoFocus>
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
      </button>
      <div className="contact-modal__dialog">
        <BusinessCard embed />
      </div>
    </div>
  )
}

export default function Site() {
  useLenis()
  const [contactOpen, setContactOpen] = useState(false)
  const openContact = () => setContactOpen(true)
  return (
    <>
      <Nav onContact={openContact} />
      <main>
        <Hero />
        <StatBand />
        {sectors.map((s, i) => (<SectorBlock key={s.id} s={s} index={i} />))}
        <Company />
        <Founder />
      </main>
      <Footer onContact={openContact} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}
