import Link from 'next/link'
import { financeDivision, nameOf } from '@/lib/divisions'

/**
 * The one division shown in depth on the homepage. Cards are deliberately
 * unequal: Tollgate takes seven columns because it is the flagship, the other
 * two take five and share a row. A uniform three-column grid would say all
 * three matter equally, which is not what we mean.
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
            <h3 className="card__title">{lead.note}</h3>
            <p className="card__body">
              Runs read-only beside the screener a firm already uses, so adopting it needs no
              replacement and never becomes the block-of-record.
            </p>
            <p className="card__body">
              When an examiner asks why a counterparty was blocked six months ago, the usual
              answer is that the list has moved, the vendor&rsquo;s system has been updated, and the
              decision can no longer be reproduced. A Tollgate receipt is re-derived from the
              inputs that produced it, in a browser, with no account and no call back to us.
            </p>
            <p className="card__body">
              Reproducibility is offered on the exact-match path only. That limit is stated on
              the verifier itself rather than buried, because a green check over a match the
              system cannot actually reproduce would defeat the point of the product.
            </p>
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
              <h3 className="card__title">{p.note}</h3>
              {p.href ? (
                <p className="card__foot">
                  <Link className="named-link" href={p.href}>
                    {p.linkLabel}
                    <span className="named-link__arrow" aria-hidden="true">→</span>
                  </Link>
                </p>
              ) : (
                <p className="small finance__nolink">Not a separate product page.</p>
              )}
            </article>
          ))}
        </div>

        <p className="finance__more">
          <Link className="named-link" href={`/${d.slug}`}>
            See the {nameOf(d).toLowerCase()} division
            <span className="named-link__arrow" aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  )
}
