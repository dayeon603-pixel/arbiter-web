import Link from 'next/link'
import PageShell from './PageShell'
import PageHeader from './PageHeader'
import DeckEmbed from '@/components/DeckEmbed'
import { nameOf, type Division } from '@/lib/divisions'
import { contactHref } from '@/lib/site'

/**
 * The shared template for every product page (Tollgate, Caravan, HALO,
 * Goldentime, HarvestGuard, FarmPilot). The six pages previously duplicated
 * the nav, the footer, and a hand-numbered figure-label block; all of that
 * lived in markup, not in `lib/data.ts`, which is why it drifted six
 * different ways. This component reads only from the shapes already in
 * `lib/data.ts` and renders one structure for all six.
 */

export type ProductSection = { label: string; body: string }

export type ProductHow = {
  label: string
  points: { h: string; p: string }[]
}

export type ProductLinks = {
  verifier?: string
  app?: string
  demo?: string
}

export type ProductData = {
  eyebrow: string
  name: string
  tagline: string
  lead: string
  problem: ProductSection
  how: ProductHow
  status: ProductSection
  twoSided?: ProductSection
  pricing?: ProductSection
  northStar?: ProductSection
  links?: ProductLinks
}

export type ProductDeck = {
  src: string
  label: string
  slides?: number
  caption?: string
}

/**
 * Every section on this page closes with a named link to the section that
 * follows it, rather than a bare arrow. The target varies per product
 * (Tollgate and Caravan carry three extra sections HALO and FarmPilot do
 * not), so the label is generated from the destination id and the product
 * name instead of being hand-written six times.
 */
function nextSectionLink(id: string, name: string): string {
  switch (id) {
    case 'problem':
      return `See the problem ${name} solves`
    case 'how':
      return `Read how ${name} works`
    case 'two-sided':
      return `See why ${name} is two-sided`
    case 'pricing':
      return `See how ${name} is priced`
    case 'aim':
      return `Read ${name}'s north star`
    case 'status':
    default:
      return `See ${name}'s current status`
  }
}

/**
 * The `how.points` grid. Every product supplies exactly three points today,
 * but the pattern is written as a repeating sequence rather than three
 * fixed literals, so a fourth point does not silently fall back to a
 * uniform grid. The first point is the mechanism that carries the rest of
 * the explanation and gets the most width; the last reads best as a single
 * full-width line rather than squeezed beside its neighbours, since it is
 * consistently the "what this means for the person using it" point across
 * every one of the six products.
 */
const HOW_SPAN_PATTERN = [7, 5, 12] as const

