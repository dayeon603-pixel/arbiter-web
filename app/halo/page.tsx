import type { Metadata } from 'next'
import ProductPage from '@/components/site/ProductPage'
import { halo } from '@/lib/data'
import { divisions } from '@/lib/divisions'

export const metadata: Metadata = {
  title: 'HALO — Arbiter',
  description: halo.tagline,
}

const division = divisions.find((d) => d.id === 'cybersecurity')!

export default function HaloPage() {
  return <ProductPage product={halo} division={division} />
}
