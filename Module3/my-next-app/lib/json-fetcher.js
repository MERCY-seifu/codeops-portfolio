export async function jsonFetcher(url) {
  const response = await fetch(url, { cache: 'no-store' })
  if (!response.ok) throw new Error(`Request failed (${response.status}).`)
  return response.json()
}
