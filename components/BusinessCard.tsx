'use client'

import { useEffect, useRef } from 'react'

/**
 * Founder's business card — an interactive 3D flip card.
 *
 * Front: ivory cotton stock, blind-letterpress type. Back: engraved
 * guilloché seal on black. A painted orange edge unifies the two faces.
 * Click / Enter flips; pointer movement adds a subtle parallax tilt.
 *
 * All styles are namespaced under `.bizcard` in globals.css so they do not
 * collide with the marketing site's own classes (e.g. .wordmark).
 */
export default function BusinessCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const stage = stageRef.current
    const hint = hintRef.current
    if (!card || !stage) return

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches

    const flip = () => {
      card.classList.toggle('flipped')
      if (hint) hint.style.opacity = '0.5'
    }
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest('[data-nolink]')) return
      flip()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip() }
    }
    card.addEventListener('click', onClick)
    card.addEventListener('keydown', onKey)

    let onMove: ((e: PointerEvent) => void) | undefined
    let onLeave: (() => void) | undefined
    if (fine && !reduce) {
      const MAX = 8
      onMove = (e: PointerEvent) => {
        const r = stage.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        card.style.setProperty('--ry', (px * MAX).toFixed(2) + 'deg')
        card.style.setProperty('--rx', (-py * MAX).toFixed(2) + 'deg')
      }
      onLeave = () => {
        card.style.setProperty('--ry', '0deg')
        card.style.setProperty('--rx', '0deg')
      }
      stage.addEventListener('pointermove', onMove)
      stage.addEventListener('pointerleave', onLeave)
    }

    // guilloché medallion — engraved concentric rosettes, banknote/seal feel
    const cv = canvasRef.current
    if (cv) {
      const ctx = cv.getContext('2d')
      if (ctx) {
        const W = cv.width, H = cv.height, cx = W / 2, cy = H / 2, TWO_PI = Math.PI * 2
        ctx.clearRect(0, 0, W, H)
        ctx.lineWidth = 1
        for (let ring = 0; ring < 26; ring++) {
          const base = 40 + ring * 5.6, amp = 5 + (ring % 3) * 2.2
          const k = 7 + (ring % 4), phase = ring * 0.28
          ctx.beginPath()
          for (let i = 0; i <= 240; i++) {
            const t = (i / 240) * TWO_PI, r = base + amp * Math.cos(k * t + phase)
            const x = cx + r * Math.cos(t), y = cy + r * Math.sin(t)
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
          }
          ctx.closePath()
          const a = 0.14 * (1 - ring / 30)
          ctx.strokeStyle = ring % 9 === 4 ? `rgba(224,99,47,${a * 1.3})` : `rgba(236,237,234,${a})`
          ctx.stroke()
        }
      }
    }

    return () => {
      card.removeEventListener('click', onClick)
      card.removeEventListener('keydown', onKey)
      if (onMove) stage.removeEventListener('pointermove', onMove)
      if (onLeave) stage.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div className="bizcard">
      <div className="stage" ref={stageRef}>
        <div
          className="card"
          id="bizcard"
          ref={cardRef}
          role="button"
          tabIndex={0}
          aria-label="Business card for Dayeon Kang, Founder and CEO of Arbiter. Activate to flip."
        >
          {/* FRONT */}
          <div className="face front">
            <div className="front__grid">
              <div className="brandrow">
                <div className="brandrow__l">
                  <svg className="mark-deboss" viewBox="0 0 100 100" aria-hidden="true">
                    <path d="M31 84 L31 50 A19 19 0 0 1 69 50 L69 84" fill="none" stroke="#17171d" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="24" y="79.5" width="52" height="12" rx="6" fill="#17171d" />
                  </svg>
                  <span className="bc-wordmark">ARBITER</span>
                </div>
                <span className="reg">Founder&rsquo;s&nbsp;Card</span>
              </div>

              <div className="id">
                <div className="bc-name">Dayeon&nbsp;Kang</div>
                <div className="bc-title">Founder &amp; CEO</div>
              </div>

              <div className="contacts">
                <a className="row" href="mailto:dayeon603@gmail.com" data-nolink><span className="k">MAIL</span><span className="v">dayeon603@gmail.com</span></a>
                <a className="row" href="tel:+821043197678" data-nolink><span className="k">TEL</span><span className="v">010&#8202;4319&#8202;7678</span></a>
                <a className="row" href="https://www.linkedin.com/in/dayeon-kang-309a333a9" target="_blank" rel="noopener" data-nolink><span className="k">IN</span><span className="v">linkedin.com/in/dayeon-kang</span></a>
                <a className="row" href="https://instagram.com/dyeon_8" target="_blank" rel="noopener" data-nolink><span className="k">IG</span><span className="v">@dyeon_8</span></a>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div className="face back">
            <div className="seal">
              <canvas className="seal__canvas" ref={canvasRef} width={456} height={456} aria-hidden="true" />
              <div className="seal__stack">
                <svg className="seal__mark" viewBox="0 0 100 100" aria-hidden="true">
                  <path d="M31 84 L31 50 A19 19 0 0 1 69 50 L69 84" fill="none" stroke="#ECEDEA" strokeWidth="12.5" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="24" y="79" width="52" height="12.5" rx="6.25" fill="#E0632F" />
                </svg>
                <div className="seal__wm">ARBITER</div>
                <div className="seal__line"><span className="d" /> Neutral trust rails</div>
              </div>
            </div>
            <div className="seal__foot">Republic of Korea · Est. 2026</div>
          </div>
        </div>
      </div>

      <div className="hint" ref={hintRef}><span className="dot" /> Click card to flip <kbd>↵</kbd></div>
    </div>
  )
}
