import './globals.css'
import Link from 'next/link'
import { Providers } from './providers.jsx'
import { SiteHeader } from './components/SiteHeader.jsx'

export const metadata = {
  title: {
    default: 'Addis Eats',
    template: '%s | Addis Eats',
  },
  description: 'Discover Ethiopian home-kitchen food made in Addis Ababa.',
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
