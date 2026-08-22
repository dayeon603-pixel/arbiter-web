import type { Metadata, Viewport } from 'next'
import { Instrument_Sans, JetBrains_Mono } from 'next/font/google'
import './tokens.css'
import './base.css'
import './globals.css'

/**
 * Both faces are SIL OFL 1.1 and cost nothing. `next/font/google` downloads
 * the woff2 at build time and serves it from our own origin — there is no
 * runtime request to fonts.gstatic.com, so this satisfies the self-hosting
 * requirement without a foundry licence.
 *
 * Instrument Sans is loaded as a variable font (no `weight` key) so the whole
 * 400–600 range ships in one file. JetBrains Mono is pinned to the two weights
 * the mono roles actually use — eyebrow labels and machine output.
 */
const instrument = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Arbiter — Verifiable decision infrastructure',
  description:
    'Arbiter builds decision infrastructure for regulated domains. Every decision produces a signed, hash-chained receipt a third party can verify independently.',
}

export const viewport: Viewport = {
  themeColor: '#FAF9F6',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrument.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  )
}
