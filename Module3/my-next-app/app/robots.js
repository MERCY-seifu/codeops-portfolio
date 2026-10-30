const siteUrl = process.env.SITE_URL || 'http://localhost:3000'

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/cart', '/checkout', '/confirmation', '/profile', '/signin', '/tracking'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
