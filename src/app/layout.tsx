import type { Metadata } from 'next'
import { Noto_Sans, Sora } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeProvider'

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
  display: 'swap',
})

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'EnamelX',
  description: 'AI-Powered Dental Assistant',
  metadataBase: new URL('https://enamelx.vercel.app'),
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
 
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'EnamelX',
    startupImage: '/images/logo.png',
  },
  openGraph: {
    images: '/images/logo.png',
  },
  manifest: 'https://enamelx.vercel.app/manifest.json',
   robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable} ${notoSans.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
