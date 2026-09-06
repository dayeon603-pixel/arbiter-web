export type Sector = {
  id: string; fig: string; kicker: string; stage: string
  title: string; mission: string; target: string; image: string
  product?: { name: string; note: string; href: string }
  products?: { name: string; note: string; href: string }[]
}

export const hero = {
  eyebrow: 'Arbiter',
  title: 'Decision, safety, and infrastructure for the work that has to be right.',
  sub: 'A multi-industry company building decision, safety, and compliance infrastructure across five regulated and high-stakes domains.',
}

export const sectors: Sector[] = [
  {
    id: 'finance', fig: '01', kicker: 'Finance', stage: 'Shipping',
    title: 'A decision a regulator can replay.',
    mission: 'Building neutral trust and compliance infrastructure for money, autonomous agents, and cross-border trade — wherever a high-stakes call must be made and later proven. Each decision produces a signed, tamper-evident record an examiner can verify independently: who decided what, on whose authority, and that the record has not changed since.',
    target: 'Stablecoin issuers, banks, operators of autonomous AI agents, cross-border traders, and the regulators who audit them.',
    image: '/img/finance.jpg',
    products: [
      { name: 'Caravan', note: 'A neutral trust rail for cross-border trade.', href: '/caravan' },
      { name: 'Tollgate', note: 'Sanctions screening decisions an examiner can replay offline.', href: '/tollgate' },
    ],
  },
  {
    id: 'agriculture', fig: '02', kicker: 'Agriculture & Food Security', stage: 'In development',
    title: 'Cold storage that reaches the last village.',
    mission: 'Developing solar-powered cold-storage infrastructure for the places the electrical grid does not reach. Up to a third of a smallholder harvest spoils before it can be sold, for want of refrigeration. The work is a pay-as-you-go cold chain at village scale, so a farmer’s crop becomes income instead of waste.',
    target: 'Smallholder farmers in sub-Saharan Africa, and the food-security programs that serve them.',
    image: '/img/agriculture.jpg',
    products: [
      { name: 'HarvestGuard', note: 'A solar-powered, pay-as-you-go cold chain for smallholder farmers.', href: '/harvestguard' },
    ],
  },
  {
    id: 'cyber', fig: '03', kicker: 'Cybersecurity & Fraud', stage: 'In development',
    title: 'Stop the scam, then get the money back.',
    mission: 'Developing one system for the whole window of a voice-phishing scam: defend the call while it is happening, then guide the recovery in the hour after money moves. It reads the two surfaces the platforms cannot see — the messenger thread and the bank transfer screen — and runs on the device, so the conversation never has to leave it.',
    target: 'Every phone user a scam can reach — starting with the elderly, who are targeted most and recover least — and the banks and fintechs that carry the loss.',
    image: '/img/cyber.jpg',
    products: [
      { name: 'Goldentime', note: 'On-device defence during the call, and the recovery sequence after the transfer.', href: '/goldentime' },
    ],
  },
  {
    id: 'health', fig: '04', kicker: 'Health & Bio', stage: 'Shipping · Research',
    title: 'Catch the error before the claim is denied.',
    mission: 'Two efforts. The first reads the documents healthcare runs on before a human has to, catching the errors that get a claim denied at submission rather than months later. The second is early-stage research toward giving a voice back to people who have lost the ability to speak, through a silent-speech neural interface.',
    target: 'U.S. healthcare providers and the billing companies that serve them; and, in research, people living with speech loss.',
    image: '/img/health.jpg',
  },
  {
    id: 'research', fig: '05', kicker: 'AI Research & Safety', stage: 'Research',
    title: 'Where capability and calibration diverge.',
    mission: 'Research into a counter-intuitive failure of large models: a system can grow more capable at a task while growing worse at knowing when it is wrong. The work is to measure that gap rigorously, and to harden models against the structured perturbations that exploit it.',
    target: 'The AI-safety and model-evaluation field, and anyone deploying models where a confident wrong answer is dangerous.',
    image: '/img/research.jpg',
  },
]

