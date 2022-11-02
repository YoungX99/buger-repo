/*
query传入参数为原始数据(数组格式，每个元素都是对象)
通过进行链式调用对数据执行操作，支持的方法有
1 where(predicate) 根据参数的条件进行筛选，参数与 [].filter 的参数类似
2 orderBy(key, desc) :根据key的值进行排列，默认升序排列，当第二个参数为true时降序排列
3 groupBy(key):根据key 的值对数据元素进行分组，合并为二维数组
4 execute():执行所有处理并返回最终结果
执行execute方法时才真正执行操作并返回结果
*/

const data = [
  { name: 'foo', age: 16, city: 'shanghai' },
  { name: 'bar', age: 24, city: 'hangzhou' },
  { name: 'fiz', age: 22, city: 'shanghai' },
  { name: 'baz', age: 19, city: 'hangzhou' }
]

class Query {
  constructor(data) {
    this.data = data
  }
  where(condition) {
    this.data = this.data.filter(condition)
    return this
  }
  orderBy(key, desc = false) {
    this.data.sort((a, b) => {
      if (desc) {
        return b[key] - a[key]
      }
      return a[key] - b[key]
    })
    return this
  }
  groupBy(key) {
    const groupObj = {}
    this.data.forEach((item) => {
      const groupKey = item[key]
      if (!groupObj[groupKey]) {
        groupObj[groupKey] = []
      }
      groupObj[groupKey].push(item)
    })
    this.data = [...Object.values(groupObj)]
    return this
  }
  execute() {
    return this.data
  }
}

function query(data) {
  return new Query(data)
}
const res = query(data)
  .where((item) => item.age > 18)
  .orderBy('age')
  .groupBy('city')
  .execute()

console.log(res)
