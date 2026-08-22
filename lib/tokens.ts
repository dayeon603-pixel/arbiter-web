/**
 * TypeScript mirror of the colour tokens in `app/tokens.css`, plus the WCAG
 * relative-luminance maths.
 *
 * This exists so the /styleguide contrast table is *derived* from the palette
 * rather than transcribed from it. A hand-typed ratio silently goes stale the
 * first time someone nudges a hex value; a computed one cannot. If you change
 * a colour in tokens.css, change it here too and the table re-reports itself.
 */

export type Hex = `#${string}`

/** WCAG 2.1 relative luminance (sRGB). */
function luminance(hex: Hex): number {
  const h = hex.replace('#', '')
  const channels = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
  const [r, g, b] = channels.map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4),
  )
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** WCAG 2.1 contrast ratio between two opaque colours. Range 1–21. */
export function contrast(a: Hex, b: Hex): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

export const round2 = (n: number) => Math.round(n * 100) / 100

export const palette = {
  light: {
    surface: '#FAF9F6' as Hex,
    surfaceRaised: '#FFFFFF' as Hex,
    textPrimary: '#121110' as Hex,
    textSecondary: '#57544C' as Hex,
    accent: '#B5821E' as Hex,
    accentText: '#8A6212' as Hex,
    verified: '#19673F' as Hex,
  },
  inverse: {
    surface: '#121110' as Hex,
    surfaceRaised: '#1C1A18' as Hex,
    textPrimary: '#FAF9F6' as Hex,
    textSecondary: '#A8A39A' as Hex,
    accent: '#B5821E' as Hex,
    accentText: '#C9962B' as Hex,
    verified: '#63CE92' as Hex,
  },
} as const

export type ContrastRow = {
  pair: string
  fg: Hex
  bg: Hex
  ratio: number
  /** AA for body text is 4.5:1. Non-text UI (rules, marks, focus rings) is 3:1. */
  requirement: 4.5 | 3
  role: string
}

const L = palette.light
const D = palette.inverse

export const contrastRows: ContrastRow[] = [
  { pair: 'text-primary / surface',            fg: L.textPrimary,   bg: L.surface,       requirement: 4.5, role: 'Headlines, body copy' },
  { pair: 'text-primary / surface-raised',     fg: L.textPrimary,   bg: L.surfaceRaised, requirement: 4.5, role: 'Card and panel copy' },
  { pair: 'text-secondary / surface',          fg: L.textSecondary, bg: L.surface,       requirement: 4.5, role: 'Subheads, secondary prose' },
  { pair: 'text-secondary / surface-raised',   fg: L.textSecondary, bg: L.surfaceRaised, requirement: 4.5, role: 'Card body, proof-panel keys' },
  { pair: 'accent-text / surface',             fg: L.accentText,    bg: L.surface,       requirement: 4.5, role: 'Eyebrow labels, link hover' },
  { pair: 'accent-text / surface-raised',      fg: L.accentText,    bg: L.surfaceRaised, requirement: 4.5, role: 'Eyebrow on cards' },
  { pair: 'verified / surface',                fg: L.verified,      bg: L.surface,       requirement: 4.5, role: 'Verified state' },
  { pair: 'verified / surface-raised',         fg: L.verified,      bg: L.surfaceRaised, requirement: 4.5, role: 'Verified state on panel' },
  { pair: 'accent (graphic) / surface',        fg: L.accent,        bg: L.surface,       requirement: 3,   role: 'Rules and marks — never text' },
  { pair: 'text-primary / accent fill',        fg: L.textPrimary,   bg: L.accent,        requirement: 4.5, role: 'Text on a gold fill — ink only, never off-white' },
  { pair: 'surface / btn-primary fill',        fg: L.surface,       bg: L.textPrimary,   requirement: 4.5, role: 'Primary button label' },
  { pair: 'surface / btn-primary hover fill',  fg: L.surface,       bg: L.accentText,    requirement: 4.5, role: 'Primary button label, hover' },
  { pair: 'focus ring / surface',              fg: L.textPrimary,   bg: L.surface,       requirement: 3,   role: 'Keyboard focus ring' },

  { pair: 'text-primary / surface-inverse',        fg: D.textPrimary,   bg: D.surface,       requirement: 4.5, role: 'Headlines on near-black' },
  { pair: 'text-primary / inverse-raised',         fg: D.textPrimary,   bg: D.surfaceRaised, requirement: 4.5, role: 'Card copy on near-black' },
  { pair: 'text-secondary / surface-inverse',      fg: D.textSecondary, bg: D.surface,       requirement: 4.5, role: 'Secondary prose on near-black' },
  { pair: 'text-secondary / inverse-raised',       fg: D.textSecondary, bg: D.surfaceRaised, requirement: 4.5, role: 'Card body on near-black' },
  { pair: 'accent-text / surface-inverse',         fg: D.accentText,    bg: D.surface,       requirement: 4.5, role: 'Eyebrow on near-black' },
  { pair: 'verified / surface-inverse',            fg: D.verified,      bg: D.surface,       requirement: 4.5, role: 'Verified state on near-black' },
  { pair: 'focus ring / surface-inverse',          fg: D.textPrimary,   bg: D.surface,       requirement: 3,   role: 'Keyboard focus ring, inverse' },
].map((r) => ({ ...r, ratio: round2(contrast(r.fg, r.bg)) })) as ContrastRow[]

/** The type scale, mirrored for the styleguide specimen table. */
export const typeScale = [
  { token: '--t-8', px: '54 → 68', rem: '3.3743 (fluid)', use: 'Display / hero headline', cls: 'display', tracking: '-0.03em', lh: '1.05' },
  { token: '--t-7', px: '42.8 → 54', rem: '2.678 (fluid)', use: 'H1, page titles',        cls: 'h1',      tracking: '-0.03em', lh: '1.05' },
  { token: '--t-6', px: '34 → 42.8', rem: '2.1254 (fluid)', use: 'H2, section headline',  cls: 'h2',      tracking: '-0.025em', lh: '1.2' },
  { token: '--t-5', px: '34',   rem: '2.1254', use: 'H3',                                 cls: 'h3',      tracking: '-0.025em', lh: '1.2' },
  { token: '--t-4', px: '27',   rem: '1.6868', use: 'H4, card title',                     cls: 'h4',      tracking: '-0.02em',  lh: '1.2' },
  { token: '--t-3', px: '21.4', rem: '1.3388', use: 'Lede, subhead',                      cls: 'lede',    tracking: '0',        lh: '1.6' },
  { token: '--t-2', px: '17',   rem: '1.0625', use: 'Body — scale base',                  cls: 'body',    tracking: '0',        lh: '1.6' },
  { token: '--t-1', px: '13.5', rem: '0.8433', use: 'Eyebrow, machine output, captions',  cls: 'small',   tracking: '0.14em',   lh: '1.6' },
] as const

export const spaceScale = [
  { token: '--sp-1', px: 4 }, { token: '--sp-2', px: 8 }, { token: '--sp-3', px: 12 },
  { token: '--sp-4', px: 16 }, { token: '--sp-5', px: 24 }, { token: '--sp-6', px: 32 },
  { token: '--sp-7', px: 48 }, { token: '--sp-8', px: 64 }, { token: '--sp-9', px: 96 },
  { token: '--sp-10', px: 120 },
] as const
