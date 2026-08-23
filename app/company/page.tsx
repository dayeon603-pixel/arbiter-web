import type { Metadata } from 'next'
import PageShell from '@/components/site/PageShell'
import PageHeader from '@/components/site/PageHeader'
import Founder from '@/components/site/Founder'
import { contactEmail, contactHref, legal } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Company — Arbiter',
  description:
    'Arbiter builds decision infrastructure for regulated domains. Registered in the Republic of Korea, 2026.',
}

export default function CompanyPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Company"
        title="Built before it was a company"
        subhead="The engine was working, tested software before there was an entity to hold it. Nothing here started as a business plan waiting for a build."
      />

      <section className="section" aria-labelledby="co-standard">
        <div className="content grid">
          <h2 className="h2" id="co-standard" style={{ ['--col-span' as string]: 5 }}>
            One standard, five domains
          </h2>
          <div style={{ ['--col-span' as string]: 7 }}>
            <p className="body-sec measure">
              Arbiter builds decision infrastructure for regulated domains: places where being
              wrong is expensive and someone is required to be able to prove they were right.
            </p>
            <p className="body-sec measure" style={{ marginTop: 'var(--sp-4)' }}>
              Every product is held to the same test. It has to work under scrutiny, hold up
              when the record is examined years later, and state plainly what it can and cannot
              prove. The unifying idea does not change between domains: take an ambiguous
              input, apply the rules, make the call, and keep proof a third party can check.
            </p>
          </div>
        </div>
      </section>

      <Founder />

      <section className="section company__contact" aria-labelledby="co-contact">
        <div className="content grid">
          <h2 className="h2" id="co-contact" style={{ ['--col-span' as string]: 5 }}>Contact</h2>
          <div style={{ ['--col-span' as string]: 7 }}>
            <p className="body-sec measure">
              One address, read by a person. For press, partnerships, or a question about
              anything on this site.
            </p>
            <p style={{ marginTop: 'var(--sp-5)' }}>
              <a className="named-link" href={contactHref('Arbiter — Inquiry')}>
                {contactEmail}
                <span className="named-link__arrow" aria-hidden="true">→</span>
              </a>
            </p>
            <p className="machine company__entity">
              {legal.businessNameKo}({legal.businessNameEn}) · 대표 {legal.representativeKo} ·
              사업자등록번호 {legal.registrationNumber} · {legal.jurisdiction}
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
