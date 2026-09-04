/**
 * Division configuration — the single source of truth for the five divisions.
 *
 * Nav entries, routes, the divisions index, the footer columns, and every
 * division page are all generated from this array. Nothing about a division is
 * written into layout code, so the two changes most likely to be asked for
 * later are one-liners here:
 *
 *   1. Naming a division — set `displayName`. It falls back to `sectorLabel`
 *      until then, so the site reads correctly with the names still unchosen.
 *   2. Renaming a route — change `slug`. Every link is derived from it.
 *
 * TODO: the divisions are currently unnamed. When names are chosen, set
 * `displayName` on each entry below and, if the name should drive the URL,
 * update `slug` to match. No other file needs to change.
 */

export type Product = {
  name: string
  /** Card headline. One line, seven words or fewer. */
  headline: string
  /** One line. Concrete and falsifiable — no adjectives standing in for facts. */
  note: string
  /** Internal route, or null for a product that is named but has no page. */
  href: string | null
  /** The named link text used on the card. Never a bare arrow. */
  linkLabel?: string
  /** Longer copy. Rendered on the division page only — never on a card.
   *  A card is one headline, one sentence, one named link. */
  detail?: string[]
}

export type Division = {
  id: 'finance' | 'cybersecurity' | 'agriculture' | 'health' | 'research'
  slug: string
  sectorLabel: string
  /**
   * Registered entity for this sector, once one exists. `null` means it is not
   * separately incorporated — see lib/structure.ts. Nothing in the UI may
   * imply incorporation while this is null.
   */
  entity: null | { name: string; jurisdiction: string; registration: string }
  /**
   * The sector's own accent. Each is AA on both grounds; the pair is recorded
   * here so a change re-runs the same check. They share a muted, low-chroma
   * range on purpose — the set should read as one group of companies, not as
   * five unrelated brands.
   */
  accent: { light: string; dark: string }
  /** Which mark this sector uses. See components/site/SectorMark.tsx. */
  mark: 'arch' | 'chain' | 'wave' | 'field' | 'pulse' | 'grid'
  /**
   * The field this sector actually works in, which is narrower than the
   * industry `sectorLabel` names. Falls back to sectorLabel when null.
   */
  displayName: string | null
  /** Short form for the nav, where the full field name is too long. */
  navLabel?: string
  /** Homepage index line. One sentence, ≤ 18 words. */
  tagline: string
  /** Division page subhead. One sentence, ≤ 25 words. */
  subhead: string
  /** Who the work is for. Moved off the homepage per the IA. */
  audience: string
  products: Product[]
  heroImage: {
    /** Basename in /public/img — variants resolve as `${base}-${width}.webp`. */
    base: string
    /** Widest real variant on disk. No image has a 2400px source, so nothing
     *  above this exists and srcset must not claim it. */
    maxWidth?: 640 | 1024 | 1600
    /** Empty alt: these are atmosphere, and the caption carries the meaning. */
    alt: string
    width: number
    height: number
  }
}

/** Display name for a division, with the documented fallback. */
export const nameOf = (d: Division): string => d.displayName ?? d.sectorLabel

