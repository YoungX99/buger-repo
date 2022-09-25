// 如果一个副作用函数，同时读取并且设置，就会造成无限递归
// 如 obj.foo=obj.foo++
// 原因在于，读取时触发 track，设置时触发 trigger，但都在同一个副作用函数内
// 导致了无限调用
// 虽然每一次执行都会进行一次 cleanup，但只要一有 get 就立马会建立关联，后续的 set 又回重新执行
// 解决办法？避免自己调用自己，trigger 时，排除自己

let activeEffect
// effect 栈
const effectStack = [] // 新增

const bucket = new WeakMap()
const data = { foo: 1, isReady: true }
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
  const effectFn = () => {
    cleanUp(effectFn)
    activeEffect = effectFn
    // 在调用副作用函数之前将当前副作用函数压入栈中
    effectStack.push(effectFn) // 新增
    fn()
    // 在当前副作用函数执行完毕后，将当前副作用函数弹出栈，并把activeEffect 还原为之前的值（恢复）
    effectStack.pop() // 新增
    activeEffect = effectStack[effectStack.length - 1] // 新增
  }
  // activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合
  effectFn.deps = []
  effectFn()
}

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
  // 建立双向的联系：将依赖集合加入到函数体内
  activeEffect.deps.push(deps) // 新增
}

//在 set 拦截函数内调用 trigger 函数触发变化
function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)
  const effectsToRun = new Set()
  if (effects) {
    effects.forEach((effectFn) => {
      // 如果 trigger 触发执行的副作用函数与当前正在执行的副作用函数相同，则加入执行集合
      if (effectFn !== activeEffect) {
        // 新增
        effectsToRun.add(effectFn)
      }
    })
  }
  effectsToRun.forEach((effectFn) => effectFn())
}
// oldTrigger
// function trigger(target, key) {
//   const depsMap = bucket.get(target)
//   if (!depsMap) return
//   const effects = depsMap.get(key)
//   const effectsToRun = new Set(effects)
//   effectsToRun && effectsToRun.forEach((fn) => fn())
// }

function cleanUp(effectFn) {
  for (const dep of effectFn.deps) {
    dep.delete(effectFn)
  }
  // 可以清空依赖关系了
  effectFn.deps.length = 0
}

// CASE
// get set 在同一个函数内
effect(() => {
  obj.foo++
})
effect(() => {
  console.log(obj.foo)
})

setTimeout(() => {
  obj.foo = 3
}, 1000)
