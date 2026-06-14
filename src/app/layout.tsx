import type { Metadata } from 'next'
import { Geist_Mono, Montserrat, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

const fontHead = Montserrat({
  variable: '--font-head',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

const fontBody = IBM_Plex_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
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
  description: 'ETH Blockchain Club - events, members and collaboration',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: [{ url: '/favicon-32x32.png', type: 'image/png' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
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
