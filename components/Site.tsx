'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Lenis from 'lenis'
import GradientCanvas from './GradientCanvas'
import LogoMark from './LogoMark'
import { topics, hero, company, founder, contactHref, legal } from '@/lib/data'

/** Fraction of the gap between frames that each picture holds at full strength. */
const HOLD = 0.42

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

/** Logo, name, one line, and a rule of micro-type. Nothing else above the fold. */
function Identity() {
  return (
    <section id="top" className="id">
      <GradientCanvas />
      <div className="wrap id__inner">
        <div className="id__mark"><LogoMark size={58} /></div>
        <h1 className="id__word">Arbiter</h1>
        <p className="id__line">{hero.line}</p>
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
  const wrapRef = useRef<HTMLDivElement>(null)
  const layers = useRef<(HTMLDivElement | null)[]>([])
  const idxRef = useRef(0)
  const [idx, setIdx] = useState(0)
  const drag = useRef<{ x: number; y: number } | null>(null)

  /* Every frame is stacked and its opacity is written straight to the DOM from a float
     scroll progress, so the crossfade tracks the scroll instead of snapping between states.
     Keying a remount per change made a fast flick skip pictures and restart the animation. */
  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    let raf = 0
    let live = true
    const paint = () => {
      const span = wrap.offsetHeight - window.innerHeight
      if (span > 0) {
        const p = Math.min(Math.max(-wrap.getBoundingClientRect().top / span, 0), 1) * (topics.length - 1)
        /* Frames are never semi-transparent: the incoming picture is opaque and is revealed by a
           clip-path edge that tracks the scroll. Cross-dissolving two busy photographs leaves both
           readable at once, which looks like a double exposure however the weights are balanced. */
        const lo = Math.max(0, Math.min(Math.floor(p), topics.length - 2))
        const f = Math.min(Math.max(p - lo, 0), 1)
        const ct = Math.min(Math.max((f - HOLD) / (1 - 2 * HOLD), 0), 1)
        const w = ct * ct * (3 - 2 * ct)
        layers.current.forEach((el, i) => {
          if (!el) return
          if (i < lo || i > lo + 1) { el.style.opacity = '0'; return }
          el.style.opacity = '1'
          if (i === lo) {
            el.style.zIndex = '1'
            el.style.maskImage = ''
            el.style.webkitMaskImage = ''
            el.style.transform = reduced ? '' : `scale(${(1 + 0.05 * w).toFixed(4)})`
          } else {
            el.style.zIndex = '2'
            el.style.clipPath = ''
            /* a narrow feathered seam rather than a razor edge; both sides stay fully opaque */
            const edge = (1 - w) * 100
            const mask = `linear-gradient(90deg, transparent ${Math.max(edge - 3, 0).toFixed(2)}%, #000 ${Math.min(edge + 3, 100).toFixed(2)}%)`
            el.style.maskImage = mask
            el.style.webkitMaskImage = mask
            el.style.transform = ''
          }
        })
        const near = Math.round(p)
        if (near !== idxRef.current) { idxRef.current = near; setIdx(near) }
      }
      if (live) raf = requestAnimationFrame(paint)
    }
    raf = requestAnimationFrame(paint)
    return () => { live = false; cancelAnimationFrame(raf) }
  }, [reduced])

  /** Scroll to the band of the section that owns a picture. */
  const goTo = useCallback((i: number) => {
    const wrap = wrapRef.current
    if (!wrap) return
    const span = wrap.offsetHeight - window.innerHeight
    window.scrollTo({ top: wrap.offsetTop + (span * i) / (topics.length - 1), behavior: reduced ? 'auto' : 'smooth' })
  }, [reduced])

  const onPointerDown = (e: React.PointerEvent) => { drag.current = { x: e.clientX, y: e.clientY } }
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current
    drag.current = null
    if (!d) return
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    const move = Math.abs(dx) > Math.abs(dy) ? dx : dy
    if (Math.abs(move) > 60) goTo(Math.min(Math.max(idx + (move < 0 ? 1 : -1), 0), topics.length - 1))
  }
  const onKeyDown = (e: React.KeyboardEvent) => {
    const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1
      : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    if (d) { e.preventDefault(); goTo(Math.min(Math.max(idx + d, 0), topics.length - 1)) }
  }

  return (
    <section id="fields" className="fields" ref={wrapRef} style={{ ['--slides' as string]: topics.length }}>
      <div
        className="stage"
        role="group"
        tabIndex={0}
        aria-label={`${topics[idx].name}. Scroll, drag or use the arrow keys to move between fields.`}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => { drag.current = null }}
        onKeyDown={onKeyDown}
      >
        {topics.map((tp, i) => (
          <div
            key={tp.id}
            className="stage__layer"
            ref={(el) => { layers.current[i] = el }}
            style={{ opacity: i === 0 ? 1 : 0 }}
            aria-hidden={i !== idx}
          >
            <img src={tp.image} alt="" />
          </div>
        ))}
        <div className="stage__grade" aria-hidden />
        <div className="stage__ui">
          <h2 key={idx} className="field__name">{topics[idx].name}</h2>
          <div className="stage__dots">
            {topics.map((tp, i) => (
              <button
                key={tp.id}
                type="button"
                className={`stage__dot${i === idx ? ' is-on' : ''}`}
                aria-label={tp.name}
                aria-current={i === idx}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Company() {
  const [lead, ...rest] = company.body
  return (
    <section id="company" className="band">
      <div className="wrap company">
        <p className="company__lead">{lead}</p>
        <div className="company__cols">
          {rest.map((p, i) => (<p key={i}>{p}</p>))}
        </div>
      </div>
    </section>
  )
}

function Founder() {
  return (
    <section id="founder" className="founder">
      <div className="wrap founder__grid">
        <div className="founder__id">
          <p className="eyebrow">{founder.kicker}</p>
          <h2 className="founder__name">{founder.name}</h2>
          <p className="founder__role">Founder &amp; Chief Executive</p>
        </div>
        <div className="founder__body">
          {founder.lines.map((l, i) => (<p key={i}>{l}</p>))}
          <a href={contactHref('Arbiter Inquiry')} className="founder__contact">{founder.contact}</a>
        </div>
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
