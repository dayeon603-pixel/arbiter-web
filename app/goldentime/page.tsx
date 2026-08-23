import type { Metadata } from 'next'
import ProductPage from '@/components/site/ProductPage'
import { goldentime } from '@/lib/data'
import { divisions } from '@/lib/divisions'

export const metadata: Metadata = {
  title: 'Goldentime — Arbiter',
  description: goldentime.tagline,
}

const division = divisions.find((d) => d.id === 'cybersecurity')!

export default function GoldentimePage() {
  return <ProductPage product={goldentime} division={division} />
}