export const company = {
  kicker: 'The company',
  title: 'Five domains. One standard of proof.',
  body: [
    'Arbiter builds decision, safety, and infrastructure for regulated and high-stakes domains: places where being wrong is expensive and someone is required to be right.',
    'Every product is held to the same standard. It has to work under scrutiny, hold up when the record is examined years later, and state plainly what it can and cannot prove.',
    'The company was registered in 2026, after the work was already underway. Each product was researched, engineered, and tested as working software before there was an entity to hold it. Nothing here began as a business plan waiting for a build.',
    'The unifying idea is the same in every domain. Take an ambiguous input, apply the rules, make the call, and keep proof a third party can check.',
  ],
}

export const founder = {
  kicker: 'Leadership',
  name: 'Dayeon Kang',
  lines: [
    'I’m the founder of Arbiter, a developer, quantitative researcher, and civic-technology builder. I lead design, engineering, and delivery across all five domains, from the cold-chain hardware thesis to the cryptographic trust rails to the AI-safety research.',
    'My method is the same everywhere: find a place where a high-stakes decision is made badly or slowly, build the system that makes it well, and keep proof it was right.',
  ],
  contact: 'dayeon603@gmail.com',
}

/** Build a proper mailto with a subject so "Contact"/"Get in touch" open a ready-to-send email. */
export const contactHref = (subject = 'Arbiter — Inquiry') =>
  `mailto:${founder.contact}?subject=${encodeURIComponent(subject)}`

/**
 * Legal / entity facts, kept in one place so the policy pages stay accurate.
 * Only verified facts live here. Fields the operator must confirm before any
 * commercial launch are marked TODO and rendered as a visible placeholder.
 */
export const legal = {
  // Arbiter is the registered ROK business entity itself. The entity was
  // renamed to 아비터 (Arbiter) from its original registration as 카라반
  // (Caravan); the registration number did not change. Caravan is now a
  // product name, not the operating entity, so 'entity' and
  // 'registeredEntity' are the same name.
  entity: 'Arbiter',
  registeredEntity: 'Arbiter',
  businessNameKo: '아비터',
  businessNameEn: 'Arbiter',
  operator: 'Dayeon Kang',
  representativeKo: '강다연',
  contact: founder.contact,
  jurisdiction: 'Republic of Korea',
  registrationNumber: '414-01-72904',
  // 사업장 소재지 (business address on the 사업자등록증). Shown in the footer
  // business-information block, as is conventional for a Korean business site.
  registeredAddress: '경기도 용인시 처인구 삼가로58번길 17-12, 사무실동 1층 (삼가동)',
  showAddress: true,
  openedDate: '2026-06-25',
  effectiveDate: 'July 24, 2026',
  host: 'Cloudflare, Inc.',
}

