import './globals.css'
import Link from 'next/link'
import { Providers } from './providers.jsx'
import { SiteHeader } from './components/SiteHeader.jsx'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Addis Eats',
    template: '%s | Addis Eats',
  },
  description: 'Discover Ethiopian home-kitchen food and neighborhood restaurants with Addis Eats.',
  openGraph: {
    type: 'website',
    siteName: 'Addis Eats',
    title: { default: 'Addis Eats', template: '%s | Addis Eats' },
    description: 'Discover Ethiopian home-kitchen food and neighborhood restaurants.',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/opengraph-image'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <SiteHeader />
          {children}
          <footer className="site-footer">
            <span>Made with care in Addis Ababa</span>
            <Link href="/about">About Addis Eats</Link>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
