// step2 实现传参
Function.prototype.myBind2 = function (context, ...args) {
  const self = this
  return function () {
    return self.apply(context, args.concat(...arguments))
  }
}
let foo = {
  value: 1
}

function bar(name, age) {
  console.log(this.value)
  console.log(name)
  console.log(age)
}

// 绑定时传参
let bindFoo = bar.myBind2(foo, 'John')
// 调用时传参
bindFoo('13')