export const caravan = {
  eyebrow: 'A product of Arbiter · Finance',
  name: 'Caravan',
  tagline: 'A neutral trust and compliance rail for cross-border trade.',
  lead: 'Caravan is the independent layer that sits above the marketplaces, brokers, and platforms where cross-border trade actually happens. It takes a proposed trade decision — a shipment, a counterparty, a compliance call — and turns it into a signed, tamper-evident record that anyone in the deal can verify for themselves. The point is neutrality: the same check, applied the same way, owned by no one with a stake in how it comes out. A buyer, a seller, a bank, and a regulator can all look at the same record and agree on what happened, without having to trust each other or the platform underneath them.',
  problem: {
    label: 'The problem',
    body: 'Cross-border trade runs on platforms that profit from the very decisions they record, and the proof of what was decided lives wherever it is most convenient for them. There is no neutral, durable account of who decided what, on whose authority, and whether the record was quietly changed afterward. So when a shipment is disputed, a counterparty is questioned, or a regulator asks for the trail months later, the evidence is either held by an interested party, scattered across systems that do not agree, or simply gone. Every participant ends up rebuilding trust from scratch on every deal — slow, expensive, and impossible to audit. Caravan exists to make that record exist once, neutrally, and hold for everyone.',
  },
  how: {
    label: 'How it works',
    points: [
      { h: 'Signed decisions', p: 'Every decision Caravan records is cryptographically signed, so its origin and the authority behind it can be checked by anyone in the deal. Verification needs no trust in Arbiter and no access to a private system — the signature stands on its own, even years later.' },
      { h: 'A record that cannot be quietly changed', p: 'Decisions are written to an append-only, tamper-evident history where each entry is bound to the ones before it. Any later edit, deletion, or reordering is detectable, and the entire trail can be re-checked offline by a counterparty or an examiner without asking Caravan to vouch for it.' },
      { h: 'A human stays in the loop', p: 'Nothing executes on a machine’s say-so alone. A person reviews and approves each high-stakes decision before it takes effect, and that approval is itself signed and recorded — so the trail shows not just what was decided, but who stood behind it and when.' },
    ],
  },
  twoSided: {
    label: 'Two-sided by design',
    body: 'Caravan is referenced by the importer or broker on one side and the customs authority on the other. Any feature only one side of the transaction can see is a step away from the rail position. Both parties must be able to verify the same record independently, without asking Caravan to vouch for it.',
  },
  pricing: {
    label: 'How it is priced',
    body: 'Caravan is priced as a ladder rather than a seat. The entry rung is a flat fee per certified decision: an unproven, independent rail is not handed basis points on a counterparty’s flow on day one, so the flat fee buys the right to become load-bearing in that process. Once the record is load-bearing, pricing converts to basis points on the attested flow itself. The rung after that is a data network, where the corpus of signed decisions prices something no single counterparty could price alone. Arbiter does not sell seats at any rung: the engine is deterministic and near zero marginal cost per attestation, and seat pricing would discard that advantage.',
  },
  northStar: {
    label: 'The aim',
    body: 'The company’s aim is stated plainly: the neutral, cryptographically-attested decision rail for regulated money-movement and risk-transfer, metering basis points on every bind, payment, and credit decision that must be proven rather than trusted. Caravan is one rail toward that aim, built for cross-border trade.',
  },
  status: {
    label: 'Status',
    body: 'Caravan runs today as working, tested software, not a slide or a concept. It is solo-built and pre-commercial: no customers, revenue, or funding are claimed anywhere. This page describes what Caravan does and why it matters, deliberately at a high level — the internal mechanics, models, and the specific trade lanes it targets are kept off the public page while the product is still being hardened.',
  },
  links: {
    app: 'https://caravan-app.dayeon603.workers.dev',
    demo: 'https://caravan-demo-d8d.pages.dev',
  },
}

