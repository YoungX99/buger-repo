// 最好 O(nlogn)
// 最坏 O(nlogn)
// 平均 O(nlogn)
// out-place 稳定算法（需要申请额外的空间 O(n)）
// 思想：递归处理，对比分开的两端，最后合并放入数组对应的位置
const arr = [1, 2311, 12, 441, -1, 0, 1]

const mergeSortMain = (nums) => {
  if (!nums || nums.length < 2) {
    return
  }
  const len = nums.length
  const temp = new Array(len)
  mergeSort(nums, 0, len - 1, temp)
}

const mergeSort = (arr, left, right, temp) => {
  if (left >= right) return
  const mid = Math.floor((right - left) / 2) + left
  // 注意两端的值
  mergeSort(arr, left, mid, temp)
  mergeSort(arr, mid + 1, right, temp)
  let i = left
  let j = mid + 1
  let t = 0
  while (i <= mid && j <= right) {
    if (arr[i] <= arr[j]) {
      temp[t++] = arr[i++]
    } else {
      temp[t++] = arr[j++]
    }
  }

  while (i <= mid) {
    temp[t++] = arr[i++]
  }
  while (j <= right) {
    temp[t++] = arr[j++]
  }
  // 赋值回原数组
  t = 0
  while (left <= right) {
    arr[left++] = temp[t++]
  }
}

mergeSortMain(arr)
console.log(arr)
