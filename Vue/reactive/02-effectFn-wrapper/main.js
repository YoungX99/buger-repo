// effect 写死，不够灵活，我们需要提供一个用来注册副作用函数的机制
// 通过一个全局变量，记录当前需要触发副作用的函数
let activeEffect

const bucket = new Set()
const data = { text: 'hello world' }
const obj = new Proxy(data, {
  get(target, key) {
    if (activeEffect) {
      bucket.add(activeEffect)
    }
    return target[key]
  },
  set(target, key, newVal) {
    target[key] = newVal
    bucket.forEach((fn) => fn())
    return true
  }
})

// 另起名+执行一次
function effect(fn) {
  activeEffect = fn 
  fn()
}

effect(() => {
  document.body.innerText = obj.text
})
setTimeout(() => {
  obj.text = 'hello vue3'
}, 1000)
