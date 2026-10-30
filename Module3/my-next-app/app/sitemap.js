import { getDishes } from '../lib/menu.js'
import { restaurants } from '../lib/restaurants.js'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default async function sitemap() {
  const dishes = await getDishes()
  const routes = [
    '',
    '/restaurants',
    '/menu',
    '/about',
    ...restaurants.map(({ slug }) => `/restaurants/${slug}`),
    ...dishes.map(({ id }) => `/dish/${id}`),
  ]

  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: route === '/menu' ? 'daily' : 'weekly',
  }))
}
