'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { navLinks } from '@/lib/divisions'
import { contactHref } from '@/lib/site'
import Wordmark from './Wordmark'

/**
 * Transparent over the hero, solid with a hairline below 80px of scroll.
 * Mobile opens a full-screen sheet.
 *
 * `solid` is forced on for pages that do not have a hero to sit over, so the
 * nav never floats transparent above body copy.
 */
export default function Nav({ alwaysSolid = false }: { alwaysSolid?: boolean }) {
  const [scrolled, setScrolled] = useState(alwaysSolid)
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (alwaysSolid) return
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [alwaysSolid])

  // While the sheet is open: lock the page, close on Escape, move focus in.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className={`nav${scrolled ? ' nav--solid' : ''}`}>
      <div className="shell nav__inner">
        <Link href="/" className="nav__brand" aria-label="Arbiter — home">
          <Wordmark />
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
          <a className="btn btn--primary nav__cta" href={contactHref()}>
            Contact
          </a>
        </nav>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-sheet"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </div>

      {open && (
        <div className="nav__sheet" id="nav-sheet" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="shell nav__sheet-head">
            <Wordmark />
            <button type="button" className="nav__toggle" onClick={() => setOpen(false)} ref={closeRef}>
              Close
            </button>
          </div>
          <nav className="shell nav__sheet-links" aria-label="Primary">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <a className="btn btn--primary" href={contactHref()} onClick={() => setOpen(false)}>
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
