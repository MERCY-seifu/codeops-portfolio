import { useEffect, useState } from 'react'

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        return response.json()
      })
      .then((result) => {
        setData(result)
        setLoading(false)
      })
      .catch((cause) => {
        if (cause.name === 'AbortError') return
        setError(cause.message || 'Unable to load the menu.')
        setLoading(false)
      })

    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}
