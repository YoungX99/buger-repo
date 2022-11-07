// new 绑定优先级高于一切的指向，故如果利用 new 调用 bind 过的函数，还需要修改 this 指向。
// step4 修复继承关系
Function.prototype.myBind2 = function (context, ...args) {
  const self = this
  const fBound = function () {
    // 谁调用了 fbound？ 若是 new 调用了 fBound，则 fBound 将作为构造函数，
    // new 会将一个新实例对象的原型指向该构造函数 fBound，故 this instaceOf fBound 为 true
    // 且 this 将指向新实例，并执行该构造函数
    return self.apply(
      this instanceof fBound ? this : context,
      args.concat(...arguments)
    )
  }
  fBound.prototype = Object.create(self.prototype)
  return fBound
}
let foo = {
  value: 1
}

function bar(name, age) {
  console.log(this.value)
  this.age = age
  console.log(name)
}

let bindFoo = bar.myBind2(foo, 'John')
let obj = new bindFoo('13')
console.log(obj.age)
