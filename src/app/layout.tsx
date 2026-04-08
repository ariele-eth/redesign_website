import type { Metadata } from 'next'
import { Geist_Mono, Syne, DM_Sans } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

const fontHead = Syne({
  variable: '--font-head',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

const fontBody = DM_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'ETH Blockchain Club',
    template: '%s | ETH Blockchain Club',
  },
  description: 'ETH Blockchain Club — events, members and collaboration',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontHead.variable} ${fontBody.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {/* Global toaster for notifications (e.g. application submitted) */}
        <Toaster />
      </body>
    </html>
  )
}
