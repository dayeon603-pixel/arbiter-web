/**
 * Site-wide constants. Contact and entity facts live here and nowhere else, so
 * swapping either is a one-line change.
 */

/**
 * TODO: `contact@arbiter.company` is not live. `dig MX arbiter.company` returns
 * no records, so Cloudflare Email Routing has not been configured for the
 * domain and mail to that address would bounce.
 *
 * Set `aliasLive = true` once the routing rule exists. Until then the site
 * renders the personal address, because a dead mailto is worse than an
 * unbranded one on a page whose whole argument is that the record holds up.
 */
const ALIAS = 'contact@arbiter.company'
const FALLBACK = 'dayeon603@gmail.com'
const aliasLive = false

export const contactEmail = aliasLive ? ALIAS : FALLBACK

/** Builds a mailto with a subject so a contact link opens ready to send. */
export const contactHref = (subject = 'Arbiter — Inquiry') =>
  `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}`

export const founder = {
  name: 'Dayeon Kang',
  role: 'Founder & CEO',
  meta: 'Seoul, Republic of Korea · est. 2026',
  /**
   * Exactly two short paragraphs. Deliberately understated: no stacked titles,
   * no claim to lead five domains personally.
   */
  paragraphs: [
    'I build decision systems for places where being wrong is expensive and someone has to be able to prove they were right. Most of my work starts from the same question: when this call is questioned two years from now, what survives?',
    'Before Arbiter was an entity, the engine underneath it was already running and tested. I would rather show you a receipt you can check than a claim you have to take on trust.',
  ],
  /** TODO: no portrait asset yet. The block renders a geometric placeholder.
   *  Drop a commissioned portrait at /public/img/founder-portrait.webp and set
   *  this to that path. The existing founder.jpg is an ID photo and is not used. */
  portrait: null as string | null,
}

/**
 * Entity facts. Korea requires a registered business to publish its
 * registration details, so the footer carries them regardless of the design.
 * The street address is withheld deliberately.
 */
export const legal = {
  businessNameKo: '아비터',
  businessNameEn: 'Arbiter',
  representativeKo: '강다연',
  registrationNumber: '414-01-72904',
  jurisdiction: 'Republic of Korea',
  /** Address suppressed: not required for a non-transacting corporate site. */
  showAddress: false,
  registeredAddress: '경기도 용인시 처인구 삼가로58번길 17-12, 사무실동 1층 (삼가동)',
  emailHarvestNotice:
    '게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하며, 위반 시 정보통신망법에 따라 처벌될 수 있습니다.',
}

export const externalLinks = {
  github: 'https://github.com/dayeon603-pixel',
  linkedin: 'https://www.linkedin.com/in/dayeon-kang-309a333a9',
  /** Served directly by Cloudflare; the .html form 307-redirects, so link the clean path. */
  verifier: '/verify',
  spec: '/spec',
}
