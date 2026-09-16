import type { Metadata } from 'next'
import { Archivo, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const archivo = Archivo({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-archivo', display: 'swap' })
const jb = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-mono-jb', display: 'swap' })

export const metadata: Metadata = {
  title: 'Arbiter',
  description: 'Decision, safety, and infrastructure for the work that has to be right.',
  themeColor: '#ffffff',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${jb.variable}`}>
      <body>{children}</body>
    </html>
  )
}
