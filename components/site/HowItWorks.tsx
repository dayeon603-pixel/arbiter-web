/**
 * Three-step diagram. Each panel is drawn by hand rather than assembled from
 * an icon set, because the point of the section is the mechanism and an icon
 * of a padlock does not show a mechanism.
 *
 * Panel 1 shows the two inputs a decision is pinned to. Panel 2 shows the
 * chain: each receipt carries the previous hash, so the order is load-bearing.
 * Panel 3 shows what verification actually does — recompute, compare, and
 * fail visibly when a byte moved.
 *
 * All strokes inherit `currentColor` so the diagrams work on either ground.
 */

const V = '0 0 240 132'

function Decide() {
  return (
    <svg viewBox={V} role="img" aria-labelledby="d1t" className="diagram">
      <title id="d1t">
        A payment and a hash-identified sanctions list snapshot both feed the rulebook,
        which returns a verdict of DENY.
      </title>
      <g fill="none" stroke="currentColor" strokeWidth="1.25">
        <rect x="1" y="10" width="84" height="26" rx="2" />
        <rect x="1" y="58" width="84" height="34" rx="2" />
        <rect x="118" y="32" width="56" height="32" rx="2" />
        <path d="M85 23h20a8 8 0 0 1 8 8v5" />
        <path d="M85 75h20a8 8 0 0 0 8-8v-5" />
        <path d="M174 48h22" />
        <path d="m192 44 5 4-5 4" strokeLinejoin="round" strokeLinecap="round" />
      </g>
      <g className="diagram__label">
        <text x="9" y="27">payment</text>
        <text x="9" y="74">list snapshot</text>
        {/* The pinned list is the part people miss: the verdict is bound to the
            list as it stood, not to whatever it says today. */}
        <text x="9" y="86" className="diagram__hash">9ff2a26d…</text>
        <text x="126" y="52">rulebook</text>
        <text x="202" y="52" className="diagram__strong">DENY</text>
      </g>
    </svg>
  )
}

function Seal() {
  return (
    <svg viewBox={V} role="img" aria-labelledby="d2t" className="diagram">
      <title id="d2t">
        Three receipts in a chain. Each one stores the hash of the receipt before it and is
        signed, so removing or reordering any record breaks the chain.
      </title>
      <g fill="none" stroke="currentColor" strokeWidth="1.25">
        {[0, 1, 2].map((i) => {
          const x = 2 + i * 80
          return (
            <g key={i}>
              <rect x={x} y="30" width="68" height="46" rx="2" />
              <path d={`M${x} 46h68`} opacity="0.45" />
              {i < 2 && <path d={`M${x + 68} 53h12`} />}
              {i < 2 && (
                <path d={`m${x + 76} 49 5 4-5 4`} strokeLinejoin="round" strokeLinecap="round" />
              )}
            </g>
          )
        })}
      </g>
      {/* The signature mark: a short authority stroke under each sealed block. */}
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="diagram__accent">
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${10 + i * 80} 84h20`} />
        ))}
      </g>
      <g className="diagram__label">
        {[0, 1, 2].map((i) => (
          <text key={i} x={8 + i * 80} y="42" className="diagram__hash">
            prev
          </text>
        ))}
        {[0, 1, 2].map((i) => (
          <text key={i} x={8 + i * 80} y="64">
            receipt
          </text>
        ))}
        {[0, 1, 2].map((i) => (
          <text key={i} x={8 + i * 80} y="98" className="diagram__hash">
            signed
          </text>
        ))}
      </g>
    </svg>
  )
}

function Replay() {
  return (
    <svg viewBox={V} role="img" aria-labelledby="d3t" className="diagram">
      <title id="d3t">
        A third party recomputes the hash from the receipt and compares it with the stored
        hash. An unchanged record matches; a record with one byte altered does not.
      </title>
      <g fill="none" stroke="currentColor" strokeWidth="1.25">
        <rect x="1" y="10" width="76" height="26" rx="2" />
        <rect x="1" y="84" width="76" height="26" rx="2" />
        <rect x="110" y="45" width="62" height="30" rx="2" />
        <path d="M77 23h16a8 8 0 0 1 8 8v10M77 97h16a8 8 0 0 0 8-8V79" />
        <path d="M172 54h20M172 68h20" />
      </g>
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="diagram__ok">
        <path d="m196 51 4 5 8-9" fill="none" />
      </g>
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="diagram__bad">
        <path d="m197 64 9 9M206 64l-9 9" fill="none" />
      </g>
      <g className="diagram__label">
        <text x="9" y="27">receipt</text>
        <text x="9" y="101">tampered</text>
        <text x="118" y="64">recompute</text>
      </g>
    </svg>
  )
}

const STEPS = [
  {
    n: '01',
    title: 'Pin the decision',
    body: 'The verdict is recorded against a hash-identified snapshot of the list as it stood at that moment, not against whatever the list says today.',
    art: <Decide />,
  },
  {
    n: '02',
    title: 'Seal it into a chain',
    body: 'Each receipt is signed and carries the hash of the one before it. Deleting a record, editing one, or reordering two of them all break the chain.',
    art: <Seal />,
  },
  {
    n: '03',
    title: 'Let anyone re-derive it',
    body: 'A third party recomputes the hash from the receipt and checks the signature, offline, with no account and no call back to us.',
    art: <Replay />,
  },
]

export default function HowItWorks() {
  return (
    <section className="section how" aria-labelledby="how-title">
      <div className="content">
        <p className="eyebrow">How it works</p>
        <h2 className="h2 how__title" id="how-title">
          <span className="hang-diag">A</span> record that outlives the vendor
        </h2>
        <p className="lede measure how__sub">
          Three steps turn a screening decision into evidence someone else can check.
        </p>

        <ol className="how__steps">
          {STEPS.map((s, i) => (
            <li className="how__step rise" key={s.n} style={{ animationDelay: `calc(${i} * var(--stagger))` }}>
              <div className="how__art">{s.art}</div>
              <p className="eyebrow how__n">{s.n}</p>
              <h3 className="h4 how__step-title">{s.title}</h3>
              <p className="body-sec">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
