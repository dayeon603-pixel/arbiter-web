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
  /** One line. Concrete and falsifiable — no adjectives standing in for facts. */
  note: string
  /** Internal route, or null for a product that is named but has no page. */
  href: string | null
  /** The named link text used on the card. Never a bare arrow. */
  linkLabel?: string
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
        note: 'Sanctions and Travel Rule decisions pinned to the list as it stood, replayable offline.',
        href: '/tollgate',
        linkLabel: 'Read the Tollgate spec',
      },
      {
        name: 'Signet',
        note: 'The engine underneath: deny-by-default policy over signed mandates and a hash-chained ledger.',
        href: '/finance#signet',
        linkLabel: 'Read about Signet',
      },
      {
        name: 'Caravan',
        note: 'A neutral record of a cross-border trade decision that no platform in the deal controls.',
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
        note: 'Reads the messenger thread and the pre-transfer screen on-device, and warns the family in time.',
        href: '/halo',
        linkLabel: 'Read about HALO',
      },
      {
        name: 'Goldentime',
        note: 'The recovery sequence for the hour after a transfer, in the order that recovers money.',
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
        note: 'A solar cold-storage pod billed per day through mobile money, sized for one village.',
        href: '/harvestguard',
        linkLabel: 'Read about HarvestGuard',
      },
      {
        name: 'FarmPilot',
        note: 'Names a crop disease from one photo, on the phone, offline, with its measured accuracy stated.',
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
        note: 'Denial prevention for U.S. revenue-cycle management, built on the same decision engine.',
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
        note: 'Measuring the divergence between capability and self-assessment across engineered task families.',
        href: null,
      },
      {
        name: 'Structured perturbation stability',
        note: 'How far a model holds up under structured, non-random input perturbation.',
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
