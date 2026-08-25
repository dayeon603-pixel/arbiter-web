import Link from 'next/link'
import SectorMark from './SectorMark'
import { divisions, nameOf } from '@/lib/divisions'
import { groupLine } from '@/lib/structure'

/** Five rows, one line each, hairline-separated. The whole row is the target. */
export default function DivisionsIndex() {
  return (
    <section className="section divisions" id="divisions" aria-labelledby="div-title">
      <div className="content">
        <p className="eyebrow">Sectors</p>
        <h2 className="h2 divisions__title" id="div-title">
          Five sectors, one standard of proof
        </h2>
        <p className="lede measure divisions__sub">{groupLine}</p>
        <ul className="divisions__list">
          {divisions.map((d) => (
            <li key={d.id}>
              <Link
                href={`/${d.slug}`}
                className="divisions__row"
                style={{ ['--c-accent-text' as string]: d.accent.light }}
              >
                <span className="divisions__mark" aria-hidden="true">
                  <SectorMark mark={d.mark} size={30} />
                </span>
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
