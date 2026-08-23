import type { Metadata } from 'next'
import Link from 'next/link'
import PageShell from '@/components/site/PageShell'
import PageHeader from '@/components/site/PageHeader'
import { contactEmail, founder, legal } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy — Arbiter',
  description: 'How Arbiter handles personal information collected through this website.',
}

/**
 * Document metadata for this policy version. Not an Arbiter entity fact, so
 * it stays here rather than in lib/site.ts — bump it alongside any material
 * change to the text below.
 */
const EFFECTIVE_DATE = 'July 24, 2026'

/**
 * Vendor name used in the prose below. Not an Arbiter entity fact — lib/site.ts
 * intentionally carries only Arbiter's own registration details.
 */
const HOSTING_PROVIDER = 'Cloudflare, Inc.'

const SECTIONS = [
  { id: 'who-is-responsible', label: 'Who is responsible' },
  { id: 'what-this-site-collects', label: 'What this site collects' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'why-we-process-it', label: 'Why we process it, and our legal basis' },
  { id: 'who-else-sees-it', label: 'Who else sees it' },
  { id: 'international-transfers', label: 'International transfers' },
  { id: 'how-long-we-keep-it', label: 'How long we keep it' },
  { id: 'your-rights', label: 'Your rights' },
  { id: 'children', label: 'Children' },
  { id: 'security', label: 'Security' },
  { id: 'changes-to-this-policy', label: 'Changes to this policy' },
  { id: 'contact-and-complaints', label: 'Contact and complaints' },
] as const

