// 未建立 key 与 副作用函数之间的关系，当设置别的属性时，会触发不属于该属性的副作用函数
// 需要全新桶结构
// 1. 一个代理对象对应一个坑位，桶采用 weakMap 避免内存泄漏
// 2. 一个代理对象拥有的属性，采用 map 映射
// 3. 其属性关联的副作用函数，采用 set 去重
let activeEffect

const bucket = new WeakMap()
const data = { text: 'hello world', name: 'jason' }
const obj = new Proxy(data, {
  get(target, key) {
    track(target, key)
    // 返回属性值
    return target[key]
  },
  set(target, key, newVal) {
    target[key] = newVal
    trigger(target, key)
  }
})

function effect(fn) {
  activeEffect = fn
  fn()
}

effect(() => {
  console.log('effect!')
  document.body.innerText = obj.name
})
// 不会触发响应式更新
setTimeout(() => {
  obj.text = 'hello vue3'
}, 1000)

// 在 get 拦截函数内调用 track 函数追踪变化
function track(target, key) {
  // 没有 activeEffect，直接 return
  if (!activeEffect) return
  let depsMap = bucket.get(target)
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  deps.add(activeEffect)
}

// 在 set 拦截函数内调用 trigger 函数触发变化
function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)
  effects && effects.forEach((fn) => fn())
}
