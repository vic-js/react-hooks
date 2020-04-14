## install

```sh
npm install @alitter/hooks
```

## useLoadMore

特点：

1. 初始化默认调用一侧
2. hook 内部维护 page 状态
3. 如果 `loaderMore` 失败，page 自动还原
4. 两个方法：`loaderMore`、`reset`

```tsx
import { useLoadMore } from '@alitter/hooks'

const fetchData = async(queryParams: Object) => {
  console.log('queryParams', queryParams)
  return Promise.resolve({
    code: 0,
    hasMore: true,
    list: [ 1, 2, 3, 4 ]
  })
}

function Demo() {
  const [list, setList] = useState<any[]>([])
  const [search, setSearch] = useState<string>('111')

  const afterAsync = (res: { code: number, list: [number] }) => {
    if (res.code === 0) {
      setList((prevList: any[]) => [...prevList, ...res.list])
      return
    }
    return Promise.reject('失败')
  }

  const {
    reset,
    loadMore,
    page
  } = useLoadMore(fetchData, afterAsync, { initPage: 1, perPage: 10, search })

  return (
    <>
      <h3>当前页数：{page}</h3>
      <button onClick={() => setSearch('5555')}>改变搜索值</button>
      <button onClick={() => reset()}>重置</button>
      <button onClick={loadMore}>load more</button>
      {
        list.map((item, index) => <h1 key={index}>{item}</h1>)
      }
    </>
  )
}
```
