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
  /** null until a division name is chosen; UI falls back to sectorLabel. */
  displayName: string | null
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
    slug: 'finance',
    sectorLabel: 'Finance',
    displayName: null,
    tagline: 'Decisions about money, recorded so an examiner can re-derive them years later.',
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
    slug: 'cybersecurity',
    sectorLabel: 'Cybersecurity',
    displayName: null,
    tagline: 'Catching a voice-phishing scam on the phone, while the call is still live.',
    subhead:
      'On-device detection of the two surfaces platforms cannot see: the messenger thread and the bank transfer screen.',
    audience:
      'Phone users a scam can reach, starting with the elderly, and the banks and fintechs that carry the loss.',
    products: [
      {
        name: 'HALO',
        headline: 'Catches the scam mid-call',
        note: 'Reads the messenger thread and the transfer screen on-device, and warns the family.',
        href: '/halo',
        linkLabel: 'Read about HALO',
      },
      {
        name: 'Goldentime',
        headline: 'The first hour, in order',
        note: 'The time-critical recovery steps, sequenced so the actions that recover money come first.',
        href: '/goldentime',
        linkLabel: 'Read about Goldentime',
      },
    ],
    heroImage: { base: 'cyber', alt: '', width: 1800, height: 1200 },
  },
  {
    id: 'agriculture',
    slug: 'agriculture',
    sectorLabel: 'Agriculture',
    displayName: null,
    tagline: 'Cold storage and crop diagnosis for farms the grid and the agronomist never reached.',
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
      },
      {
        name: 'FarmPilot',
        headline: 'Names the disease from one photo',
        note: 'Runs on the phone, offline, with its measured accuracy stated in the demo.',
        href: '/farmpilot',
        linkLabel: 'Read about FarmPilot',
      },
    ],
    heroImage: { base: 'agriculture', alt: '', width: 1800, height: 1011 },
  },
  {
    id: 'health',
    slug: 'health',
    sectorLabel: 'Health',
    displayName: null,
    tagline: 'Catching the error that gets a claim denied, before the claim is submitted.',
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
    slug: 'research',
    sectorLabel: 'Research',
    displayName: null,
    tagline: 'Measuring where a model gets more capable and less able to tell when it is wrong.',
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

/** Nav is three entries plus one CTA, per the IA. */
export const navLinks = [
  { label: 'Finance', href: '/finance' },
  { label: 'Divisions', href: '/divisions' },
  { label: 'Company', href: '/company' },
]
