import {useCallback, useEffect, useState} from "react";

type ApiCallback<T> = () => Promise<{ data: T }>

interface UseFetchDataOptions {
  immediate?: boolean  // 是否立即执行，默认 true
}

export function useFetchData<T>(
  apiCallback: ApiCallback<T> | ApiCallback<T>[],
  options?: UseFetchDataOptions
) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<T[]>([])
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      if (Array.isArray(apiCallback)) {
        const results = await Promise.all(apiCallback.map(cb => cb()))
        setData(results.map(res => res.data))
      } else {
        const result = await apiCallback()
        setData([result.data])
      }
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [apiCallback])

  useEffect(() => {
    if (options?.immediate !== false) {
      void fetchData()
    }
  }, [fetchData, options?.immediate])

  return { loading, data, error, refetch: fetchData }
}
