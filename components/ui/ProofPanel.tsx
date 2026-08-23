'use client'

import { useCallback, useEffect, useState } from 'react'
import { receiptPlainText, receiptRows, sampleReceipt } from '@/lib/receipt'

/**
 * The proof panel — the most important element on the site.
 *
 * It sits on the INK ground while the page around it is cream. That is the
 * point: this is machine output, and it should read as a terminal artefact
 * lying on paper rather than as one more card in a stack of cards.
 *
 * Long identifiers are truncated with a middle ellipsis so the head and the
 * tail both stay visible — those two ends are what a person actually compares
 * against another copy. Hovering a value reveals it in full, and the copy
 * button always writes the complete untruncated values, because a copy button
 * that hands you an elided hash is worse than no copy button at all.
 */
export default function ProofPanel({
  id,
  /** Where "How verification works" points. The homepage has the explainer
   *  section inline; other pages link back to it on the homepage. */
  explainerHref = '#how-it-works',
}: {
  id?: string
  explainerHref?: string
}) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(receiptPlainText)
      setCopied(true)
    } catch {
      // Clipboard is unavailable in insecure contexts and under some
      // permissions policies. Fail quietly rather than throwing an error at
      // someone who is only reading the page.
      setCopied(false)
    }
  }, [])

  return (
    <figure className="proof on-inverse" id={id}>
      <figcaption className="proof__head">
        <span className="eyebrow">Tollgate receipt {sampleReceipt.id}</span>
        <span className="verified">
          <span className="verified__dot" aria-hidden="true" />
          Signature valid
        </span>
      </figcaption>

      <dl className="proof__body">
        {receiptRows.map(({ k, display, full }) => (
          <div className="proof__row" key={k}>
            <dt className="proof__k">{k}</dt>
            <dd className="proof__v" title={full}>
              <span className="proof__short">{display}</span>
              <span className="proof__full">{full}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="proof__foot">
        <button type="button" className="btn btn--primary proof__copy" onClick={copy}>
          {copied ? 'Copied' : 'Copy receipt'}
        </button>
        <a className="named-link" href={explainerHref}>
          How verification works
          <span className="named-link__arrow" aria-hidden="true">→</span>
        </a>
      </div>

      <p className="proof__note">
        Screened against demonstration list {sampleReceipt.rulebook}, not a live OFAC SDN pull.
        The signature, the hash chain, and the verifier are real; the list is not.
      </p>
    </figure>
  )
}
