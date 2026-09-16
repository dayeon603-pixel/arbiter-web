'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Lenis from 'lenis'
import GradientCanvas from './GradientCanvas'
import LogoMark from './LogoMark'
import { topics, hero, company, founder, contactHref, legal } from '@/lib/data'

const DWELL_MS = 5200

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
        <span className="topbar__meta">EST. 2026 · SEOUL</span>
      </div>
    </header>
  )
}

/** Logo, name, one line, and a rule of micro-type. Nothing else above the fold. */
function Identity() {
  return (
    <section id="top" className="id">
      <GradientCanvas />
      <div className="wrap id__inner">
        <div className="id__mark"><LogoMark size={76} /></div>
        <h1 className="id__word" aria-label="Arbiter">
          {'ARBITER'.split('').map((ch, i) => (
            <span key={i} className="ch" aria-hidden style={{ animationDelay: `${180 + i * 52}ms` }}>{ch}</span>
          ))}
        </h1>
        <p className="id__line">{hero.line}</p>
        <div className="id__rule" aria-hidden />
      </div>
    </section>
  )
}

/**
 * Full-bleed field stage: the photograph fills the screen, the field name sits over it in
 * glass lettering. A new field wipes across from the right; the outgoing frame stays beneath
 * so there is never a gap.
 */
function FieldStage() {
  const reduced = usePrefersReducedMotion()
  const [idx, setIdx] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [paused, setPaused] = useState(false)
  const drag = useRef<{ x: number; moved: boolean } | null>(null)

  const step = useCallback((delta: number) => {
    setIdx((cur) => {
      setPrev(cur)
      return (cur + delta + topics.length) % topics.length
    })
  }, [])

  // moves on its own
  useEffect(() => {
    if (reduced || paused) return
    const id = window.setInterval(() => step(1), DWELL_MS)
    return () => window.clearInterval(id)
  }, [reduced, paused, step])

  // ...or slide it left/right
  const onPointerDown = (e: React.PointerEvent) => { drag.current = { x: e.clientX, moved: false } }
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current
    if (d && Math.abs(e.clientX - d.x) > 8) d.moved = true
  }
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current
    drag.current = null
    if (!d) return
    const dx = e.clientX - d.x
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
    else if (!d.moved) step(1)
  }
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1) }
  }

  const topic = topics[idx]

  return (
    <section
      id="fields"
      className="stage"
      role="group"
      tabIndex={0}
      aria-label={`${topic.name}. Slide or use the arrow keys for the next field.`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={() => { drag.current = null }}
      onKeyDown={onKeyDown}
    >
      {prev !== null && (
        <div className="stage__layer stage__layer--under" aria-hidden>
          <img src={topics[prev].image} alt="" />
        </div>
      )}
      <div key={idx} className="stage__layer stage__layer--in">
        <img src={topic.image} alt="" />
      </div>
      <div className="stage__grade" aria-hidden />
      <div className="stage__ui">
        <h2 key={`name-${idx}`} className="field__name">{topic.name}</h2>
        <div className="stage__dots">
          {topics.map((t, i) => (
            <button
              key={t.id}
              type="button"
              className={`stage__dot${i === idx ? ' is-on' : ''}`}
              aria-label={t.name}
              aria-current={i === idx}
              onClick={() => { setPrev(idx); setIdx(i) }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function Company() {
  return (
    <section id="company" className="band">
      <div className="wrap">
        <Sweep className="prose prose--wide">
          {company.body.map((p, i) => (<p key={i}>{p}</p>))}
        </Sweep>
      </div>
    </section>
  )
}

function Founder() {
  return (
    <section id="founder" className="founder">
      <div className="wrap founder__inner">
        <Sweep>
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
        <FieldStage />
        <Company />
        <Founder />
      </main>
      <Footer />
    </>
  )
}
