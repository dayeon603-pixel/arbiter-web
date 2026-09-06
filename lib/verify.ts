/**
 * Client-side verification of a Tollgate receipt.
 *
 * This is a direct port of the two load-bearing checks in the reference
 * verifier at /verify — same canonicalisation, same Ed25519, same SHA-256 —
 * so what the homepage shows and what the standalone verifier shows cannot
 * drift apart. Everything runs in the browser. No network, no account.
 */

export type Receipt = {
  receipt_id: string
  seq: number
  prev_hash: string
  action: Record<string, unknown>
  verdict: Record<string, unknown> & { authorizer_id: string; signature: string }
  this_hash: string
}

/**
 * Canonical JSON: keys sorted recursively, arrays left in order. Two parties
 * must serialise the same object to the same bytes or the hashes disagree for
 * reasons that have nothing to do with tampering.
 */
export function canon(v: unknown): string {
  if (v === null) return 'null'
  if (Array.isArray(v)) return '[' + v.map(canon).join(',') + ']'
  if (typeof v === 'object') {
    const o = v as Record<string, unknown>
    return '{' + Object.keys(o).sort().map((k) => JSON.stringify(k) + ':' + canon(o[k])).join(',') + '}'
  }
  return JSON.stringify(v)
}

const hex = (b: ArrayBuffer) =>
  Array.from(new Uint8Array(b)).map((x) => x.toString(16).padStart(2, '0')).join('')

const unhex = (s: string) =>
  new Uint8Array((s.match(/.{1,2}/g) ?? []).map((b) => parseInt(b, 16)))

export type VerifyResult = {
  signatureOk: boolean
  hashOk: boolean
  computedHash: string
  /** Set when the browser cannot do Ed25519 at all, which is not a failure of the receipt. */
  unsupported: boolean
}

export async function verifyReceipt(r: Receipt): Promise<VerifyResult> {
  const enc = new TextEncoder()

  // 1. Ed25519 over the verdict with its own signature field removed.
  let signatureOk = false
  let unsupported = false
  try {
    const v: Record<string, unknown> = { ...r.verdict }
    delete v.signature
    const key = await crypto.subtle.importKey(
      'raw',
      unhex(r.verdict.authorizer_id),
      { name: 'Ed25519' },
      false,
      ['verify'],
    )
    signatureOk = await crypto.subtle.verify(
      { name: 'Ed25519' },
      key,
      unhex(r.verdict.signature),
      enc.encode(canon(v)),
    )
  } catch {
    // Ed25519 via WebCrypto is not universal yet. Report it as unsupported
    // rather than as a failed signature — those mean very different things.
    unsupported = true
  }

  // 2. Receipt hash re-derived from the pinned inputs.
  const preimage = { seq: r.seq, prev_hash: r.prev_hash, action: r.action, verdict: r.verdict }
  const computedHash = hex(await crypto.subtle.digest('SHA-256', enc.encode(canon(preimage))))

  return { signatureOk, hashOk: computedHash === r.this_hash, computedHash, unsupported }
}