export default function ProductPage({
  product,
  division,
  deck,
}: {
  product: ProductData
  division: Division
  deck?: ProductDeck
}) {
  const afterHow = product.twoSided ? 'two-sided' : product.pricing ? 'pricing' : product.northStar ? 'aim' : 'status'
  const afterTwoSided = product.pricing ? 'pricing' : product.northStar ? 'aim' : 'status'
  const afterPricing = product.northStar ? 'aim' : 'status'

  return (
    <PageShell>
      <PageHeader accent eyebrow={product.eyebrow} title={product.name} subhead={product.tagline} />

      <section className="section product__lead" aria-labelledby="product-lead">
        <div className="content">
          <h2 className="h2" id="product-lead">{product.tagline}</h2>
          <p className="lede measure">{product.lead}</p>

          <div className="product__links">
            {product.links?.verifier && (
              <a className="named-link" href={product.links.verifier} target="_blank" rel="noopener noreferrer">
                Open the offline verifier
                <span className="named-link__arrow" aria-hidden="true">→</span>
              </a>
            )}
            {product.links?.app && (
              <a className="named-link" href={product.links.app} target="_blank" rel="noopener noreferrer">
                Open the live {product.name} app
                <span className="named-link__arrow" aria-hidden="true">→</span>
              </a>
            )}
            {product.links?.demo && (
              <a className="named-link" href={product.links.demo} target="_blank" rel="noopener noreferrer">
                Open the offline-verifiable demo
                <span className="named-link__arrow" aria-hidden="true">→</span>
              </a>
            )}
            {!product.links && (
              <a className="named-link" href="#problem">
                {nextSectionLink('problem', product.name)}
                <span className="named-link__arrow" aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {deck && (
        <section className="section product__section product__deck" aria-label={`${product.name} overview deck`}>
          <div className="content">
            <DeckEmbed src={deck.src} label={deck.label} slides={deck.slides} caption={deck.caption} />
          </div>
        </section>
      )}

      <section className="section product__section" id="problem" aria-labelledby="product-problem">
        <div className="content">
          <h2 className="h2" id="product-problem">{product.problem.label}</h2>
          <p className="body-sec measure">{product.problem.body}</p>
          <p className="product__closing">
            <a className="named-link" href="#how">
              {nextSectionLink('how', product.name)}
              <span className="named-link__arrow" aria-hidden="true">→</span>
            </a>
          </p>
        </div>
      </section>

      <section className="section product__section" id="how" aria-labelledby="product-how">
        <div className="content">
          <h2 className="h2" id="product-how">{product.how.label}</h2>
          <div className="grid product__how-grid">
            {product.how.points.map((pt, i) => (
              <article className="card" key={pt.h} style={{ ['--col-span' as string]: HOW_SPAN_PATTERN[i % HOW_SPAN_PATTERN.length] }}>
                <h3 className="card__title">{pt.h}</h3>
                <p className="card__body">{pt.p}</p>
              </article>
            ))}
          </div>
          <p className="product__closing">
            <a className="named-link" href={`#${afterHow}`}>
              {nextSectionLink(afterHow, product.name)}
              <span className="named-link__arrow" aria-hidden="true">→</span>
            </a>
          </p>
        </div>
      </section>

      {product.twoSided && (
        <section className="section product__section" id="two-sided" aria-labelledby="product-two-sided">
          <div className="content">
            <h2 className="h2" id="product-two-sided">{product.twoSided.label}</h2>
            <p className="body-sec measure">{product.twoSided.body}</p>
            <p className="product__closing">
              <a className="named-link" href={`#${afterTwoSided}`}>
                {nextSectionLink(afterTwoSided, product.name)}
                <span className="named-link__arrow" aria-hidden="true">→</span>
              </a>
            </p>
          </div>
        </section>
      )}

      {product.pricing && (
        <section className="section product__section" id="pricing" aria-labelledby="product-pricing">
          <div className="content">
            <h2 className="h2" id="product-pricing">{product.pricing.label}</h2>
            <p className="body-sec measure">{product.pricing.body}</p>
            <p className="product__closing">
              <a className="named-link" href={`#${afterPricing}`}>
                {nextSectionLink(afterPricing, product.name)}
                <span className="named-link__arrow" aria-hidden="true">→</span>
              </a>
            </p>
          </div>
        </section>
      )}

      {product.northStar && (
        <section className="section product__section" id="aim" aria-labelledby="product-aim">
          <div className="content">
            <h2 className="h2" id="product-aim">{product.northStar.label}</h2>
            <p className="body-sec measure">{product.northStar.body}</p>
            <p className="product__closing">
              <a className="named-link" href="#status">
                {nextSectionLink('status', product.name)}
                <span className="named-link__arrow" aria-hidden="true">→</span>
              </a>
            </p>
          </div>
        </section>
      )}

      <section className="section product__section product__status" id="status" aria-labelledby="product-status">
        <div className="content">
          <h2 className="h2" id="product-status">{product.status.label}</h2>
          <p className="body-sec measure product__status-body">{product.status.body}</p>

          <div className="product__cta">
            <Link href={`/${division.slug}`} className="btn btn--secondary">
              ← Back to {nameOf(division)}
            </Link>
            <a className="btn btn--primary" href={contactHref(`Arbiter — ${product.name}`)}>
              Talk to us about {product.name.toLowerCase()}
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
