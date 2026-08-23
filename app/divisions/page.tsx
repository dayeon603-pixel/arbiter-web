import type { Metadata } from 'next'
import Link from 'next/link'
import PageShell from '@/components/site/PageShell'
import PageHeader from '@/components/site/PageHeader'
import { divisions, nameOf } from '@/lib/divisions'

export const metadata: Metadata = {
  title: 'Divisions — Arbiter',
  description:
    'Five divisions applying one standard of proof: finance, cybersecurity, agriculture, health, and research.',
}

export default function DivisionsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Divisions"
        title="Five divisions, one standard of proof"
        subhead="Different domains, the same requirement: take an ambiguous input, apply the rules, and keep evidence a third party can check."
      />
      <section className="section" aria-label="All divisions">
        <div className="content">
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
    </PageShell>
  )
}