export default function PrivacyPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        subhead="How this website handles personal information."
      />

      <section className="section legal" aria-label="Privacy policy">
        <div className="content">
          <p className="machine legal__meta">
            Effective {EFFECTIVE_DATE} · {legal.businessNameEn}, {legal.jurisdiction}
          </p>

          <p className="lede legal__intro">
            This policy explains what personal information is processed when you visit{' '}
            <strong>{legal.businessNameEn.toLowerCase()}</strong>&rsquo;s website, why, and the
            choices you have. It covers this website only. It does not cover any product or
            service that {legal.businessNameEn} has not yet released; those will carry their own
            notice at launch.
          </p>

          <nav className="legal__toc" aria-label="Sections in this policy">
            <p className="eyebrow legal__toc-title">On this page</p>
            <ol>
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.label}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="legal__prose">
            <h2 id="who-is-responsible">1. Who is responsible</h2>
            <p>
              {legal.businessNameEn} is a business registered in the {legal.jurisdiction} by{' '}
              {founder.name} ({legal.representativeKo}), business registration number{' '}
              {legal.registrationNumber}. For any privacy question you can reach the operator
              directly at <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </p>
            {legal.showAddress && <p>Registered business address: {legal.registeredAddress}.</p>}
            <p>
              Under Korea&rsquo;s Personal Information Protection Act (PIPA), the person
              responsible for personal information at {legal.businessNameEn} is the operator,{' '}
              {founder.name} ({legal.representativeKo}), acting as the personal-information
              protection officer (개인정보 보호책임자). You can reach the officer at{' '}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </p>

            <h2 id="what-this-site-collects">2. What this site collects</h2>
            <p>
              This is a static, informational website. It has no accounts, no sign-up, and no
              forms that submit data to us. In ordinary use we do not ask you for any personal
              information. Two narrow exceptions apply:
            </p>
            <ul>
              <li>
                <strong>Technical delivery data.</strong> The site is served through our hosting
                and content-delivery provider, {HOSTING_PROVIDER}. To deliver and protect the
                site, that provider automatically processes standard request data, including
                your IP address, browser type and version, the page requested, and the date and
                time. Under the GDPR an IP address can be personal data, so we name it here
                explicitly.
              </li>
              <li>
                <strong>Email you choose to send.</strong> Contact links on this site open your
                own email client addressed to the operator. If you email us, we receive your
                address, your message, and anything you include in it. We use a standard email
                provider (Google) to receive that mail.
              </li>
            </ul>
            <p>
              We do not use advertising trackers, we do not build profiles, and we do not sell or
              rent personal information to anyone.
            </p>

            <h2 id="cookies">3. Cookies</h2>
            <p>
              This site sets no advertising or analytics cookies of its own. Our hosting provider
              may set a small number of strictly necessary cookies to keep the site secure and
              running (for example, to tell automated attacks apart from real visitors). These
              are essential to delivering the site and cannot be switched off from within it. If
              we later add privacy-friendly, cookieless usage measurement, this section will be
              updated before it goes live.
            </p>

            <h2 id="why-we-process-it">4. Why we process it, and our legal basis</h2>
            <ul>
              <li>
                <strong>To deliver and secure the website</strong> — technical delivery data.
                Legal basis: our legitimate interest in operating a safe, functioning site (GDPR
                Art. 6(1)(f)).
              </li>
              <li>
                <strong>To answer you</strong> — the email you send us. Legal basis: taking steps
                at your request and our legitimate interest in replying (GDPR Art. 6(1)(b)/(f)).
              </li>
            </ul>

            <h2 id="who-else-sees-it">5. Who else sees it</h2>
            <p>We keep the list of parties short and name them:</p>
            <ul>
              <li>
                <strong>{HOSTING_PROVIDER}</strong> — hosting and content delivery. Processes
                request data to serve and protect the site.
              </li>
              <li>
                <strong>Google</strong> — email delivery, if you choose to email us.
              </li>
            </ul>
            <p>
              We disclose information beyond these only where the law requires it, such as a
              valid legal request from a competent authority.
            </p>

            <h2 id="international-transfers">6. International transfers</h2>
            <p>
              Our hosting and email providers are US-based and operate globally, so processing
              may occur outside {legal.jurisdiction}, including in the United States. Where
              personal data of individuals in the European Economic Area or the United Kingdom is
              transferred, that transfer relies on the providers&rsquo; own approved safeguards,
              such as the EU-US Data Privacy Framework and Standard Contractual Clauses.
            </p>

            <h2 id="how-long-we-keep-it">7. How long we keep it</h2>
            <p>
              Provider request logs are retained only for the short periods those providers apply
              for security and diagnostics. Emails you send us are kept only as long as needed to
              handle your enquiry and any follow-up, then deleted.
            </p>

            <h2 id="your-rights">8. Your rights</h2>
            <p>
              Depending on where you live, you may have the right to access, correct, delete, or
              restrict the processing of your personal information, to object to processing, and
              to data portability. In the Republic of Korea these rights are provided under the
              Personal Information Protection Act (PIPA); in the EEA and UK, under the GDPR. To
              exercise any of them, email <a href={`mailto:${contactEmail}`}>{contactEmail}</a>{' '}
              and we will respond within the period the applicable law requires.
            </p>

            <h2 id="children">9. Children</h2>
            <p>
              This site is not directed to children and does not knowingly collect their personal
              information.
            </p>

            <h2 id="security">10. Security</h2>
            <p>
              The site is served over encrypted connections (HTTPS) and behind our provider&rsquo;s
              security layer. No method of transmission over the internet is perfectly secure, but
              we take reasonable measures appropriate to a site of this kind.
            </p>

            <h2 id="changes-to-this-policy">11. Changes to this policy</h2>
            <p>
              If this policy changes, the new version will be posted here with an updated
              effective date. Material changes will be summarized at the top.
            </p>

            <h2 id="contact-and-complaints">12. Contact and complaints</h2>
            <p>
              Questions or requests: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. If you
              are in Korea and believe your rights have not been respected, you may also contact
              the Personal Information Protection Commission (PIPC). If you are in the EEA or UK,
              you may lodge a complaint with your local data-protection supervisory authority.
            </p>

            <p className="small legal__notice">{legal.emailHarvestNotice}</p>
          </div>
        </div>
      </section>

      <section className="section legal__crosslink" aria-label="Related legal page">
        <div className="content">
          <p className="eyebrow legal__crosslink-label">Also on this site</p>
          <Link className="named-link" href="/terms">
            Terms of Use
            <span className="named-link__arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </PageShell>
  )
}
