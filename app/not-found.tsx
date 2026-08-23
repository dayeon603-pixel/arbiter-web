import Link from 'next/link'
import PageShell from '@/components/site/PageShell'
import PageHeader from '@/components/site/PageHeader'
import { divisions, nameOf } from '@/lib/divisions'

export default function NotFound() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="404"
        title="That page is not here"
        subhead="The address may have changed, or it may never have existed. Everything on the site is one of these."
      />
      <section className="section" aria-label="Where to go instead">
        <div className="content">
          <ul className="divisions__list">
            <li>
              <Link href="/" className="divisions__row">
                <span className="divisions__name h4">Home</span>
                <span className="divisions__tag body-sec">The thesis, and a receipt you can check.</span>
                <span className="divisions__go named-link__arrow" aria-hidden="true">→</span>
              </Link>
            </li>
            <li>
              <Link href="/verify" className="divisions__row">
                <span className="divisions__name h4">Verifier</span>
                <span className="divisions__tag body-sec">Re-derive a receipt yourself, offline.</span>
                <span className="divisions__go named-link__arrow" aria-hidden="true">→</span>
              </Link>
            </li>
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
