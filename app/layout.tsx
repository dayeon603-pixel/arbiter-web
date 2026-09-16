import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-inter', display: 'swap' })
const jb = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-mono-jb', display: 'swap' })

export const metadata: Metadata = {
  title: 'Arbiter',
  description: 'Decision, safety, and infrastructure for the work that has to be right.',
  themeColor: '#ffffff',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jb.variable}`}>
      <body>{children}</body>
    </html>
  )
}
