import { renderHook, act } from '@testing-library/react-hooks'
// import { create, act } from 'react-test-renderer'
// import * as Sinon from 'sinon'

// import { find } from './find'
import { useLoadMore } from '../use-load-more'

const fetchData = async() => {
  return Promise.resolve({
    code: 0,
    hasMore: true,
    list: [ 1 ]
  })
}

const afterAsync = (res: { code: number, list: [number] }) => {
  if (res.code === 0) {
    return
  }
  return Promise.reject('失败')
}

const ThrowErrorAfterAsync = () => {
  return Promise.reject('失败')
}

describe('useLoadMore specs', () => {
  it('should auto run first', async () => {
    const { result } = renderHook(() => useLoadMore(fetchData, afterAsync, { initPage: 1, perPage: 10 }))
    // 使用 useLoadMore 的时候会默认调用一次
    expect(result.current.page).toBe(1)
  })

  it('page should plus 1 after loadMore', async () => {
    const { result } = renderHook(() => useLoadMore(fetchData, afterAsync, { initPage: 1, perPage: 10 }))

    await act(async () => {
      await result.current.loadMore()
    })
    expect(result.current.page).toBe(2)
  })

  it('page should return 1 after reset', async () => {
    const { result } = renderHook(() => useLoadMore(fetchData, afterAsync, { initPage: 1, perPage: 10 }))
    await act(async () => {
      await result.current.loadMore()
      await result.current.loadMore()
    })
    expect(result.current.page).toBe(3)
    await act(async () => {
      await result.current.reset()
    })
    expect(result.current.page).toBe(1)
  })

  it('page should change if loadMore is failed', async () => {
    const { result } = renderHook(() => useLoadMore(fetchData, ThrowErrorAfterAsync, { initPage: 1, perPage: 10 }))

    expect(result.current.page).toBe(1)
    await act(async () => {
      await result.current.loadMore()
    })
    expect(result.current.page).toBe(1)
  })
})