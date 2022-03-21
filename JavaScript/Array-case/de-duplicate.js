/* 数组去重是一道常考的面试手写题，一般可以从 ES5 和 ES6 的语法出发
   ES5 通过 filter 配合 indexOf
   ES6 可将 indexOf 换为 includes，也可以直接用集合
*/

const nums = [1, 2, 3, 4, 5, 1, 2, 4, 3];

function es5IndexOf(arr) {
  // 过滤出那些第一次出现的元素！ indexOf 会返回第一个出现元素的下标
  const res = arr.filter((item, index, array) => {
    return array.indexOf(item) === index;
  });
  console.log(res);
}

function es6Include(arr) {
  const res = [];
  for (const num of arr) {
    !res.includes(num) && res.push(num);
  }
  console.log(res);
}

function es6Set(arr) {
  console.log([...new Set(arr)]);
}

function es6Reduce(arr) {
  const res = arr.reduce((pre, cur) => {
    // 不能写成 push，因为当前的 new Cur 要成为下一个 pre
    // 写成 push 只会返回当前 push 进入的元素
    // 所以需要返回一个数组，写出 concat 才行
    return pre.includes(cur) ? pre : pre.concat(cur);
  }, []);
  console.log(res);
}

es5IndexOf(nums);
es6Include(nums);
es6Set(nums);
es6Reduce(nums);
