/* 数组扁平化也是十分常考的一道题目，同样存在多种方式，但本质上都是递归思想 */

const nums = [1, [2], [3, 4], [[5, 6, 7]]];

// 方法一：采用原生 API flat 未知深度可以采用 Infinity 替代
console.log(nums.flat(2));

// 方法二：遍历每一个元素，若当前元素是数组，则递归遍历
function myFlat1(arr) {
  let res = [];
  for (const ele of arr) {
    if (Array.isArray(ele)) {
      // res = [...res, ...myFlat(ele)];
      res = res.concat(myFlat1(ele));
    } else {
      res.push(ele);
    }
  }
  return res;
}

const flatArr1 = myFlat1(nums);
console.log(flatArr1);

// 方法三：reduce 实现
function myFlat2(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? myFlat2(cur) : cur);
  }, []);
}

const flatArr2 = myFlat2(nums);
console.log(flatArr2);
