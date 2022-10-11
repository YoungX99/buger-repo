// step1 实现绑定 this
Function.prototype.myBind1 = function (context) {
  const self = this // 保存函数本身，即 bar.myBind 保存 bar 的引用
  return function () {
    return self.apply(context) // return 一下，可能有返回值
  }
}

function bar() {
  console.log(this)
}

const obj = { a: 1 }

const fn = bar.myBind1(obj)
fn()
