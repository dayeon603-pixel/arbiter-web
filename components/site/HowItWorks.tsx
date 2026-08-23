/**
 * Three-step diagram, drawn by hand. An icon of a padlock does not show a
 * mechanism, so each panel shows the actual one.
 *
 * Redrawn at ~1.6x the first version: the viewBox is wider relative to the
 * label size, strokes are solid rather than hairline, and the type sits at a
 * size that survives being scaled into a third of a column. Everything
 * inherits `currentColor`, so the whole set inverts on the ink ground with no
 * second copy of the artwork.
 *
 * Panel 1 — the two inputs a verdict is bound to, including the pinned list.
 * Panel 2 — the chain, which is what makes ordering load-bearing.
 * Panel 3 — verification: recompute, compare, fail visibly on one changed
 *           byte. The intact and tampered inputs differ in stroke as well as
 *           colour, so the distinction survives greyscale and colour blindness.
 */

const V = '0 0 380 200'
const S = 2 // solid, not hairline

function Decide() {
  return (
    <svg viewBox={V} role="img" aria-labelledby="d1t" className="diagram">
      <title id="d1t">
        A payment and a hash-identified sanctions list snapshot both feed the rulebook,
        which returns a verdict of DENY.
      </title>
      <g fill="none" stroke="currentColor" strokeWidth={S}>
        <rect x="2" y="20" width="140" height="48" rx="3" />
        <rect x="2" y="102" width="140" height="62" rx="3" />
        <rect x="196" y="62" width="104" height="60" rx="3" />
        <path d="M142 44h30a12 12 0 0 1 12 12v6" />
        <path d="M142 133h30a12 12 0 0 0 12-12v-6" />
        <path d="M300 92h40" />
        <path d="m334 85 9 7-9 7" strokeLinejoin="round" strokeLinecap="round" />
      </g>
      <g className="diagram__label">
        <text x="16" y="50">payment</text>
        <text x="16" y="128">list snapshot</text>
        <text x="16" y="150" className="diagram__hash">9ff2a26d…</text>
        <text x="212" y="98">rulebook</text>
        <text x="300" y="140" className="diagram__strong diagram__big">DENY</text>
      </g>
    </svg>
  )
}

function Seal() {
  return (
    <svg viewBox={V} role="img" aria-labelledby="d2t" className="diagram">
      <title id="d2t">
        Three receipts in a chain. Each stores the hash of the receipt before it and is
        signed, so removing or reordering any record breaks the chain.
      </title>
      <g fill="none" stroke="currentColor" strokeWidth={S}>
        {[0, 1, 2].map((i) => {
          const x = 3 + i * 130
          return (
            <g key={i}>
              <rect x={x} y="44" width="108" height="86" rx="3" />
              <path d={`M${x} 74h108`} />
              {i < 2 && <path d={`M${x + 108} 87h14`} />}
              {i < 2 && (
                <path d={`m${x + 114} 80 9 7-9 7`} strokeLinejoin="round" strokeLinecap="round" />
              )}
            </g>
          )
        })}
      </g>
      {/* Each block's signature: a solid authority stroke beneath it. */}
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="diagram__accent">
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${17 + i * 130} 148h44`} />
        ))}
      </g>
      <g className="diagram__label">
        {[0, 1, 2].map((i) => (
          <text key={`p${i}`} x={17 + i * 130} y="66" className="diagram__hash">prev hash</text>
        ))}
        {[0, 1, 2].map((i) => (
          <text key={`r${i}`} x={17 + i * 130} y="106">receipt</text>
        ))}
        {[0, 1, 2].map((i) => (
          <text key={`s${i}`} x={17 + i * 130} y="172">signed</text>
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
        hash. The intact record matches. A record with one byte altered does not.
      </title>
      <g fill="none" stroke="currentColor" strokeWidth={S}>
        <rect x="2" y="16" width="132" height="50" rx="3" />
        <rect x="186" y="72" width="112" height="56" rx="3" />
        <path d="M134 41h28a12 12 0 0 1 12 12v19" />
        <path d="M134 158h28a12 12 0 0 0 12-12v-18" />
        <path d="M298 88h30M298 118h30" />
      </g>
      <g fill="none" stroke="currentColor" strokeWidth={S} strokeDasharray="7 5" className="diagram__bad">
        <rect x="2" y="134" width="132" height="48" rx="3" />
      </g>
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" className="diagram__ok">
        <path d="m332 88 7 8 13-16" />
      </g>
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" className="diagram__bad">
        <path d="m333 111 16 15M349 111l-16 15" />
      </g>
      <g className="diagram__label">
        <text x="16" y="46">receipt</text>
        <text x="16" y="162" className="diagram__badtext">byte changed</text>
        <text x="202" y="106">recompute</text>
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
    <section
      className="section section--dark on-inverse how"
      id="how-it-works"
      aria-labelledby="how-title"
    >
      <div className="content">
        <p className="eyebrow">How it works</p>
        <h2 className="h2 how__title" id="how-title">
          <span className="hang-diag">A</span> record that outlives the vendor
        </h2>
        <p className="lede measure how__sub">
          Three steps turn a screening decision into evidence someone else can check.
        </p>

        {/* A real sequence: the numbering encodes order the reader needs. */}
        <ol className="how__steps">
          {STEPS.map((s, i) => (
            <li
              className="how__step rise"
              key={s.n}
              style={{ animationDelay: `calc(${i} * var(--stagger))` }}
            >
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
