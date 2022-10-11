function objectFactory(CONSTRUCTOR, ...args) {
  const obj = Object.create(CONSTRUCTOR.prototype) // 创建一个空实例对象，并将 __proto__ 指向构造函数的原型对象
  const ret = CONSTRUCTOR.apply(obj, args) // 执行构造函数，并将 this 指向实例对象
  return ret instanceof Object ? ret : obj // 判断返回结构
}

function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.getName = function () {
  console.log(this.name)
}
let p = objectFactory(Person, '布兰', 12) // new Person('布兰', 12)
console.log(p) // { name: '布兰', age: 12 }
p.getName()
