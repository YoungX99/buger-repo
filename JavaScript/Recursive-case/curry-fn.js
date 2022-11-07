/*  https://github.com/nice-people-frontend-community/nice-handwriting-practice/issues/3#issuecomment-1127742008
    柯里化就是一种将一个需要传入多个参数的参数转换成多个只需要传入一个参数的函数的技术；
    举个例子，比如f(a,b,c) 需要传入三个参数，那么我们使用柯里化技术，可以让他变成f(a)(b)(c)，
    也就是说，每传入一个参数，他都会给你返回另一个新的函数，这个函数是一个闭包，里面保存着你之前传递进去的所有参数。
    直到你所有的参数传递完成（参数的数量足够执行函数了），就开始执行函数，给你返回最后的结果。 

    柯里化不会调用函数。它只是对函数进行转换。

    柯里化的应用，主要在一些函数的定制上，比如一个函数需要传入三个参数，利用柯里化将其前两个参数进行定制
    比如打印控制台消息，定制第一个参数为类型，第二个参数为样式。
    而当需要打印时，拿到定制好前两个参数的函数，将消息传入，触发函数。
*/

// 尽量不要滥用箭头函数
function curry(fn, ...args1) {
  return function curried(...args2) {
    const argsGroup = args1.concat(args2)
    if (argsGroup.length >= fn.length) {
      // 若传入的参数大于原函数所需参数，执行
      return fn.apply(this, argsGroup)
    } else {
      // 若不足，则存储已经传入的参数，再次返回一个curry函数
      return curry(fn, ...argsGroup)
    }
  }
}

// test
const fn = curry(function (a, b, c) {
  console.log([a, b, c])
})

fn('1', 'b', 'c')
fn('2', 'b')('c')
fn('3')('b')('c')
fn('4')('b', 'c')


// curry 初始化时传参
const fn1 = curry(
  function (a, b, c) {
    console.log([a, b, c])
  },
  'h',
  'h',
  '!'
)

fn1()
