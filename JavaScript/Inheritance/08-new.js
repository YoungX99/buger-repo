function objectFactory(...args) {
  const CONSTRUCTOR = args.shift()
  var obj = Object.create(CONSTRUCTOR.prototype)
  var ret = CONSTRUCTOR.apply(obj, args)
  return typeof ret === 'object' ? ret || obj : obj
}

function Person(name, age) {
  this.name = name
  this.age = age
}
let p = objectFactory(Person, '布兰', 12) // new Person('布兰', 12)
console.log(p) // { name: '布兰', age: 12 }
