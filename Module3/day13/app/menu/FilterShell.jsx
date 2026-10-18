'use client'

import { CategoryBar } from './CategoryBar.jsx'

export function FilterShell({ categories, activeCategory, children }) {
  return (
    <>
      <CategoryBar categories={categories} activeCategory={activeCategory} />
      {children}
    </>
  )
}
