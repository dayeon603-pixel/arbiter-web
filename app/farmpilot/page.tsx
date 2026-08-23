import type { Metadata } from 'next'
import ProductPage from '@/components/site/ProductPage'
import { farmpilot } from '@/lib/data'
import { divisions } from '@/lib/divisions'

export const metadata: Metadata = {
  title: 'FarmPilot — Arbiter',
  description: farmpilot.tagline,
}

const division = divisions.find((d) => d.id === 'agriculture')!

export default function FarmPilotPage() {
  return <ProductPage product={farmpilot} division={division} />
}
