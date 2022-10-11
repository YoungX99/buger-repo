// 当序列完全有序时，快排将退化到 o(n^2)，利用随机函数，随便选一个主元，放在开头
const arr = new Array(5000).fill(0).map((_, index) => index + 1)

const quickSortFn = (nums, random = false) => {
  const len = nums.length
  quickSort(0, len - 1, nums, random)
}

const quickSort = (left, right, arr, random) => {
  if (left < right) {
    const idx = random
      ? randomPartition(left, right, arr)
      : partition(left, right, arr)
    quickSort(left, idx - 1, arr, random)
    quickSort(idx + 1, right, arr, random)
  }
}

const randomPartition = (left, right, arr) => {
  const sectionLen = right - left + 1
  const randomIdx = ~~(Math.random() * sectionLen) + left
  const temp = arr[left]
  arr[left] = arr[randomIdx]
  arr[randomIdx] = temp
  return partition(left, right, arr)
}

const partition = (left, right, arr) => {
  const privot = arr[left]
  while (left < right) {
    while (left < right && arr[right] >= privot) right--
    arr[left] = arr[right]
    while (left < right && arr[left] <= privot) left++
    arr[right] = arr[left]
  }
  arr[left] = privot
  return left
}

// random quickSort
console.time()
quickSortFn(arr, true)
console.timeEnd()
// 3ms

//default quickSort
console.time()
quickSortFn(arr)
console.timeEnd()
// 12ms
