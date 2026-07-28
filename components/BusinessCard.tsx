'use client'

import { useEffect, useRef } from 'react'

/**
 * Founder's business card — a restrained, executive flip card.
 *
 * Front: the identity face (mark, wordmark, name, title) on a deep warm-black
 * stock with a hairline bronze border and a soft top sheen. Back: contacts,
 * over a faint embossed mark. One accent only — the brand bronze (#b5821e),
 * matching the marketing site. Click / Enter flips; the pointer adds a subtle
 * parallax tilt. Styles are namespaced under `.bizcard` in globals.css.
 */
export default function BusinessCard({ embed = false }: { embed?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const stage = stageRef.current
    if (!card || !stage) return

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches

    const flip = () => card.classList.toggle('flipped')
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
      const MAX = 6
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

    return () => {
      card.removeEventListener('click', onClick)
      card.removeEventListener('keydown', onKey)
      if (onMove) stage.removeEventListener('pointermove', onMove)
      if (onLeave) stage.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  const Mark = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M31 84 L31 50 A19 19 0 0 1 69 50 L69 84" fill="none" stroke="currentColor" strokeWidth="11.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect className="mark__base" x="24.5" y="79.5" width="51" height="11.5" rx="5.75" />
    </svg>
  )

  return (
    <div className={`bizcard${embed ? ' bizcard--embed' : ''}`}>
      <div className="stage" ref={stageRef}>
        <div
          className="card"
          ref={cardRef}
          role="button"
          tabIndex={0}
          aria-label="Business card for Dayeon Kang, Founder and CEO of Arbiter. Activate to flip."
        >
          {/* FRONT — identity */}
          <div className="face front">
            <span className="front__sheen" aria-hidden="true" />
            <div className="front__grid">
              <div className="brandrow">
                <Mark className="brandmark" />
                <span className="bc-wordmark">ARBITER</span>
              </div>
              <div className="id">
                <div className="bc-name">Dayeon&nbsp;Kang</div>
                <div className="bc-title"><span className="bc-title__rule" />Founder &amp; Chief Executive</div>
              </div>
              <div className="bc-tag">Independent trust infrastructure for the AI agent economy</div>
            </div>
          </div>

          {/* BACK — contacts */}
          <div className="face back">
            <Mark className="back__watermark" />
            <div className="back__grid">
              <span className="bc-wordmark bc-wordmark--back">ARBITER</span>
              <div className="contacts">
                <a className="row" href="mailto:dayeon603@gmail.com" data-nolink><span className="k">Email</span><span className="v">dayeon603@gmail.com</span></a>
                <a className="row" href="tel:+821043197678" data-nolink><span className="k">Phone</span><span className="v">+82 10 4319 7678</span></a>
                <a className="row" href="https://www.linkedin.com/in/dayeon-kang-309a333a9" target="_blank" rel="noopener" data-nolink><span className="k">LinkedIn</span><span className="v">dayeon-kang</span></a>
              </div>
              <div className="bc-foot">Seoul, Republic of Korea<span className="bc-foot__dot" />Est. 2026</div>
            </div>
          </div>
        </div>
      </div>

      <div className="hint">Click to flip</div>
    </div>
  )
}
