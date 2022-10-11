// 最好 O(nlogn) 即第一个选取基准值，刚好就是有序数组中间的值，递归树平衡
// 最坏 O(n^2) 即*完全有序*，递归树表现为一颗斜树
// 平均 O(nlogn)
// in-place 不稳定
// 思想：找基准值，取坑，填坑，一轮循环中会把基准值填入正确的位置

const arr = [0, 1, 2311, 12, 441, -1, 0]

const quickSortFn = (nums) => {
  const len = nums.length
  quickSort(0, len - 1, nums)
}
const quickSort = (left, right, arr) => {
  if (left < right) {
    const idx = partition(left, right, arr)
    quickSort(left, idx - 1, arr)
    quickSort(idx + 1, right, arr)
  }
}
const partition = (left, right, arr) => {
  const privot = arr[left] // 将基础值记录，空出一个左坑

  while (left < right) {
    // 找到第一个比基准值小的数字，放在左坑里，右坑空
    while (left < right && arr[right] >= privot) right--
    arr[left] = arr[right]
    // 找到第一个比基准值大的数字，放在右边的空坑里，左坑又空出，将在下一轮填补右坑的值
    while (left < right && arr[left] <= privot) left++
    arr[right] = arr[left]
  }
  // 将基准值放在正确的位置
  arr[left] = privot
  return left
}
quickSortFn(arr)
console.log(arr)
