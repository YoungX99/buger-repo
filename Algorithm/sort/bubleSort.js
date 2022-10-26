// 最好 O(n) 即完全升序，一次遍历搞定（下列算法不可以，需要一个变量来确定第一次遍历是否存在冒泡）
// 最坏 O(n^2) 即完全降序
// 平均 O(n^2)
// in-place 稳定算法
// 思想：（升序）比较相邻的元素，大的往后放，每一轮小循环都可以把最大的放到最后
const arr = [1, 2311, 12, 441, -1, 0]

const bubleSort = (nums) => {
  const len = nums.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
      }
    }
  }
}

bubleSort(arr)
console.log(arr)
