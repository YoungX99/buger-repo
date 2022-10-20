// 最好  与增量序列强相关
// 最坏 O(n^2) 退化成插入排序
// 平均 O(n logn)
// in-place 不稳定算法
// 思想：（升序）按照间隔的一种插入排序，不必一个一个移动，另外，间隔的确定较为复杂，有多种间隔确定的方法，也影响时间复杂度
const arr = [1, 2311, 12, 441, -1, 0]

const shellSort = (nums) => {
  const len = nums.length
  // 最简单的增量序列
  for (let gap = ~~(len / 2); gap > 0; gap = ~~(gap / 2)) {
    for (let i = gap; i < len; i++) {
      const current = arr[i]
      let j = i - gap
      for (; j >= 0 && arr[j] > current; j -= gap) {
        arr[j + gap] = arr[j]
      }

      arr[j + gap] = current
    }
  }
  return arr
}

shellSort(arr)
console.log(arr)
