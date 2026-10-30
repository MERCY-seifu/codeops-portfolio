import { getDishes } from '../../lib/menu.js'
import { MenuContent } from './MenuContent.jsx'

export const metadata = {
  title: 'Menu',
  description: 'Browse Ethiopian favorites, explore dishes, and search the Addis Eats menu.',
  openGraph: {
    title: 'Ethiopian food menu',
    description: 'Browse Ethiopian favorites from Addis Eats neighborhood kitchens.',
  },
}

export default async function MenuPage({ searchParams }) {
  const [dishes, params] = await Promise.all([getDishes(), searchParams])
  return <MenuContent dishes={dishes} requestedCategory={params?.category} searchQuery={params?.q} />
}
