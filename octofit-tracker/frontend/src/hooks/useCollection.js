import { useCallback, useEffect, useState } from 'react'

export function useCollection(loadCollection) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setLoading(true)
      setError('')

      try {
        const collection = await loadCollection(controller.signal)
        setItems(collection)
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError instanceof Error ? requestError.message : 'Unable to load data.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    load()
    return () => controller.abort()
  }, [attempt, loadCollection])

  const retry = useCallback(() => setAttempt((current) => current + 1), [])
  return { items, loading, error, retry }
}
