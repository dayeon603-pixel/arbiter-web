'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Lenis from 'lenis'
import GradientCanvas from './GradientCanvas'
import LogoMark from './LogoMark'
import { topics, hero, company, founder, contactHref, legal, type Topic } from '@/lib/data'

/** Must match --flip-ms in globals.css: the hidden face is re-dressed only after the turn lands. */
const FLIP_MS = 900
const DWELL_MS = 4200

/**
 * Entrance motion is CSS-only by design. Every element is styled visible at rest and the
 * keyframes run from hidden to visible, so a page whose script never runs still reads
 * correctly — an earlier JS-driven version left the whole page blank when it stalled.
 */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return reduced
}

function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    const lenis = new Lenis({ duration: 1.1, lerp: 0.1, smoothWheel: true })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [enabled])
}

/** Sweeps its contents in when scrolled into view. Without the observer the contents simply stay visible. */
function Sweep({ className = '', delay = 0, children }: { className?: string; delay?: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) }
      }),
      { rootMargin: '-6% 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`sweep ${className}`} style={delay ? { animationDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  )
}

function TopBar() {
  return (
    <header className="topbar">
      <div className="wrap topbar__inner">
        <a href="#top" className="topbar__brand" aria-label="Arbiter — top of page">
          <LogoMark size={24} />
          <span className="topbar__word">ARBITER</span>
        </a>
      </div>
    </header>
  )
}

/** Logo, name, one line. Nothing else above the fold. */
function Identity() {
  return (
    <section id="top" className="id">
      <GradientCanvas />
      <div className="wrap id__inner">
        <div className="id__mark"><LogoMark size={72} /></div>
        <h1 className="id__word" aria-label="Arbiter">
          {'ARBITER'.split('').map((ch, i) => (
            <span key={i} className="ch" aria-hidden style={{ animationDelay: `${180 + i * 52}ms` }}>{ch}</span>
          ))}
        </h1>
        <p className="id__line">{hero.line}</p>
        <p className="id__desc">{hero.desc}</p>
      </div>
    </section>
  )
}

function DeckFace({ topic, side, live }: { topic: Topic; side: 'a' | 'b'; live: boolean }) {
  return (
    <div className={`deck__face deck__face--${side}`}>
      <div className="deck__glass">
        <span className="deck__sheen" aria-hidden />
      </div>
      {/* keyed on arrival so the picture pops out again on every turn */}
      <div key={`${topic.id}-${live}`} className="deck__photo">
        <img src={topic.image} alt="" />
        <span className="deck__photo-gloss" aria-hidden />
      </div>
      <div className="deck__meta">
        <span className="deck__fig">FIG. {topic.fig}</span>
        <span className="deck__name">{topic.name}</span>
      </div>
    </div>
  )
}

