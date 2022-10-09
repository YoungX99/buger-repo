function myInstanceOf(left, right) {
  let proto = left.__proto__
  while (true) {
    if (proto === null) return false
    if (proto === right.prototype) return true
    proto = proto.__proto__
  }
}

console.log(myInstanceOf(Function, Object))
console.log(Function.__proto__.__proto__ === Object.prototype)
