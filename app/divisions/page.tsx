import type { Metadata } from 'next'
import Link from 'next/link'
import PageShell from '@/components/site/PageShell'
import PageHeader from '@/components/site/PageHeader'
import SectorMark from '@/components/site/SectorMark'
import { divisions, nameOf } from '@/lib/divisions'
import { groupLine } from '@/lib/structure'

export const metadata: Metadata = {
  title: 'Sectors — Arbiter',
  description:
    'Five sectors applying one standard of proof: finance, cybersecurity, agriculture, health, and research.',
}

export default function DivisionsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Sectors"
        title="Five sectors, one standard of proof"
        subhead={groupLine}
      />
      <section className="section divisions__page" aria-label="All sectors">
        <div className="content">
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
    </PageShell>
  )
}
