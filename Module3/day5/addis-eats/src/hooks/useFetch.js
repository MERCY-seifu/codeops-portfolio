import { useEffect, useState } from 'react'

/**
 * useFetch — small JSON-fetching hook.
 *
 * Re-fetches whenever `url` changes, tracks loading/error state, and
 * aborts the in-flight request on cleanup so a slow response can never
 * land after the component (or the url) has moved on.
 */
export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return

    const controller = new AbortController()

    setLoading(true)
    setError(null)

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`)
        }
        return res.json()
      })
      .then((json) => {
        setData(json)
        setLoading(false)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err.message || 'Something went wrong')
        setLoading(false)
      })

    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}