/** Glass panel that turns through the fields the company works in. */
function TopicDeck() {
  const reduced = usePrefersReducedMotion()
  const [turn, setTurn] = useState(0)
  const [slots, setSlots] = useState<[number, number]>([0, 1 % topics.length])
  const [paused, setPaused] = useState(false)

  const frontVisible = turn % 2 === 0
  const current = frontVisible ? slots[0] : slots[1]

  const advance = useCallback(() => setTurn((t) => t + 1), [])

  const goTo = useCallback((index: number) => {
    setTurn((t) => {
      // dress the face that is about to arrive, then turn onto it
      setSlots(([a, b]) => (t % 2 === 0 ? [a, index] : [index, b]))
      return t + 1
    })
  }, [])

  // once a turn has landed, pre-load the next topic onto the face now hidden
  useEffect(() => {
    const id = window.setTimeout(() => {
      setSlots(([a, b]) => (turn % 2 === 0 ? [a, (a + 1) % topics.length] : [(b + 1) % topics.length, b]))
    }, FLIP_MS)
    return () => window.clearTimeout(id)
  }, [turn])

  // autoplay, paused on hover/focus and off entirely for reduced motion
  useEffect(() => {
    if (reduced || paused) return
    const id = window.setInterval(advance, DWELL_MS)
    return () => window.clearInterval(id)
  }, [reduced, paused, advance])

  return (
    <section id="fields" className="deck">
      <div className="wrap">
        <Sweep className="deck__head">
          <span className="deck__label">The fields we work in</span>
          <span className="deck__count mono">
            {String(current + 1).padStart(2, '0')} / {String(topics.length).padStart(2, '0')}
          </span>
        </Sweep>

        <div
          className="deck__stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <button
            type="button"
            className="deck__card"
            style={{ ['--turn' as string]: turn, ['--flip-ms' as string]: `${reduced ? 1 : FLIP_MS}ms` }}
            onClick={advance}
            aria-label={`Field ${current + 1} of ${topics.length}: ${topics[current].name}. Activate for the next field.`}
          >
            <DeckFace topic={topics[slots[0]]} side="a" live={frontVisible} />
            <DeckFace topic={topics[slots[1]]} side="b" live={!frontVisible} />
          </button>
        </div>

        <div className="deck__dots" role="tablist" aria-label="Fields">
          {topics.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={t.name}
              className={`deck__dot${i === current ? ' is-on' : ''}`}
              onClick={() => { if (i !== current) goTo(i) }}
            >
              <span className="deck__dot-name">{t.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function Company() {
  return (
    <section id="company" className="band">
      <div className="wrap split">
        <Sweep>
          <p className="eyebrow">{company.kicker}</p>
          <h2 className="section-title">{company.title}</h2>
        </Sweep>
        <Sweep className="prose" delay={120}>
          {company.body.map((p, i) => (<p key={i}>{p}</p>))}
        </Sweep>
      </div>
    </section>
  )
}

function Founder() {
  return (
    <section id="founder" className="founder">
      <div className="wrap founder__row">
        <Sweep className="founder__portrait">
          <img src="/img/founder.jpg" alt={`${founder.name}, Founder and Chief Executive of Arbiter`} />
        </Sweep>
        <Sweep delay={120}>
          <p className="eyebrow">{founder.kicker}</p>
          <h2 className="founder__name">{founder.name}</h2>
          <p className="founder__role">Founder &amp; Chief Executive</p>
          <div className="prose" style={{ marginTop: 'var(--s-5)' }}>
            {founder.lines.map((l, i) => (<p key={i}>{l}</p>))}
          </div>
          <a href={contactHref('Arbiter — Inquiry')} className="founder__contact">{founder.contact}</a>
        </Sweep>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footmin">
      <div className="wrap footmin__top">
        <div className="footmin__brand">
          <LogoMark size={22} />
          <span>ARBITER</span>
        </div>
        <div className="footmin__links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href={`mailto:${legal.contact}`}>Email</a>
        </div>
      </div>
      <div className="wrap footmin__biz">
        <p className="footmin__biz-line">
          <strong>Arbiter</strong> is a business registered in the {legal.jurisdiction}.
        </p>
        <p className="footmin__biz-reg">
          상호 {legal.businessNameKo}({legal.businessNameEn}) · 대표 {legal.representativeKo} · 사업자등록번호 {legal.registrationNumber}
          {legal.showAddress && <> · {legal.registeredAddress}</>} · 이메일 {legal.contact}
        </p>
        <p className="footmin__biz-notice">
          게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하며, 위반 시 정보통신망법에 따라 처벌될 수 있습니다.
        </p>
      </div>
      <div className="footmin__bar">
        <div className="wrap">© 2026 {legal.businessNameEn}. All rights reserved.</div>
      </div>
    </footer>
  )
}

export default function Site() {
  const reduced = usePrefersReducedMotion()
  useLenis(!reduced)
  return (
    <>
      <TopBar />
      <main>
        <Identity />
        <TopicDeck />
        <Company />
        <Founder />
      </main>
      <Footer />
    </>
  )
}
