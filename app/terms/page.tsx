import type { Metadata } from 'next'
import Link from 'next/link'
import { legal, founder } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Terms of Use — Arbiter',
  description: 'The terms that govern use of the Arbiter website.',
}

export default function TermsPage() {
  return (
    <>
      <header className="nav">
        <div className="wrap nav__inner">
          <Link href="/" className="wordmark">ARBITER</Link>
          <nav className="nav__links" aria-label="Primary">
            <Link href="/#company">Company</Link>
            <Link href="/privacy">Privacy</Link>
            <a href={`mailto:${founder.contact}`} className="nav__cta">Contact</a>
          </nav>
        </div>
      </header>

      <main className="cv legal">
        <section className="wrap cv__hero">
          <p className="eyebrow">Legal</p>
          <h1 className="cv__name">Terms of Use</h1>
          <p className="cv__tagline">The terms that govern use of this website.</p>
          <p className="legal__meta">Effective {legal.effectiveDate} · {legal.entity}, {legal.jurisdiction}</p>
        </section>

        <section className="wrap cv__block legal__prose">
          <p className="legal__intro">
            These terms govern your use of {legal.entity}&rsquo;s website. By using the
            site you agree to them. If you do not agree, please do not use the site.
          </p>

          <h2>1. What this site is</h2>
          <p>
            This website is an informational presentation of {legal.entity}, a brand
            operated by {legal.registeredEntity}, a business registered in the{' '}
            {legal.jurisdiction} by {legal.operator} ({legal.representativeKo}),
            business registration number {legal.registrationNumber}. It describes work
            across several domains at different stages of maturity. Descriptions of
            that work are statements of current status, not promises about the future.
          </p>

          <h2>2. Definitions</h2>
          <p>
            &ldquo;{legal.entity}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, and &ldquo;our&rdquo; mean {legal.registeredEntity},
            the operator of the {legal.entity} brand. &ldquo;Site&rdquo; means this website and
            its pages. &ldquo;You&rdquo; means anyone who accesses the Site. &ldquo;Content&rdquo; means
            the text, marks, logos, images, and design presented on the Site. Any
            software, product, or paid service is governed by its own separate
            agreement, which prevails over these terms for that software or service.
          </p>

          <h2>3. Not an offer, and not advice</h2>
          <p>
            Nothing on this site is an offer to sell, a solicitation to buy, or a
            recommendation regarding any product, security, or investment. Nothing
            here is legal, financial, medical, or other professional advice. Do not
            act on the contents of this site without seeking advice suited to your
            own situation.
          </p>

          <h2>4. Forward-looking statements</h2>
          <p>
            The site may describe intended features, research directions, and plans.
            These are inherently uncertain and may change or not happen. We make no
            guarantee that anything described as in development or research will be
            released, or will perform as described.
          </p>

          <h2>5. Intellectual property</h2>
          <p>
            The name {legal.entity}, the marks and logos, the text, and the design
            of this site belong to {legal.registeredEntity} unless stated otherwise. You may
            view and share links to the site. You may not copy, republish, or use
            the branding or substantial portions of the content for your own
            purposes without permission. Where open-source code is published under
            its own license, that license governs the code.
          </p>

          <h2>6. Acceptable use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>use the site in a way that breaks any law or infringes anyone&rsquo;s rights;</li>
            <li>attempt to gain unauthorized access to the site or its infrastructure;</li>
            <li>interfere with the site&rsquo;s operation or security, or place undue load on it; or</li>
            <li>misrepresent your affiliation with {legal.entity} or its operator.</li>
          </ul>

          <h2>7. Third-party links</h2>
          <p>
            The site may link to third-party sites, such as source-code
            repositories. We are not responsible for the content, policies, or
            practices of sites we do not control.
          </p>

          <h2>8. No warranties</h2>
          <p>
            The site is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without warranties of
            any kind, whether express or implied, including fitness for a particular
            purpose and accuracy. We do not warrant that the site will be
            uninterrupted, error-free, or free of harmful components.
          </p>

          <h2>9. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, {legal.registeredEntity} will
            not be liable for any indirect, incidental, or consequential damages, or
            for any loss arising from your use of, or inability to use, this website.
            Nothing in these terms limits liability that cannot be limited or excluded
            under the mandatory law of the {legal.jurisdiction}, including the Act on
            the Regulation of Terms and Conditions.
          </p>

          <h2>10. Term and termination</h2>
          <p>
            These terms apply while you use the Site. We may suspend or restrict access
            to the Site, in whole or in part, if you breach these terms or to protect
            the Site&rsquo;s security and availability. Provisions that by their nature should
            survive &mdash; intellectual property, disclaimers, limitation of liability, and
            governing law &mdash; survive any end of your use of the Site.
          </p>

          <h2>11. Governing law and disputes</h2>
          <p>
            These terms are governed by the laws of the {legal.jurisdiction}, without
            regard to conflict-of-laws rules. Disputes will be subject to the
            competent courts of the {legal.jurisdiction}, unless a mandatory law in
            your place of residence provides otherwise.
          </p>

          <h2>12. Changes</h2>
          <p>
            We may update these terms. The current version, with its effective date,
            is always the one posted here, and any material change will be announced on
            this page in advance of taking effect. Continued use of the site after a
            change takes effect means you accept the updated terms.
          </p>

          <h2>13. Contact</h2>
          <p>
            Questions about these terms: <a href={`mailto:${legal.contact}`}>{legal.contact}</a>.
          </p>
        </section>

        <section className="wrap cv__block">
          <div className="legal__nav">
            <Link href="/" className="btn-link">&larr;&nbsp;Back to Arbiter</Link>
            <Link href="/privacy" className="btn-link">Privacy Policy&nbsp;&rarr;</Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__biz"><div className="wrap">
          <p className="footer__biz-reg">상호 {legal.businessNameKo}({legal.businessNameEn}) · 대표 {legal.representativeKo} · 사업자등록번호 {legal.registrationNumber}{legal.showAddress && <> · {legal.registeredAddress}</>} · 이메일 {legal.contact}</p>
        </div></div>
        <div className="footer__bar"><div className="wrap"><span>© 2026 {legal.businessNameEn}. All rights reserved.</span><span>{legal.entity}, a brand of {legal.businessNameEn}.</span></div></div>
      </footer>
    </>
  )
}
