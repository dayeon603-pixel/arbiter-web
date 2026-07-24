export type Sector = {
  id: string; fig: string; kicker: string; stage: string
  title: string; mission: string; target: string; image: string
  product?: { name: string; note: string; href: string }
  products?: { name: string; note: string; href: string }[]
}

export const hero = {
  eyebrow: 'Arbiter, Inc.',
  title: 'Decision, safety, and infrastructure for the work that has to be right.',
  sub: 'A multi-industry company building across five regulated and high-stakes domains. One operator, building in the open.',
}

export const sectors: Sector[] = [
  {
    id: 'finance', fig: '01', kicker: 'Finance', stage: 'Shipping',
    title: 'A decision a regulator can replay.',
    mission: 'Building neutral trust and compliance infrastructure for money, autonomous agents, and cross-border trade — wherever a high-stakes call must be made and later proven. Each decision produces a signed, tamper-evident record an examiner can verify independently: who decided what, on whose authority, and that the record has not changed since.',
    target: 'Stablecoin issuers, banks, operators of autonomous AI agents, cross-border traders, and the regulators who audit them.',
    image: '/img/finance.jpg',
    product: { name: 'Caravan', note: 'A neutral trust rail for cross-border trade.', href: '/caravan' },
  },
  {
    id: 'agriculture', fig: '02', kicker: 'Agriculture & Food Security', stage: 'In development',
    title: 'Cold storage that reaches the last village.',
    mission: 'Developing solar-powered cold-storage infrastructure for the places the electrical grid does not reach. Up to a third of a smallholder harvest spoils before it can be sold, for want of refrigeration. The work is a pay-as-you-go cold chain at village scale, so a farmer’s crop becomes income instead of waste.',
    target: 'Smallholder farmers in sub-Saharan Africa, and the food-security programs that serve them.',
    image: '/img/agriculture.jpg',
    product: { name: 'HarvestGuard', note: 'A solar-powered, pay-as-you-go cold chain for smallholder farmers.', href: '/harvestguard' },
  },
  {
    id: 'cyber', fig: '03', kicker: 'Cybersecurity & Fraud', stage: 'In development',
    title: 'Tell a real voice from a synthetic one.',
    mission: 'Developing systems that detect cloned and synthetic voices in real time, to stop the fastest-growing fraud of the decade: the scam phone call. The work spans the whole kill-chain — verify the voice is human, defend the call while it is happening, and help victims recover afterward — and runs on the device, so the audio never has to leave it.',
    target: 'Every phone user a scam can reach — starting with the elderly, who are targeted most and recover least — and the banks and fintechs that carry the loss.',
    image: '/img/cyber.jpg',
    products: [
      { name: 'HALO', note: 'On-device defense that shields elders from voice-phishing, in real time.', href: '/halo' },
      { name: 'Goldentime', note: 'A recovery copilot for the first hour after a voice-phishing transfer.', href: '/goldentime' },
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
  title: 'One operator. Five domains. Built in the open.',
  body: [
    'Arbiter builds decision, safety, and infrastructure for regulated and high-stakes domains: places where being wrong is expensive and someone is required to be right.',
    'It is solo-operated. No revenue, funding, or customers are claimed anywhere. Each domain is described by what it does, plainly and without overclaiming.',
    'The unifying idea is the same in every domain. Take an ambiguous input, apply the rules, make the call, and keep proof a third party can check.',
  ],
}

export const founder = {
  kicker: 'The operator',
  name: 'Dayeon Kang',
  lines: [
    'I’m the founder and sole operator of Arbiter — a developer, quantitative researcher, and civic-technology builder. I design, build, and ship across all five domains myself, from the cold-chain hardware thesis to the cryptographic trust rails to the AI-safety research.',
    'My method is the same everywhere: I find a place where a high-stakes decision is made badly or slowly, build the system that makes it well, and keep proof it was right. I work in the open and ship one venture at a time, honest about what is real and what is still being built.',
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
  entity: 'Arbiter',
  // The legally registered business behind the Arbiter brand.
  registeredEntity: '카라반 (Caravan)',
  operator: 'Dayeon Kang',
  contact: founder.contact,
  jurisdiction: 'Republic of Korea',
  registrationNumber: '414-01-72904',
  // Registered business address. Held back from the public page for now: the
  // site collects no personal data, so Korean PIPA does not yet require it to be
  // displayed, and it is a personal address. Set showAddress to true to publish.
  registeredAddress: '경기도 용인시 처인구 삼가로58번길 17-12, 사무실동 1층',
  showAddress: false,
  effectiveDate: 'July 23, 2026',
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
  status: {
    label: 'Status',
    body: 'Caravan runs today as working, tested software, not a slide or a concept. It is solo-built and pre-commercial: no customers, revenue, or funding are claimed anywhere. This page describes what Caravan does and why it matters, deliberately at a high level — the internal mechanics, models, and the specific trade lanes it targets are kept off the public page while the product is still being hardened.',
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

export const halo = {
  eyebrow: 'A product of Arbiter · Cybersecurity & Fraud',
  name: 'HALO',
  tagline: 'On-device defense that shields elders from voice-phishing, in real time.',
  lead: 'HALO runs on the phone itself and watches the channels a scam actually travels through — the call, the message, the chat, and the banking screen at the moment of transfer — to catch a scam while it is happening, not after the money is gone. It works entirely on the device, so the conversation never leaves the phone, and it routes a warning to the family the instant something looks wrong. The hard part is not the call or the text, which the platforms already cover; it is the two channels no platform can see — the messenger conversation and the bank screen one tap before a transfer — and that is exactly where HALO lives.',
  problem: {
    label: 'The problem',
    body: 'The fastest-growing fraud of the decade is a phone call, and the people targeted most are elderly. They are convinced they are not being deceived right up to the moment they send the money, and the family only finds out afterward. The defenses that exist watch the call and the text — but the scam is completed somewhere they cannot look: inside the messenger thread and on the banking app’s transfer screen. By the time a blocklist catches a new script, the loss has already spread. Nobody is defending the two surfaces where the money actually leaves.',
  },
  how: {
    label: 'How it works',
    points: [
      { h: 'It reads the channels nobody else can', p: 'An on-device language model reads the two surfaces platforms structurally cannot access — the messenger conversation and the pre-transfer bank screen — so it can flag a scam at the exact point of loss, not from a blocklist that is always a step behind.' },
      { h: 'On-device, so nothing leaves the phone', p: 'The call and the chat are analyzed locally on the device. No audio and no conversation is sent to a server, which solves privacy and latency at the same time and lets the defense work even where a network does not.' },
      { h: 'A warning that reaches the family in time', p: 'When risk is detected, HALO routes an alert to a trusted family member while the call is still happening — not a report after it. It detects and warns; it never silently blocks or moves money on its own.' },
    ],
  },
  status: {
    label: 'Status',
    body: 'HALO is in active development — pre-alpha and pre-commercial. A working prototype and a measured scam-classifier already exist; on-device performance and field pilots are the current work. No customers, revenue, or funding are claimed anywhere. The internal models, datasets, and the specific channels are kept off this public page while the product is still being hardened.',
  },
}

export const goldentime = {
  eyebrow: 'A product of Arbiter · Cybersecurity & Fraud',
  name: 'Goldentime',
  tagline: 'A recovery copilot for the first hour after a voice-phishing transfer.',
  lead: 'The hour after money is sent decides whether it can be recovered. Goldentime is the copilot a victim and their family open at that moment — it walks them through the exact, time-critical steps in the right order, so the small window to claw the money back is not lost to panic or confusion. It turns a chaotic, high-stakes situation into a guided sequence, so the people least prepared for it can act like the people who handle it every day.',
  problem: {
    label: 'The problem',
    body: 'When a scam succeeds, the difference between recovering the money and losing it is measured in minutes. But the victim is panicked, often elderly, and does not know that the bank can freeze the receiving account, which agency to call first, or what to preserve as evidence — and the family scrambling to help knows even less. The official steps exist, but they are scattered, slow to find, and written for no one in the moment of crisis. The recoverable window closes while everyone is still figuring out what to do.',
  },
  how: {
    label: 'How it works',
    points: [
      { h: 'The right steps, in the right order, now', p: 'Goldentime gives the victim and family the exact time-critical sequence — freeze the receiving account, report to the authorities, preserve the evidence — instead of a list to decipher under pressure. The order is the product: the actions that recover money come first.' },
      { h: 'Built for the panicked, not the expert', p: 'The guidance is written for someone in shock: plain, sequenced, and acting in minutes. The people least prepared for this are the ones it is designed for, so they move with the speed the situation demands.' },
      { h: 'A record that helps the case', p: 'The actions and evidence are captured as a clean, ordered record that supports the bank’s freeze request and the police report — so the recovery effort is not rebuilt from memory after the fact.' },
    ],
  },
  status: {
    label: 'Status',
    body: 'Goldentime is in active development and pre-commercial. It builds on the same fraud understanding as HALO, applied to the real, time-critical recovery process. No customers, revenue, or funding are claimed anywhere. The specific institutional integrations are kept off this public page while the product is still being built.',
  },
}

export const navLinks = sectors.map((s) => ({ id: s.id, label: s.kicker.split(' ')[0] }))