export const divisions: Division[] = [
  {
    id: 'finance',
    entity: null,
    navLabel: 'Finance',
    accent: { light: '#8A6212', dark: '#C9962B' },  /* 5.20 / 7.08 */
    mark: 'chain',
    slug: 'finance',
    sectorLabel: 'Finance',
    displayName: 'Financial compliance',
    tagline: 'Sanctions and trade decisions an examiner can re-derive years later.',
    subhead:
      'Screening and trade decisions become signed, hash-chained receipts that a third party can re-derive offline.',
    audience:
      'Stablecoin issuers, virtual-asset service providers, banks, cross-border traders, and the examiners who supervise them.',
    products: [
      {
        name: 'Tollgate',
        headline: 'Sanctions decisions an examiner can replay',
        note: 'Pinned to the list as it stood, and re-derived offline months later.',
        href: '/tollgate',
        linkLabel: 'Read the Tollgate spec',
        detail: [
          'Tollgate runs read-only beside the screener a firm already uses, so adopting it needs no replacement and it never becomes the block-of-record.',
          'When an examiner asks why a counterparty was blocked six months ago, the usual answer is that the list has moved, the vendor’s system has been updated, and the decision can no longer be reproduced. A Tollgate receipt is re-derived from the inputs that produced it, in a browser, with no account and no call back to us.',
          'Reproducibility is offered on the exact-match path only. That limit is stated on the verifier itself rather than buried, because a green check over a match the system cannot actually reproduce would defeat the point of the product.',
        ],
      },
      {
        name: 'Signet',
        headline: 'The engine underneath',
        note: 'Deny-by-default policy over signed mandates and a hash-chained ledger.',
        href: '/finance#signet',
        linkLabel: 'Read about Signet',
      },
      {
        name: 'Caravan',
        headline: 'A trade record no platform owns',
        note: 'Both sides of a cross-border deal verify the same record independently.',
        href: '/caravan',
        linkLabel: 'Read about Caravan',
      },
    ],
    heroImage: { base: 'finance', alt: '', width: 1600, height: 1067 },
  },
  {
    id: 'cybersecurity',
    entity: null,
    navLabel: 'Fraud',
    accent: { light: '#2C5470', dark: '#7FA8C8' },  /* 7.64 / 7.49 */
    mark: 'wave',
    slug: 'cybersecurity',
    sectorLabel: 'Cybersecurity',
    displayName: 'Fraud defence',
    tagline: 'Stopping a voice-phishing scam, and recovering the money when it lands.',
    subhead:
      'One product across the whole window: on-device detection while the call is live, and the recovery sequence for the hour after a transfer.',
    audience:
      'Phone users a scam can reach, starting with the elderly, and the banks and fintechs that carry the loss.',
    products: [
      {
        name: 'Goldentime',
        headline: 'Before the transfer, and after',
        note: 'Reads the messenger thread and the transfer screen on-device, then runs the recovery steps in the order that gets money back.',
        href: '/goldentime',
        linkLabel: 'Read about Goldentime',
        detail: [
          'A scam and its recovery are one window, not two products. Goldentime watches the two surfaces the platforms structurally cannot see — the messenger conversation and the bank transfer screen — and warns a trusted family member while the call is still happening. Everything is analysed on the device, so no audio and no conversation leaves the phone.',
          'When a transfer goes through anyway, the same app becomes the recovery copilot. The hour after money is sent decides whether it can be clawed back, and the order of the steps is the product: freeze the receiving account, report to the authorities, preserve the evidence. It is written for someone in shock, not for someone reading a manual.',
          'It detects and it guides. It never silently blocks a call or moves money on its own.',
        ],
      },
    ],
    heroImage: { base: 'cyber', alt: '', width: 1800, height: 1200 },
  },
  {
    id: 'agriculture',
    entity: null,
    navLabel: 'Food',
    accent: { light: '#4A6122', dark: '#9DBE62' },  /* 6.60 / 8.96 */
    mark: 'field',
    slug: 'agriculture',
    sectorLabel: 'Agriculture',
    displayName: 'Food security',
    tagline: 'Cold storage for the last village the grid never reached.',
    subhead:
      'Up to a third of a smallholder harvest spoils before it can be sold, for want of refrigeration.',
    audience:
      'Smallholder farmers in sub-Saharan Africa and Asia, and the food-security programs that serve them.',
    products: [
      {
        name: 'HarvestGuard',
        headline: 'Cold storage off the grid',
        note: 'A solar pod billed per day through mobile money, sized for one village.',
        href: '/harvestguard',
        linkLabel: 'Read about HarvestGuard',
        detail: [
          'The technology to stop a harvest rotting is a century old and still has not reached the smallholder farmer. Only a small fraction of fresh produce in sub-Saharan Africa ever touches cold storage, and families are pushed into distress sales the day they harvest.',
          'A solar-powered pod runs where the grid does not, billed pay-as-you-go through mobile money — no upfront cost, no wiring, no standing subscription. It is sized for the shared, sub-village scale that large cold hubs skip.',
          'Every use also records what a farmer stored, sold and paid. That record is the first credential a lender has ever had for someone the formal banking system cannot see.',
        ],
      },
    ],
    heroImage: { base: 'agriculture', alt: '', width: 1800, height: 1011 },
  },
  {
    id: 'health',
    entity: null,
    navLabel: 'Health',
    accent: { light: '#8A4230', dark: '#E0937E' },  /* 6.87 / 7.76 */
    mark: 'pulse',
    slug: 'health',
    sectorLabel: 'Health',
    displayName: 'Healthcare claims',
    tagline: 'Catching the error that gets a claim denied, before it is submitted.',
    subhead:
      'Reads the documents healthcare runs on and flags what would be denied, at submission rather than months later.',
    audience: 'U.S. healthcare providers and the billing companies that serve them.',
    products: [
      {
        name: 'ClaimPilot',
        headline: 'Catches the denial before submission',
        note: 'Denial prevention for U.S. revenue-cycle management, on the same decision engine.',
        href: null,
      },
    ],
    heroImage: { base: 'health', alt: '', width: 1800, height: 1200 },
  },
  {
    id: 'research',
    entity: null,
    navLabel: 'Research',
    accent: { light: '#4A4A82', dark: '#9C9CD6' },  /* 7.69 / 7.31 */
    mark: 'grid',
    slug: 'research',
    sectorLabel: 'Research',
    displayName: 'AI safety',
    tagline: 'Measuring where a model grows more capable and less able to tell it is wrong.',
    subhead:
      'A model can improve at a task while getting worse at knowing when it has failed. We measure that gap.',
    audience:
      'Model evaluation and AI-safety work, and anyone deploying a model where a confident wrong answer is dangerous.',
    products: [
      {
        name: 'Model calibration',
        headline: 'Where capability and self-knowledge diverge',
        note: 'Measured across engineered task families rather than asserted.',
        href: null,
      },
      {
        name: 'Structured perturbation stability',
        headline: 'How far a model holds up',
        note: 'Under structured, non-random input perturbation rather than noise.',
        href: null,
      },
    ],
    heroImage: { base: 'research', alt: '', width: 1800, height: 1200 },
  },
]

export const financeDivision = divisions[0]

/** Nav is three entries plus one CTA, per the IA. The lead sector is derived
 *  rather than hardcoded, so reordering the array reorders the nav. */
export const navLinks = [
  { label: divisions[0].navLabel ?? divisions[0].sectorLabel, href: `/${divisions[0].slug}` },
  { label: 'Sectors', href: '/divisions' },
  { label: 'Company', href: '/company' },
]
