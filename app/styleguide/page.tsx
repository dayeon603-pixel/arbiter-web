import type { Metadata } from 'next'
import ProofPanel from '@/components/ui/ProofPanel'
import { contrastRows, palette, spaceScale, typeScale } from '@/lib/tokens'
import './styleguide.css'

export const metadata: Metadata = {
  title: 'Styleguide — Arbiter',
  description: 'Internal reference for the Arbiter design system.',
  robots: { index: false, follow: false },
}

function Ratio({ ratio, requirement }: { ratio: number; requirement: number }) {
  const pass = ratio >= requirement
  return (
    <span className={pass ? 'sg__pass' : 'sg__fail'}>
      {pass ? 'PASS' : 'FAIL'} AA
    </span>
  )
}

export default function Styleguide() {
  const swatches = [
    { name: 'surface', hex: palette.light.surface, note: 'Page ground' },
    { name: 'surface-raised', hex: palette.light.surfaceRaised, note: 'Cards, panels' },
    { name: 'surface-inverse', hex: palette.inverse.surface, note: 'Inverse ground' },
    { name: 'surface-inverse-raised', hex: palette.inverse.surfaceRaised, note: 'Cards on inverse' },
    { name: 'text-primary', hex: palette.light.textPrimary, note: 'Headlines, body' },
    { name: 'text-secondary', hex: palette.light.textSecondary, note: 'Subheads, prose' },
    { name: 'accent', hex: palette.light.accent, note: 'Rules and marks only' },
    { name: 'accent-text', hex: palette.light.accentText, note: 'Gold carrying words' },
    { name: 'verified', hex: palette.light.verified, note: 'Verified state' },
  ]

  return (
    <main className="content sg">
      <header className="sg__head">
        <p className="eyebrow">Internal reference</p>
        <h1 className="h1" style={{ marginTop: 'var(--sp-4)' }}>
          <span className="hang-diag">A</span>rbiter design system
        </h1>
        <p className="lede sg__note">
          Every value on this page resolves to a token in <code className="machine">app/tokens.css</code>.
          Contrast ratios are computed from the palette at build time, not transcribed.
        </p>
      </header>

      {/* ------------------------------------------------------------ type */}
      <section className="sg__section" aria-labelledby="sg-type">
        <h2 className="h3 sg__title" id="sg-type">Type scale</h2>
        <p className="body-sec sg__note" style={{ marginBottom: 'var(--sp-6)' }}>
          Modular scale, ratio 1.26, base 17px. Eight steps. The top three interpolate
          between two adjacent steps across 390–1280px, so the scale stays strict at both
          ends. Mono has two jobs only: eyebrow labels and machine output.
        </p>
        {typeScale.map((t) => (
          <div className="sg__specimen" key={t.token}>
            <p className={t.cls}>Decision infrastructure</p>
            <div className="sg__meta">
              <span>{t.token}</span>
              <span>{t.px}px</span>
              <span>{t.tracking}</span>
              <span>{t.lh}</span>
              <span>{t.use}</span>
            </div>
          </div>
        ))}
        <div className="sg__specimen">
          <p className="machine">0123456789 · a3e8ccea370285a6 · 2026-07-28T18:45:01Z</p>
          <div className="sg__meta">
            <span>--font-mono</span>
            <span>tabular-nums</span>
            <span>slashed-zero</span>
            <span>Machine output</span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- colour */}
      <section className="sg__section" aria-labelledby="sg-colour">
        <h2 className="h3 sg__title" id="sg-colour">Colour</h2>
        <div className="sg__ramp">
          {swatches.map((s) => (
            <figure className="sg__swatch" key={s.name}>
              <div className="sg__chip" style={{ background: s.hex }} />
              <figcaption>
                <span className="machine">{s.hex}</span>
                <span className="small">--c-{s.name}</span>
                <span className="small">{s.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <h3 className="h4" style={{ marginTop: 'var(--sp-8)', marginBottom: 'var(--sp-4)' }}>
          Contrast, measured
        </h3>
        <div className="sg__tablewrap">
          <table className="sg__table">
            <thead>
              <tr>
                <th scope="col">Pair</th>
                <th scope="col">Ratio</th>
                <th scope="col">Needs</th>
                <th scope="col">Result</th>
                <th scope="col">Role</th>
              </tr>
            </thead>
            <tbody>
              {contrastRows.map((r) => (
                <tr key={r.pair}>
                  <td>{r.pair}</td>
                  <td className="sg__mono">{r.ratio.toFixed(2)}:1</td>
                  <td className="sg__mono">{r.requirement}:1</td>
                  <td><Ratio ratio={r.ratio} requirement={r.requirement} /></td>
                  <td className="is-wrap">{r.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* --------------------------------------------------------- spacing */}
      <section className="sg__section" aria-labelledby="sg-space">
        <h2 className="h3 sg__title" id="sg-space">Spacing</h2>
        <p className="body-sec sg__note" style={{ marginBottom: 'var(--sp-6)' }}>
          4px scale. Section rhythm is 120px desktop, 72px mobile, from a single
          <code className="machine"> --rhythm </code> token.
        </p>
        <div className="sg__space">
          {spaceScale.map((s) => (
            <div className="sg__spacerow" key={s.token}>
              <span className="machine">{s.token}</span>
              <span className="machine">{s.px}px</span>
              <span className="sg__bar" style={{ width: `${s.px}px` }} />
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ grid */}
      <section className="sg__section" aria-labelledby="sg-grid">
        <h2 className="h3 sg__title" id="sg-grid">Grid</h2>
        <p className="body-sec sg__note" style={{ marginBottom: 'var(--sp-6)' }}>
          12 columns, 24px gutter, 1200px content inside a 1440px shell. Sections opt
          into asymmetry by setting <code className="machine">--col-span</code>; the grid
          itself is never redefined locally. Below 768px everything collapses to one column.
        </p>
        <div className="grid">
          {Array.from({ length: 12 }, (_, i) => (
            <div className="sg__gridcell" key={i} style={{ ['--col-span' as string]: 1 }}>
              {i + 1}
            </div>
          ))}
          <div className="sg__gridcell sg__gridcell--span">--col-span: 7</div>
        </div>
      </section>

      {/* ------------------------------------------------------ components */}
      <section className="sg__section" aria-labelledby="sg-components">
        <h2 className="h3 sg__title" id="sg-components">Components and states</h2>

        <h3 className="h4" style={{ marginBottom: 'var(--sp-4)' }}>Buttons</h3>
        <div className="sg__states">
          <div className="sg__state">
            <button type="button" className="btn btn--primary">Read the Tollgate spec</button>
            <span className="small">default</span>
          </div>
          <div className="sg__state">
            <button type="button" className="btn btn--primary is-hover">Read the Tollgate spec</button>
            <span className="small">hover</span>
          </div>
          <div className="sg__state">
            <button type="button" className="btn btn--primary is-focus">Read the Tollgate spec</button>
            <span className="small">focus-visible</span>
          </div>
          <div className="sg__state">
            <button type="button" className="btn btn--primary" disabled>Read the Tollgate spec</button>
            <span className="small">disabled</span>
          </div>
        </div>

        <div className="sg__states" style={{ marginTop: 'var(--sp-6)' }}>
          <div className="sg__state">
            <button type="button" className="btn btn--secondary">Verify a receipt</button>
            <span className="small">default</span>
          </div>
          <div className="sg__state">
            <button type="button" className="btn btn--secondary is-hover">Verify a receipt</button>
            <span className="small">hover</span>
          </div>
          <div className="sg__state">
            <button type="button" className="btn btn--secondary is-focus">Verify a receipt</button>
            <span className="small">focus-visible</span>
          </div>
          <div className="sg__state">
            <button type="button" className="btn btn--secondary" disabled>Verify a receipt</button>
            <span className="small">disabled</span>
          </div>
        </div>

        <h3 className="h4" style={{ margin: 'var(--sp-8) 0 var(--sp-4)' }}>Named links</h3>
        <p className="body-sec sg__note" style={{ marginBottom: 'var(--sp-5)' }}>
          Every card and section ends in a named link. There is no bare-arrow variant in
          this system, because a bare arrow tells the reader nothing about where it goes.
        </p>
        <div className="sg__states">
          <div className="sg__state">
            <a className="named-link" href="#sg-components">
              Read the Tollgate spec<span className="named-link__arrow" aria-hidden="true">→</span>
            </a>
            <span className="small">default</span>
          </div>
          <div className="sg__state">
            <a className="named-link is-hover" href="#sg-components">
              Read the Tollgate spec<span className="named-link__arrow" aria-hidden="true">→</span>
            </a>
            <span className="small">hover</span>
          </div>
          <div className="sg__state">
            <a className="named-link is-focus" href="#sg-components">
              Read the Tollgate spec<span className="named-link__arrow" aria-hidden="true">→</span>
            </a>
            <span className="small">focus-visible</span>
          </div>
        </div>

        <h3 className="h4" style={{ margin: 'var(--sp-8) 0 var(--sp-4)' }}>Eyebrow and status</h3>
        <div className="sg__states">
          <div className="sg__state">
            <p className="eyebrow">Finance</p>
            <span className="small">eyebrow — mono role 1</span>
          </div>
          <div className="sg__state">
            <span className="verified"><span className="verified__dot" aria-hidden="true" />Signature valid</span>
            <span className="small">verified state</span>
          </div>
          <div className="sg__state">
            <p className="machine">bf59202537d847494475edbb42856496</p>
            <span className="small">machine output — mono role 2</span>
          </div>
        </div>

        <h3 className="h4" style={{ margin: 'var(--sp-8) 0 var(--sp-4)' }}>Cards</h3>
        <p className="body-sec sg__note" style={{ marginBottom: 'var(--sp-5)' }}>
          Cards take their size from the grid span the parent gives them, never from the
          component. The two below are deliberately unequal.
        </p>
        <div className="grid">
          <article className="card" style={{ ['--col-span' as string]: 7 }}>
            <p className="eyebrow">Tollgate</p>
            <h4 className="card__title">Sanctions decisions an examiner can replay</h4>
            <p className="card__body">
              Each screening decision is pinned to a hash-identified snapshot of the list
              and emitted as a signed receipt. Re-derivation runs offline, in a browser,
              with no account and no call back to us.
            </p>
            <p className="card__foot">
              <a className="named-link" href="/verify">
                Open the verifier<span className="named-link__arrow" aria-hidden="true">→</span>
              </a>
            </p>
          </article>
          <article className="card is-hover" style={{ ['--col-span' as string]: 5 }}>
            <p className="eyebrow">Signet</p>
            <h4 className="card__title">The engine underneath</h4>
            <p className="card__body">
              Deny-by-default policy over Ed25519-signed mandates and verdicts, written to
              a hash-chained receipt ledger.
            </p>
            <p className="card__foot">
              <a className="named-link" href="#sg-components">
                Read the format spec<span className="named-link__arrow" aria-hidden="true">→</span>
              </a>
            </p>
          </article>
        </div>

        <h3 className="h4" style={{ margin: 'var(--sp-8) 0 var(--sp-4)' }}>Proof panel</h3>
        <ProofPanel />
      </section>

      {/* --------------------------------------------------------- inverse */}
      <section className="sg__section" aria-labelledby="sg-inverse">
        <h2 className="h3 sg__title" id="sg-inverse">Inverse ground</h2>
        <p className="body-sec sg__note" style={{ marginBottom: 'var(--sp-6)' }}>
          The same markup, on <code className="machine">.on-inverse</code>. Only the token
          values change — no component has a dark variant.
        </p>
        <div className="on-inverse sg__inverse">
          <p className="eyebrow">Finance</p>
          <h3 className="h3" style={{ marginTop: 'var(--sp-4)' }}>A decision a regulator can replay</h3>
          <p className="lede measure" style={{ marginTop: 'var(--sp-4)' }}>
            Every decision produces a signed, hash-chained record a third party can check
            without trusting us.
          </p>
          <div className="sg__states" style={{ marginTop: 'var(--sp-6)' }}>
            <button type="button" className="btn btn--primary">Read the spec</button>
            <button type="button" className="btn btn--secondary">Verify a receipt</button>
            <span className="verified"><span className="verified__dot" aria-hidden="true" />Signature valid</span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- motion */}
      <section className="sg__section" aria-labelledby="sg-motion">
        <h2 className="h3 sg__title" id="sg-motion">Motion</h2>
        <div className="sg__tablewrap">
          <table className="sg__table">
            <thead>
              <tr>
                <th scope="col">Token</th><th scope="col">Value</th><th scope="col">Applies to</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="sg__mono">--dur</td><td className="sg__mono">400ms</td><td className="is-wrap">Section enter — fade + 8px rise</td></tr>
              <tr><td className="sg__mono">--dur-fast</td><td className="sg__mono">160ms</td><td className="is-wrap">Hover and focus transitions</td></tr>
              <tr><td className="sg__mono">--ease</td><td className="sg__mono">cubic-bezier(0.16, 1, 0.3, 1)</td><td className="is-wrap">Everything</td></tr>
              <tr><td className="sg__mono">--stagger</td><td className="sg__mono">60ms</td><td className="is-wrap">Lists only, never sections</td></tr>
              <tr><td className="sg__mono">--rise</td><td className="sg__mono">8px</td><td className="is-wrap">Entrance offset</td></tr>
            </tbody>
          </table>
        </div>
        <p className="body-sec sg__note" style={{ marginTop: 'var(--sp-5)' }}>
          Under <code className="machine">prefers-reduced-motion: reduce</code> every
          animation and transition drops to 0.01ms and smooth scrolling is disabled.
        </p>
      </section>
    </main>
  )
}
