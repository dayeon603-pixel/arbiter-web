import Link from 'next/link'
import { divisions, nameOf } from '@/lib/divisions'
import { contactEmail, contactHref, externalLinks, legal } from '@/lib/site'
import Wordmark from './Wordmark'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="content footer__grid">
        <div className="footer__brandcol">
          <Wordmark />
          <p className="small footer__note">
            Decision infrastructure for regulated domains.
          </p>
        </div>

        <nav className="footer__col" aria-label="Divisions">
          <h2 className="eyebrow">Divisions</h2>
          <ul>
            {divisions.map((d) => (
              <li key={d.id}>
                <Link href={`/${d.slug}`}>{nameOf(d)}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer__col" aria-label="Company">
          <h2 className="eyebrow">Company</h2>
          <ul>
            <li><Link href="/company">About</Link></li>
            <li><a href={contactHref()}>Contact</a></li>
            <li><a href={externalLinks.github} target="_blank" rel="noopener">GitHub</a></li>
            <li><a href={externalLinks.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
          </ul>
        </nav>

        <nav className="footer__col" aria-label="Resources">
          <h2 className="eyebrow">Resources</h2>
          <ul>
            <li><a href={externalLinks.spec}>Docs</a></li>
            <li><a href={externalLinks.verifier}>Security</a></li>
          </ul>
        </nav>

        <nav className="footer__col" aria-label="Legal">
          <h2 className="eyebrow">Legal</h2>
          <ul>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
          </ul>
        </nav>
      </div>

      {/* Korea requires a registered business to publish its registration
          details. The street address is withheld; it is not required for a
          site that does not transact. */}
      <div className="footer__biz">
        <div className="content">
          <p className="machine footer__reg">
            상호 {legal.businessNameKo}({legal.businessNameEn}) · 대표 {legal.representativeKo} ·
            사업자등록번호 {legal.registrationNumber}
            {legal.showAddress && <> · {legal.registeredAddress}</>} · 이메일 {contactEmail}
          </p>
          <p className="machine footer__notice">{legal.emailHarvestNotice}</p>
        </div>
      </div>

      <div className="footer__bar">
        <div className="content footer__bar-inner">
          <span className="machine">© 2026 {legal.businessNameEn}</span>
          <span className="machine">{legal.jurisdiction}</span>
        </div>
      </div>
    </footer>
  )
}
