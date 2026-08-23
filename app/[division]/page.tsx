import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageShell from '@/components/site/PageShell'
import PageHeader from '@/components/site/PageHeader'
import Photo from '@/components/site/Photo'
import { divisions, nameOf } from '@/lib/divisions'
import { contactHref } from '@/lib/site'

/**
 * One template for all five divisions, generated from lib/divisions.ts.
 *
 * Because the routes come from `slug` in that config, renaming a division's
 * URL really is a one-line change: the param list, every internal link, the
 * nav and the footer all re-derive from it.
 */
export const dynamicParams = false

export function generateStaticParams() {
  return divisions.map((d) => ({ division: d.slug }))
}

export function generateMetadata({ params }: { params: { division: string } }): Metadata {
  const d = divisions.find((x) => x.slug === params.division)
  if (!d) return {}
  return { title: `${nameOf(d)} — Arbiter`, description: d.subhead }
}

export default function DivisionPage({ params }: { params: { division: string } }) {
  const d = divisions.find((x) => x.slug === params.division)
  if (!d) notFound()

  const others = divisions.filter((x) => x.id !== d.id)

  return (
    <PageShell>
      <PageHeader accent eyebrow={nameOf(d)} title={d.tagline} subhead={d.subhead} />

      <div className="divpage__photo">
        <Photo image={d.heroImage} sizes="100vw" priority />
      </div>

      <section className="section" aria-labelledby="dp-products">
        <div className="content">
          <h2 className="h2" id="dp-products">What we build here</h2>
          <div className="grid divpage__cards">
            {d.products.map((p) => (
              <article
                className="card"
                key={p.name}
                id={p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                style={{ ['--col-span' as string]: 6 }}
              >
                <p className="eyebrow">{p.name}</p>
                <h3 className="card__title">{p.headline}</h3>
                <p className="card__body">{p.note}</p>
                {p.detail?.map((para, i) => (
                  <p className="card__body" key={i}>{para}</p>
                ))}
                {p.href && p.href !== `/${d.slug}#signet` && (
                  <p className="card__foot">
                    <Link className="named-link" href={p.href}>
                      {p.linkLabel}
                      <span className="named-link__arrow" aria-hidden="true">→</span>
                    </Link>
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section divpage__for" aria-labelledby="dp-for">
        <div className="content grid">
          <h2 className="h2" id="dp-for" style={{ ['--col-span' as string]: 5 }}>Who this is for</h2>
          <p className="lede measure" style={{ ['--col-span' as string]: 7 }}>{d.audience}</p>
        </div>
      </section>

      <section className="section divpage__next" aria-labelledby="dp-next">
        <div className="content">
          <h2 className="h2" id="dp-next">The other divisions</h2>
          <ul className="divisions__list">
            {others.map((o) => (
              <li key={o.id}>
                <Link href={`/${o.slug}`} className="divisions__row">
                  <span className="divisions__name h4">{nameOf(o)}</span>
                  <span className="divisions__tag body-sec">{o.tagline}</span>
                  <span className="divisions__go named-link__arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="divpage__cta">
            <a className="btn btn--primary" href={contactHref(`Arbiter — ${nameOf(d)}`)}>
              Talk to us about {nameOf(d).toLowerCase()}
            </a>
          </p>
        </div>
      </section>
    </PageShell>
  )
}
