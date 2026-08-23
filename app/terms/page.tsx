import type { Metadata } from 'next'
import Link from 'next/link'
import PageShell from '@/components/site/PageShell'
import PageHeader from '@/components/site/PageHeader'
import { contactEmail, founder, legal } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms of Use — Arbiter',
  description: 'The terms that govern use of the Arbiter website.',
}

/**
 * Document metadata for this policy version. Not an Arbiter entity fact, so
 * it stays here rather than in lib/site.ts — bump it alongside any material
 * change to the text below.
 */
const EFFECTIVE_DATE = 'July 24, 2026'

const SECTIONS = [
  { id: 'what-this-site-is', label: 'What this site is' },
  { id: 'definitions', label: 'Definitions' },
  { id: 'not-an-offer', label: 'Not an offer, and not advice' },
  { id: 'forward-looking-statements', label: 'Forward-looking statements' },
  { id: 'intellectual-property', label: 'Intellectual property' },
  { id: 'acceptable-use', label: 'Acceptable use' },
  { id: 'third-party-links', label: 'Third-party links' },
  { id: 'no-warranties', label: 'No warranties' },
  { id: 'limitation-of-liability', label: 'Limitation of liability' },
  { id: 'term-and-termination', label: 'Term and termination' },
  { id: 'governing-law', label: 'Governing law and disputes' },
  { id: 'changes', label: 'Changes' },
  { id: 'contact', label: 'Contact' },
] as const

export default function TermsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Use"
        subhead="The terms that govern use of this website."
      />

      <section className="section legal" aria-label="Terms of use">
        <div className="content">
          <p className="machine legal__meta">
            Effective {EFFECTIVE_DATE} · {legal.businessNameEn}, {legal.jurisdiction}
          </p>

          <p className="lede legal__intro">
            These terms govern your use of {legal.businessNameEn}&rsquo;s website. By using the
            site you agree to them. If you do not agree, please do not use the site.
          </p>

          <nav className="legal__toc" aria-label="Sections in these terms">
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
            <h2 id="what-this-site-is">1. What this site is</h2>
            <p>
              This website is an informational presentation of {legal.businessNameEn}, a
              business registered in the {legal.jurisdiction} by {founder.name} (
              {legal.representativeKo}), business registration number{' '}
              {legal.registrationNumber}. It describes work across several domains at different
              stages of maturity. Descriptions of that work are statements of current status, not
              promises about the future.
            </p>

            <h2 id="definitions">2. Definitions</h2>
            <p>
              &ldquo;{legal.businessNameEn}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, and
              &ldquo;our&rdquo; mean {legal.businessNameEn}, the registered operating entity.
              &ldquo;Site&rdquo; means this website and its pages. &ldquo;You&rdquo; means anyone
              who accesses the Site. &ldquo;Content&rdquo; means the text, marks, logos, images,
              and design presented on the Site. Any software, product, or paid service is
              governed by its own separate agreement, which prevails over these terms for that
              software or service.
            </p>

            <h2 id="not-an-offer">3. Not an offer, and not advice</h2>
            <p>
              Nothing on this site is an offer to sell, a solicitation to buy, or a recommendation
              regarding any product, security, or investment. Nothing here is legal, financial,
              medical, or other professional advice. Do not act on the contents of this site
              without seeking advice suited to your own situation.
            </p>

            <h2 id="forward-looking-statements">4. Forward-looking statements</h2>
            <p>
              The site may describe intended features, research directions, and plans. These are
              inherently uncertain and may change or not happen. We make no guarantee that
              anything described as in development or research will be released, or will perform
              as described.
            </p>

            <h2 id="intellectual-property">5. Intellectual property</h2>
            <p>
              The name {legal.businessNameEn}, the marks and logos, the text, and the design of
              this site belong to {legal.businessNameEn} unless stated otherwise. You may view
              and share links to the site. You may not copy, republish, or use the branding or
              substantial portions of the content for your own purposes without permission. Where
              open-source code is published under its own license, that license governs the code.
            </p>

            <h2 id="acceptable-use">6. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>use the site in a way that breaks any law or infringes anyone&rsquo;s rights;</li>
              <li>attempt to gain unauthorized access to the site or its infrastructure;</li>
              <li>interfere with the site&rsquo;s operation or security, or place undue load on it; or</li>
              <li>misrepresent your affiliation with {legal.businessNameEn} or its operator.</li>
            </ul>

            <h2 id="third-party-links">7. Third-party links</h2>
            <p>
              The site may link to third-party sites, such as source-code repositories. We are
              not responsible for the content, policies, or practices of sites we do not control.
            </p>

            <h2 id="no-warranties">8. No warranties</h2>
            <p>
              The site is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without
              warranties of any kind, whether express or implied, including fitness for a
              particular purpose and accuracy. We do not warrant that the site will be
              uninterrupted, error-free, or free of harmful components.
            </p>

            <h2 id="limitation-of-liability">9. Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, {legal.businessNameEn} will not be liable
              for any indirect, incidental, or consequential damages, or for any loss arising from
              your use of, or inability to use, this website. Nothing in these terms limits
              liability that cannot be limited or excluded under the mandatory law of the{' '}
              {legal.jurisdiction}, including the Act on the Regulation of Terms and Conditions.
            </p>

            <h2 id="term-and-termination">10. Term and termination</h2>
            <p>
              These terms apply while you use the Site. We may suspend or restrict access to the
              Site, in whole or in part, if you breach these terms or to protect the Site&rsquo;s
              security and availability. Provisions that by their nature should survive &mdash;
              intellectual property, disclaimers, limitation of liability, and governing law
              &mdash; survive any end of your use of the Site.
            </p>

            <h2 id="governing-law">11. Governing law and disputes</h2>
            <p>
              These terms are governed by the laws of the {legal.jurisdiction}, without regard to
              conflict-of-laws rules. Disputes will be subject to the competent courts of the{' '}
              {legal.jurisdiction}, unless a mandatory law in your place of residence provides
              otherwise.
            </p>

            <h2 id="changes">12. Changes</h2>
            <p>
              We may update these terms. The current version, with its effective date, is always
              the one posted here, and any material change will be announced on this page in
              advance of taking effect. Continued use of the site after a change takes effect
              means you accept the updated terms.
            </p>

            <h2 id="contact">13. Contact</h2>
            <p>
              Questions about these terms:{' '}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </p>

            <p className="small legal__notice">{legal.emailHarvestNotice}</p>
          </div>
        </div>
      </section>

      <section className="section legal__crosslink" aria-label="Related legal page">
        <div className="content">
          <p className="eyebrow legal__crosslink-label">Also on this site</p>
          <Link className="named-link" href="/privacy">
            Privacy Policy
            <span className="named-link__arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </PageShell>
  )
}
