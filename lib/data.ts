export type Sector = {
  id: string; fig: string; kicker: string; stage: string
  title: string; mission: string; target: string; image: string
  product?: { name: string; note: string; href: string }
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
  },
  {
    id: 'cyber', fig: '03', kicker: 'Cybersecurity & Fraud', stage: 'In development',
    title: 'Tell a real voice from a synthetic one.',
    mission: 'Developing systems that detect cloned and synthetic voices in real time, to stop the fastest-growing fraud of the decade: the scam phone call. The work spans the whole kill-chain — verify the voice is human, defend the call while it is happening, and help victims recover afterward — and runs on the device, so the audio never has to leave it.',
    target: 'The elderly phone users who are targeted most, and the banks and fintechs that carry the loss.',
    image: '/img/cyber.jpg',
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
    'It is solo-operated. No revenue, funding, or customers are claimed anywhere. Each domain is at an honest stage, stated plainly: shipping, in development, or research.',
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

export const navLinks = sectors.map((s) => ({ id: s.id, label: s.kicker.split(' ')[0] }))
