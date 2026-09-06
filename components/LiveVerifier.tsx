'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { receipt as ORIGINAL } from '@/lib/receipt-data'
import { verifyReceipt, type Receipt, type VerifyResult } from '@/lib/verify'

/**
 * A real Tollgate receipt, verified in the reader's own browser.
 *
 * Every claim a competitor makes on a page like this is unfalsifiable by the
 * reader. This one is not: change a byte and watch the hash stop matching,
 * live, with no network call and no account.
 *
 * The two checks are ported verbatim from the reference verifier at
 * /verify.html — same canonical JSON, same Ed25519 through WebCrypto, same
 * SHA-256 over {seq, prev_hash, action, verdict} — so the two cannot drift.
 */

const clone = (r: Receipt): Receipt => JSON.parse(JSON.stringify(r))

/** The edit: one character of the beneficiary name. */
function tamper(r: Receipt): Receipt {
  const t = clone(r)
  const p = t.action.params as Record<string, unknown>
  p.beneficiary_name = String(p.beneficiary_name).replace('Alpha', 'Alphb')
  return t
}

/** Middle ellipsis — the two ends are what anyone actually compares. */
const mid = (s: string, head = 10, tail = 10) =>
  s.length <= head + tail + 1 ? s : `${s.slice(0, head)}…${s.slice(-tail)}`

function Check({ ok, label, detail }: { ok: boolean; label: string; detail: string }) {
  return (
    <div className={`lv__check${ok ? '' : ' lv__check--bad'}`}>
      <span className="lv__mark" aria-hidden="true">
        {ok ? (
          <svg viewBox="0 0 16 16" width="15" height="15">
            <path d="m3 8.5 3.2 3.2L13 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" width="15" height="15">
            <path d="m4 4 8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        )}
      </span>
      <span className="lv__check-label">{label}</span>
      <span className="lv__check-detail">{detail}</span>
    </div>
  )
}

export default function LiveVerifier() {
  const [tampered, setTampered] = useState(false)
  const [res, setRes] = useState<VerifyResult | null>(null)
  const [copied, setCopied] = useState(false)

  const active = useMemo(() => (tampered ? tamper(ORIGINAL) : ORIGINAL), [tampered])

  useEffect(() => {
    let live = true
    setRes(null)
    verifyReceipt(active).then((r) => { if (live) setRes(r) })
    return () => { live = false }
  }, [active])

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(active, null, 2))
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }, [active])

  const params = active.action.params as Record<string, unknown>
  const verdict = active.verdict as Record<string, unknown>
  const allOk = res ? res.signatureOk && res.hashOk : null

  return (
    <section className="lvband" aria-labelledby="lv-title">
      <div className="wrap lvband__grid">
        <div className="lvband__lead">
          <p className="eyebrow">Verify it yourself</p>
          <h2 className="section-title" id="lv-title">A receipt you can check.</h2>
          <p className="lvband__sub">
            This is a real screening decision from the engine, not a picture of one. Your browser
            re-derives the hash and checks the Ed25519 signature. Change a byte and watch it fail.
          </p>
        </div>

        <figure className="lv">
          <figcaption className="lv__head">
            <span className="lv__id">Tollgate receipt {active.receipt_id}</span>
            <span className="lv__status" data-state={res === null ? 'pending' : allOk ? 'ok' : 'bad'}>
              {res === null ? 'Checking…' : allOk ? 'Verified' : 'Verification failed'}
            </span>
          </figcaption>

          <dl className="lv__fields">
            <div><dt>decision</dt><dd>{String(verdict.decision)} · sanctions_hit=SDN-0001</dd></div>
            <div><dt>beneficiary</dt><dd className={tampered ? 'lv__edited' : undefined}>{String(params.beneficiary_name)}</dd></div>
            <div><dt>decided at</dt><dd>{String(verdict.decided_at)}</dd></div>
            <div><dt>authority</dt><dd>{mid(String(verdict.authorizer_id))} (Ed25519)</dd></div>
            <div><dt>this hash</dt><dd>{mid(active.this_hash, 14, 14)}</dd></div>
            {res && !res.hashOk && (
              <div><dt>recomputed</dt><dd className="lv__edited">{mid(res.computedHash, 14, 14)}</dd></div>
            )}
          </dl>

          <div className="lv__checks" aria-live="polite">
            {res === null ? (
              <p className="lv__pending">Verifying in your browser…</p>
            ) : res.unsupported ? (
              <p className="lv__pending">This browser cannot do Ed25519 in WebCrypto. The hash check still ran.</p>
            ) : (
              <>
                <Check ok={res.signatureOk} label="Ed25519 signature" detail={res.signatureOk ? 'valid over the canonical verdict' : 'does not cover these bytes'} />
                <Check ok={res.hashOk} label="Receipt hash" detail={res.hashOk ? 're-derived and matches' : 'recomputed ≠ stored'} />
              </>
            )}
          </div>

          <div className="lv__foot">
            <button type="button" className="btn btn--solid" onClick={() => setTampered((t) => !t)}>
              {tampered ? 'Restore the receipt' : 'Change one byte'}
            </button>
            <button type="button" className="btn btn--ghost" onClick={copy}>
              {copied ? 'Copied' : 'Copy JSON'}
            </button>
            <a className="btn-link lv__more" href="/verify.html">Full verifier&nbsp;&rarr;</a>
          </div>

          <p className="lv__note">
            Verified in this browser with WebCrypto. No network call, no account. Screened against
            demonstration list DEMO-2026-06, not a live OFAC SDN pull — the signature, the hash chain
            and the verifier are real; the list is not.
          </p>
        </figure>
      </div>
    </section>
  )
}
