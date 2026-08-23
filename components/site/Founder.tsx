import { contactEmail, contactHref, founder } from '@/lib/site'

/**
 * 5/7 split. Portrait left, two short paragraphs right.
 *
 * TODO: no portrait asset exists. The left column renders a geometric
 * placeholder built from the grid itself. Set `founder.portrait` in lib/site.ts
 * once a real portrait is commissioned.
 */
export default function Founder() {
  return (
    <section className="section founder" id="founder" aria-labelledby="founder-name">
      <div className="content grid">
        <div className="founder__portrait" style={{ ['--col-span' as string]: 5 }}>
          {founder.portrait ? (
            <img src={founder.portrait} alt="" width={800} height={1000} loading="lazy" />
          ) : (
            <svg viewBox="0 0 100 125" role="presentation" className="founder__placeholder">
              <g fill="none" stroke="currentColor" strokeWidth="0.5">
                <rect x="0.25" y="0.25" width="99.5" height="124.5" />
                <path d="M0 78h100M32 0v125M68 0v125" opacity="0.4" />
              </g>
            </svg>
          )}
        </div>
        <div className="founder__body" style={{ ['--col-span' as string]: 7 }}>
          <p className="eyebrow">{founder.role}</p>
          <h2 className="h3 founder__name" id="founder-name">{founder.name}</h2>
          {founder.paragraphs.map((p, i) => (
            <p className="body-sec measure founder__p" key={i}>{p}</p>
          ))}
          <p className="founder__contact">
            <a className="named-link" href={contactHref()}>
              {contactEmail}
              <span className="named-link__arrow" aria-hidden="true">→</span>
            </a>
          </p>
          <p className="machine founder__meta">{founder.meta}</p>
        </div>
      </div>
    </section>
  )
}
