'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { DishList } from './DishList.jsx'
import { jsonFetcher } from '../../lib/json-fetcher.js'

export function LiveMenuSearch({ initialQuery, initialDishes, category }) {
  const [query, setQuery] = useState(initialQuery)
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery)

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query.trim()), 300)
    return () => clearTimeout(timeout)
  }, [query, category])

  const params = new URLSearchParams({ q: debouncedQuery, category })
  const { data, error } = useSWR(
    `/api/menu-search?${params}`,
    jsonFetcher,
    {
      fallbackData: debouncedQuery === initialQuery ? { dishes: initialDishes } : undefined,
      keepPreviousData: true,
      revalidateOnFocus: false,
    },
  )
  const dishes = data?.dishes || initialDishes

  return (
    <>
      <div className="menu-search">
        <label className="sr-only" htmlFor="menu-search">Search dishes</label>
        <input id="menu-search" type="search" value={query} maxLength={80} onChange={(event) => setQuery(event.target.value)} placeholder="Search dishes or cuisine" />
        <span aria-live="polite">{dishes.length} dishes</span>
      </div>
      {error && <p className="error" role="alert">Search is temporarily unavailable: {error.message}</p>}
      <DishList dishes={dishes} />
    </>
  )
}
