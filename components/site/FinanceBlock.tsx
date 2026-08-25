import Link from 'next/link'
import { financeDivision, nameOf } from '@/lib/divisions'

/**
 * The one division shown in depth on the homepage.
 *
 * Cards are deliberately unequal: Tollgate takes seven columns because it is
 * the flagship, the other two take five and share the column beside it. A
 * uniform three-column grid would say all three matter equally, which is not
 * what we mean.
 *
 * Each card is one headline, one sentence, one named link. The longer Tollgate
 * copy lives on /finance — a card that runs to four paragraphs has stopped
 * being a card.
 */
export default function FinanceBlock() {
  const d = financeDivision
  const [lead, ...rest] = d.products

  return (
    <section className="section finance" id="finance" aria-labelledby="fin-title">
      <div className="content">
        <p className="eyebrow">{nameOf(d)}</p>
        <h2 className="h2 finance__title" id="fin-title">
          Proof that survives the audit
        </h2>
        <p className="lede measure finance__sub">{d.subhead}</p>

        <div className="grid finance__cards">
          <article className="card finance__lead" style={{ ['--col-span' as string]: 7 }}>
            <p className="eyebrow">{lead.name}</p>
            <h3 className="card__title">{lead.headline}</h3>
            <p className="card__body">{lead.note}</p>
            {lead.href && (
              <p className="card__foot">
                <Link className="named-link" href={lead.href}>
                  {lead.linkLabel}
                  <span className="named-link__arrow" aria-hidden="true">→</span>
                </Link>
              </p>
            )}
          </article>

          {rest.map((p) => (
            <article className="card" key={p.name} style={{ ['--col-span' as string]: 5 }}>
              <p className="eyebrow">{p.name}</p>
              <h3 className="card__title">{p.headline}</h3>
              <p className="card__body">{p.note}</p>
              {p.href && (
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

        <p className="finance__more">
          <Link className="named-link" href={`/${d.slug}`}>
            See the {nameOf(d).toLowerCase()} sector
            <span className="named-link__arrow" aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  )
}
