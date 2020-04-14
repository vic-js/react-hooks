import { useState, useCallback, useRef, useEffect } from 'react'

type Page = {
  initPage: number
  perPage: number
}

type AsyncFn = (params: Object) => Promise<any>

type Result = {
  reset: () => any,
  loadMore: () => any,
  page: number
}

export function useLoadMore(
  asyncFn: AsyncFn,
  afterAsync: (res: any) => undefined | Promise<any>,
  queryParams: Page = { initPage: 1, perPage: 10 }
): Result {
  const [ page, setPage ] = useState(queryParams.initPage)
  const isFirst = useRef(true)

  const loadMore = useCallback(async () => {
    try {
      await asyncFn({ ...queryParams, page }).then(afterAsync)
      !isFirst.current && setPage(page => page + 1)
      isFirst.current = false
    } catch {
    }
  }, [queryParams, page])

  useEffect(() => {
    page === 1 && loadMore()
    
  }, [page])

  const reset = async () => {
    isFirst.current = true
    setPage(1);
  }

  return {
    reset,
    loadMore,
    page,
  }
}
