/* 
实现一个函数sum函数满足以下规律

sum(1, 2, 3).valueOf() // 6
sum(2, 3)(2).valueOf() // 7
sum(1)(2)(3)(4).valueOf() // 10
sum(2)(4, 1)(2).valueOf() // 9 

可传入无限参数，可缓存，调用 valueOf 得出结果

传入参数可缓存，这点类似柯里化
需要调用 .valueOf 得出结果，说明返回的函数，还得附加一个 valueOf 方法
（如果需要附加多个方法即链式调用，写成类会好些）
*/

function sum(...args1) {
  let fullArgs = [...args1]
  const fn = function (...args2) {
    // 返回一个函数专门用来收集参数
    fullArgs = fullArgs.concat(args2)
    return fn
  }
  fn.valueOf = function () {
    return fullArgs.reduce((pre, cur) => pre + cur, 0)
  }
  return fn
}

console.log(sum(1, 2, 3)(4).valueOf())
console.log(sum(2)(2, 3)(4).valueOf())
