'use client'

import { useEffect, useState } from 'react'

type Props = {
  src: string
  label?: string
  slides?: number
  caption?: string
}

/** A framed deck preview: a static poster (slide one) that expands to a
 *  fullscreen, scrollable viewer — the way a video preview opens to play. */
export default function DeckEmbed({ src, label = 'Overview', slides, caption }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const meta = [caption, slides ? `${slides} slides` : null].filter(Boolean).join(' · ')

  return (
    <>
      <figure className="deck">
        <button
          type="button"
          className="deck__poster"
          onClick={() => setOpen(true)}
          aria-label={`Open the ${label} deck`}
        >
          {/* non-interactive render of the first slide as the poster */}
          <iframe className="deck__frame" src={src} title={`${label} preview`} tabIndex={-1} scrolling="no" loading="lazy" />
          <span className="deck__scrim" />
          <span className="deck__cue">
            <span className="deck__play" aria-hidden>⤢</span>
            <span className="deck__cue-text">View the deck</span>
          </span>
        </button>
        <figcaption className="deck__cap mono">
          <span>{label}</span>
          {meta && <span className="deck__cap-meta">{meta}</span>}
        </figcaption>
      </figure>

      {open && (
        <div className="deckmodal" role="dialog" aria-modal="true" aria-label={`${label} deck`} onClick={() => setOpen(false)}>
          <div className="deckmodal__bar" onClick={(e) => e.stopPropagation()}>
            <span className="deckmodal__title mono">{label}</span>
            <span className="deckmodal__actions">
              <a className="deckmodal__link mono" href={src} target="_blank" rel="noopener noreferrer">Open ↗</a>
              <button type="button" className="deckmodal__close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
            </span>
          </div>
          <div className="deckmodal__stage" onClick={(e) => e.stopPropagation()}>
            <iframe className="deckmodal__frame" src={src} title={`${label} deck`} />
          </div>
        </div>
      )}
    </>
  )
}
