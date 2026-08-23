import type { Metadata } from 'next'
import ProductPage from '@/components/site/ProductPage'
import { caravan } from '@/lib/data'
import { divisions } from '@/lib/divisions'

export const metadata: Metadata = {
  title: 'Caravan — Arbiter',
  description: caravan.tagline,
}

const division = divisions.find((d) => d.id === 'finance')!

const deck = {
  src: '/decks/caravan-deck',
  label: 'Caravan · Overview',
  slides: 4,
  caption: 'High-level overview',
}

export default function CaravanPage() {
  return <ProductPage product={caravan} division={division} deck={deck} />
}
