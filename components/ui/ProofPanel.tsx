'use client'

import { useCallback, useEffect, useState } from 'react'
import { receiptPlainText, receiptRows, sampleReceipt } from '@/lib/receipt'

/**
 * The proof panel. This is the most important element on the site: it shows a
 * real signed receipt rather than describing one.
 *
 * The copy button writes the *full* values to the clipboard, and the panel
 * states which sanctions list the decision was screened against. Both of those
 * are load-bearing — a product whose entire claim is independent verifiability
 * cannot show an unverifiable artefact.
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
      // Clipboard can be unavailable (insecure context, permissions policy).
      // Fail quietly rather than throwing an error at someone reading a page.
      setCopied(false)
    }
  }, [])

  return (
    <figure className="proof" id={id}>
      <figcaption className="proof__head">
        <span className="eyebrow">Tollgate receipt {sampleReceipt.id}</span>
        <span className="verified">
          <span className="verified__dot" aria-hidden="true" />
          Signature valid
        </span>
      </figcaption>

      <dl className="proof__body">
        {receiptRows.map(({ k, display }) => (
          <div className="proof__row" key={k}>
            <dt className="proof__k">{k}</dt>
            <dd className="proof__v">{display}</dd>
          </div>
        ))}
      </dl>

      <div className="proof__foot">
        <button type="button" className="btn btn--secondary" onClick={copy}>
          {copied ? 'Copied' : 'Copy receipt'}
        </button>
        <a className="named-link" href={explainerHref}>
          How verification works
          <span className="named-link__arrow" aria-hidden="true">
            →
          </span>
        </a>
      </div>

      <p className="proof__note small">
        Screened against demonstration list {sampleReceipt.rulebook}, not a live OFAC SDN pull.
        The signature, the hash chain, and the verifier are real; the list is not.
      </p>
    </figure>
  )
}
