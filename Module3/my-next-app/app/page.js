import { HomeContent } from './HomeContent.jsx'

export const metadata = {
  title: 'Restaurants',
  description: 'Discover Ethiopian restaurants and neighborhood kitchens in Addis Ababa. Browse menus and find your next favorite meal.',
  openGraph: {
    title: 'Discover Ethiopian restaurants',
    description: 'Explore neighborhood kitchens and Ethiopian food in Addis Ababa.',
  },
}

export default function HomePage() {
  return <HomeContent />
}
