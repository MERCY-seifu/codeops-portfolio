import { NextResponse } from 'next/server'
import { getDishes } from '../../../lib/menu.js'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const query = new URL(request.url).searchParams.get('q')?.trim().toLowerCase() || ''
  const category = new URL(request.url).searchParams.get('category') || 'All'
  if (query.length > 80) {
    return NextResponse.json({ error: 'Search must be 80 characters or fewer.' }, { status: 400 })
  }

  const dishes = await getDishes()
  const results = dishes
    .filter((dish) => category === 'All' || dish.category === category)
    .filter((dish) => !query || `${dish.name} ${dish.description} ${dish.category}`.toLowerCase().includes(query))
    .sort((left, right) => left.name.localeCompare(right.name))
  return NextResponse.json({ dishes: results })
}
