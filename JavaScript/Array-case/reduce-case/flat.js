// 场景3：数组扁平化
function flatByReduce(arr) {
  // pre.concat 即把每一个元素都加在一起，合并的时候对当前元素做一次判断即可
  // reduce 需要返回值
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatByReduce(cur) : cur);
  }, []);
}

const nums = [1, [2], [3, 4], [[5, 6, 7]]];
console.log(flatByReduce(nums));
