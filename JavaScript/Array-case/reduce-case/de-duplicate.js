// 场景1：普通数组去重
function es6Reduce(arr) {
  const res = arr.reduce((pre, cur) => {
    // 使用 concat 返回一个数组
    return pre.includes(cur) ? pre : pre.concat(cur);
  }, []);
  console.log(res);
}

es6Reduce([2, 2, 2, 2, 2, 5]);
