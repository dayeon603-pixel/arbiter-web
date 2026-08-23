/**
 * A real Tollgate receipt, copied verbatim from the engine's own output at
 * ~/ventures/tollgate/demo_receipts.json (record `rcpt:p2`, seq 1).
 *
 * Nothing here is invented or prettified. The hashes chain: `prevHash` is the
 * `this_hash` of `rcpt:p1`, and `rcpt:p3` carries this record's `this_hash`
 * as its own `prev_hash`. The signature is the Ed25519 signature the engine
 * emitted over the canonical bytes.
 *
 * HONESTY NOTE — rendered on the panel itself, not buried here:
 * the list snapshot is `DEMO-2026-06`, a demonstration sanctions list, not a
 * live OFAC SDN pull. Showing a fabricated real-OFAC hit would contradict the
 * entire claim the product makes, so the panel says which list it screened
 * against. Do not swap these values for more impressive-looking ones.
 */
export const sampleReceipt = {
  id: 'rcpt:p2',
  seq: 1,
  type: 'stablecoin_payment_screen',
  decision: 'DENY',
  outcome: 'BLOCK',
  agent: 'tollgate.shadow',
  authorityId: '6af860e4e96f777ac0b6ee3859f23f9d6d131f0c07badfd85fd16b2982632627',
  decidedAt: '2026-07-28T18:45:01.361089Z',
  rulebook: 'DEMO-2026-06',
  listSnapshot: '9ff2a26d9c96f2c16467947a57cc8a8720eb1ba4cf31958262046f243dd626dd',
  reason: 'sanctions_hit=SDN-0001',
  prevHash: '2dc8c35e9c31579dadda370aed4b4c959c1a874c071ab5a302266d05680495be',
  thisHash: 'bf59202537d847494475edbb42856496ae6dcd4f4b31c97fff506e7be1e0b9c9',
  signature:
    '86b547591525850585fcea76f754556bfa7efb4673a019480e2c4f1a93e88e71326769e2e4f49c880c2207a854de25077a8808ce9c25165363a5eeb38a8a490f',
} as const

/** Middle ellipsis. Keeps both ends, which are the parts anyone checks. */
const mid = (s: string, head = 12, tail = 12) =>
  s.length <= head + tail + 1 ? s : `${s.slice(0, head)}…${s.slice(-tail)}`

/**
 * The rows the proof panel renders, in order.
 *
 * `display` is what the panel shows — the two 64-char identifiers are elided
 * so the panel stays readable at 390px. `full` is what the copy button puts
 * on the clipboard, because a truncated hash is not verifiable and a copy
 * button that hands you one is worse than no copy button.
 */
export const receiptRows: { k: string; display: string; full: string }[] = [
  { k: 'decision',      display: `${sampleReceipt.decision} · ${sampleReceipt.reason}`, full: `${sampleReceipt.decision} · ${sampleReceipt.reason}` },
  { k: 'authority',     display: `${mid(sampleReceipt.authorityId)} (Ed25519)`, full: `${sampleReceipt.authorityId} (Ed25519)` },
  { k: 'decided at',    display: sampleReceipt.decidedAt, full: sampleReceipt.decidedAt },
  { k: 'list snapshot', display: `${mid(sampleReceipt.listSnapshot)} (${sampleReceipt.rulebook})`, full: `${sampleReceipt.listSnapshot} (${sampleReceipt.rulebook})` },
  { k: 'previous hash', display: mid(sampleReceipt.prevHash), full: sampleReceipt.prevHash },
  { k: 'this hash',     display: mid(sampleReceipt.thisHash), full: sampleReceipt.thisHash },
  { k: 'signature',     display: mid(sampleReceipt.signature), full: sampleReceipt.signature },
]

/** Plain-text form used by the panel's copy button. Full values, never elided. */
export const receiptPlainText = receiptRows
  .map(({ k, full }) => `${k.padEnd(15)}${full}`)
  .join('\n')