export const tollgate = {
  eyebrow: 'A product of Arbiter · Finance',
  name: 'Tollgate',
  tagline: 'Sanctions screening decisions an examiner can replay offline.',
  lead: 'Tollgate is the evidence layer for sanctions and AML screening at stablecoin issuers and virtual-asset service providers. It runs read-only alongside the screening system a firm already uses, and turns each screening decision into a signed, tamper-evident receipt pinned to the sanctions list exactly as it stood at that moment. Months later, an examiner can take that receipt and re-derive the same verdict on their own machine, offline, without calling back to Arbiter and without taking any vendor’s word for it. The scope today is the exact-match path; fuzzy-match reproducibility is out of scope and is labelled as such everywhere the product is described.',
  problem: {
    label: 'The problem',
    body: 'A new class of regulated entity is entering bank-secrecy supervision for the first time, and it is inheriting an evidentiary standard it cannot yet meet. When an examiner asks a firm to show why a particular counterparty was blocked six months ago, the honest answer is usually that the sanctions list has changed since, the screening vendor’s system has been updated since, and the decision can no longer be reproduced. An audit export records what a system said it did. It does not let anyone independently re-derive that decision from the inputs that produced it. So a firm’s evidence is only ever as strong as its vendor’s word, held in the vendor’s format, checkable only by asking the vendor. Tollgate exists so that the record stands on its own.',
  },
  how: {
    label: 'How it works',
    points: [
      { h: 'The list is pinned to the decision', p: 'Every screening decision is recorded against a specific, hash-identified snapshot of the sanctions list rather than against whatever the list happens to say today. The exact state of the world at decision time becomes part of the evidence, so a later re-check compares like with like instead of quietly drifting.' },
      { h: 'A receipt that verifies itself', p: 'Each decision is emitted as a signed, hash-chained receipt. Anyone holding it can re-derive the canonical bytes, check the signature, and re-walk the chain in a plain browser with no network calls and no account. Change a single byte anywhere in the record and verification fails visibly.' },
      { h: 'Read-only, next to what you already run', p: 'Tollgate observes rather than intervenes. It sits alongside the incumbent screener in shadow mode, never becoming the block-of-record, so adopting it requires no rip-and-replace and does not pull Tollgate into the firm’s own compliance program.' },
    ],
  },
  twoSided: {
    label: 'Two-sided by design',
    body: 'Tollgate is referenced by the PPSI or VASP compliance team on one side and the examiner or regulator on the other. Any feature only one side of the transaction can see is a step away from the rail position. Both parties must be able to verify the same record independently, without asking Tollgate to vouch for it.',
  },
  pricing: {
    label: 'How it is priced',
    body: 'Tollgate is priced as a ladder rather than a seat. The entry rung is a flat fee per certified decision: an unproven, independent rail is not handed basis points on a firm’s flow on day one, so the flat fee buys the right to become load-bearing in the firm’s own compliance program. Once the record is load-bearing, pricing converts to basis points on the attested flow itself. The rung after that is a data network, where the corpus of signed decisions prices something no single firm could price alone. Arbiter does not sell seats at any rung: the engine is deterministic and near zero marginal cost per attestation, and seat pricing would discard that advantage.',
  },
  northStar: {
    label: 'The aim',
    body: 'The company’s aim is stated plainly: the neutral, cryptographically-attested decision rail for regulated money-movement and risk-transfer, metering basis points on every bind, payment, and credit decision that must be proven rather than trusted. Tollgate is one rail toward that aim, built for sanctions and AML evidence.',
  },
  status: {
    label: 'Status',
    body: 'Tollgate is early and deliberately narrow. The offline verifier is live and can be exercised right now, including its tamper toggle, which is the whole claim demonstrated rather than asserted. The engine underneath is working, tested software, and the product is pre-commercial: no customers, revenue, or funding are claimed anywhere. Reproducibility is offered only on the exact-match path, and that limit is stated on the verifier itself rather than buried, because a confident green check over a match the system cannot actually reproduce would defeat the point of the product.',
  },
  links: {
    verifier: '/verify.html',
  },
}

