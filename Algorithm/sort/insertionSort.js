// 最好 O(n) 有序
// 最坏 O(n^2) 完全逆序
// 平均 O(n^2)
// in-place 稳定算法
// 思想：（升序）从头开始遍历，对比前后两个，若后者比前者小，一直移动到合适的位置，即后者比前者大时（类似冒泡，但不是冒到最顶端）
const arr = [1, 2311, 12, 441, -1, 0]

const insertionSort = (nums) => {
  const len = nums.length
  for (let i = 1; i < len; i++) {
    const current = nums[i]
    let preIdx = i - 1
    while (preIdx >= 0 && nums[preIdx] > current) {
      nums[preIdx + 1] = nums[preIdx]
      preIdx--
    }
    // 放置在正确位置
    nums[preIdx + 1] = current
  }
}

insertionSort(arr)
console.log(arr)
