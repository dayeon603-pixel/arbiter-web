import type { Metadata } from 'next'
import ProductPage from '@/components/site/ProductPage'
import { harvestguard } from '@/lib/data'
import { divisions } from '@/lib/divisions'

export const metadata: Metadata = {
  title: 'HarvestGuard — Arbiter',
  description: harvestguard.tagline,
}

const division = divisions.find((d) => d.id === 'agriculture')!

const deck = {
  src: '/decks/harvestguard-deck',
  label: 'HarvestGuard · Research & Pilot Proposal',
  slides: 12,
  caption: 'Technical proposal',
}

export default function HarvestGuardPage() {
  return <ProductPage product={harvestguard} division={division} deck={deck} />
}
