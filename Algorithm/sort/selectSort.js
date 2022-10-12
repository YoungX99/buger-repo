// 最好 O(n^2) 与实现思路强相关，最好和最坏时间复杂度相同
// 最坏 O(n^2)
// 平均 O(n^2)
// in-place 不稳定算法（因为交换时，可以改变两个同样大小的数字的相对次序）
// 思想：（升序）区间遍历，找到一个最小索引，与区间开头交换；缩小区间，从剩下的区间找到最小值，以此类推
const arr = [1, 2311, 12, 441, -1, 0]

const selectSort = (nums) => {
  const len = nums.length
  for (let i = 0; i < len - 1; i++) {
    let minIdx = i
    for (let j = i + 1; j < len; j++) {
      if (nums[j] < nums[minIdx]) {
        minIdx = j
      }
    }
    const temp = nums[i]
    nums[i] = nums[minIdx]
    nums[minIdx] = temp
  }
}

selectSort(arr)
console.log(arr)
