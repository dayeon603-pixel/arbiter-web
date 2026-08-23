import type { Metadata } from 'next'
import ProductPage from '@/components/site/ProductPage'
import { tollgate } from '@/lib/data'
import { divisions } from '@/lib/divisions'

export const metadata: Metadata = {
  title: 'Tollgate — Arbiter',
  description: tollgate.tagline,
}

const division = divisions.find((d) => d.id === 'finance')!

export default function TollgatePage() {
  return <ProductPage product={tollgate} division={division} />
}
