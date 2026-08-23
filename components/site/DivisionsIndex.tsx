import Link from 'next/link'
import { divisions, nameOf } from '@/lib/divisions'

/** Five rows, one line each, hairline-separated. The whole row is the target. */
export default function DivisionsIndex() {
  return (
    <section className="section divisions" id="divisions" aria-labelledby="div-title">
      <div className="content">
        <p className="eyebrow">Divisions</p>
        <h2 className="h2 divisions__title" id="div-title">
          Five divisions, one standard of proof
        </h2>
        <ul className="divisions__list">
          {divisions.map((d) => (
            <li key={d.id}>
              <Link href={`/${d.slug}`} className="divisions__row">
                <span className="divisions__name h4">{nameOf(d)}</span>
                <span className="divisions__tag body-sec">{d.tagline}</span>
                <span className="divisions__go named-link__arrow" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
