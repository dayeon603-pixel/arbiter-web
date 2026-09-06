import type { Metadata } from 'next'
import BusinessCard from '@/components/BusinessCard'

export const metadata: Metadata = {
  title: "Dayeon Kang — Arbiter",
  description: 'Founder & CEO of Arbiter. Tap the card to flip.',
}

export default function CardPage() {
  return <BusinessCard />
}