export const harvestguard = {
  eyebrow: 'A product of Arbiter · Agriculture & Food Security',
  name: 'HarvestGuard',
  tagline: 'A solar-powered cold chain for the last village the grid never reached.',
  lead: 'Up to a third of what a smallholder farmer grows can spoil before it is sold — for want of refrigeration the electrical grid never delivered. HarvestGuard is a solar-powered cold-storage pod built for the village rather than the grid: one small pod serves many farmers, who pay only for the days they use it, with no upfront cost and no wiring. It keeps a harvest edible for weeks instead of days — and every use quietly builds a verified record of a farmer’s yield and payments, the first credential a bank has ever had for someone it otherwise cannot see.',
  problem: {
    label: 'The problem',
    body: 'The technology to stop a harvest from rotting is a century old, and it still has not reached the smallholder farmer. Only a small fraction of fresh produce in sub-Saharan Africa ever touches cold storage, and up to half of a farmer’s crop can spoil before it can be sold. Without a way to hold produce, families are forced into distress sales the day they harvest, taking whatever price the market gives — and the food that rots releases methane on the way. The same farmers are invisible to the banking system, because nothing has ever recorded what they grow or that they pay. Hunger, poverty, and emissions all trace back to one missing cold chain.',
  },
  how: {
    label: 'How it works',
    points: [
      { h: 'Built for the village, not the grid', p: 'A solar-powered pod runs where the electrical grid does not, and is billed pay-as-you-go through mobile money — no upfront cost, no wiring, no standing subscription. It is sized for the shared, sub-village scale that large cold hubs skip, so it reaches the farmers infrastructure has always passed over.' },
      { h: 'Storage is the wedge; trust is the product', p: 'Every use records a verified history of what a farmer stored, sold, and paid — a ground-truth credential for people the formal banking system has never been able to see. That record is what turns an off-grid box into a first door to credit and crop insurance, on terms a lender can actually check.' },
      { h: 'Built with the community, not for it', p: 'The work is designed to be co-deployed with the partners and local operators already trusted on the ground, not parachuted in from outside. Reach, service, and trust come from the community running it — the pod is the infrastructure, the people are the network.' },
    ],
  },
  status: {
    label: 'Status',
    body: 'HarvestGuard is in development and pre-pilot. The hardware is designed and independently engineer-reviewed, the off-grid power system and the pay-as-you-go data layer are specified, and partnership outreach for a first field pilot is underway. No pods are deployed yet, and no customers, revenue, or funding are claimed anywhere. This page and the overview describe the work at a high level while the first pilot is still ahead.',
  },
}



export const goldentime = {
  eyebrow: 'A product of Arbiter · Cybersecurity & Fraud',
  name: 'Goldentime',
  tagline: 'One product for the whole scam window \u2014 during the call, and after the transfer.',
  lead: 'Goldentime runs on the phone and covers both halves of a voice-phishing scam. While the call is live it reads the surfaces the platforms structurally cannot see \u2014 the messenger conversation and the bank transfer screen \u2014 and routes a warning to a trusted family member before the money moves. If a transfer goes through anyway, the same app becomes the recovery copilot for the hour that decides whether it can be clawed back. Everything is analysed on the device, so no audio and no conversation leaves the phone.',
  problem: {
    label: 'The problem',
    body: 'The fastest-growing fraud of the decade is a phone call, and the people targeted most are elderly. The defences that exist watch the call and the text, but the scam is completed somewhere they cannot look: inside the messenger thread and on the banking app\u2019s transfer screen. And when it succeeds, the difference between recovering the money and losing it is measured in minutes \u2014 while the victim is panicked, and the family scrambling to help knows even less. Detection without recovery leaves the victim alone at the worst moment. Recovery without detection arrives after the loss. It is one window, and it was being covered by two half-products.',
  },
  how: {
    label: 'How it works',
    points: [
      { h: 'It reads the channels nobody else can', p: 'An on-device language model reads the messenger conversation and the pre-transfer bank screen \u2014 the two surfaces platforms structurally cannot access \u2014 so it can flag a scam at the exact point of loss rather than from a blocklist that is always a step behind.' },
      { h: 'On-device, so nothing leaves the phone', p: 'The call and the chat are analysed locally. No audio and no conversation is sent to a server, which solves privacy and latency at once and lets the defence work even where a network does not. When risk is detected it alerts a trusted family member while the call is still happening.' },
      { h: 'The right steps, in the right order, now', p: 'If a transfer completes, Goldentime gives the victim and the family the time-critical sequence \u2014 freeze the receiving account, report to the authorities, preserve the evidence \u2014 in the order that recovers money, written for someone in shock rather than someone reading a manual.' },
    ],
  },
  status: {
    label: 'Status',
    body: 'Goldentime is in active development and pre-commercial. It merges two efforts that were previously described separately: the on-device detection work and the recovery copilot. A working prototype and a measured scam-classifier exist; on-device performance, the institutional integrations behind the recovery steps, and field pilots are the current work. No customers, revenue, or funding are claimed anywhere. It detects and it guides \u2014 it never silently blocks a call or moves money on its own.',
  },
}

export const navLinks = sectors.map((s) => ({ id: s.id, label: s.kicker.split(' ')[0] }))
