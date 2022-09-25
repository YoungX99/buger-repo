// 存在分支切换时，可能有残余的副作用函数，其思路是，执行副作用函数前先清空所有副作用函数
// 该例子用于说明，函数的执行是动态的，这一次可能需要响应，下一次可能就不需要了
// 所以每一次执行，都得清空，避免残留
// 但注意清空指的是清空当前副作用函数 A，并非所有
// 即需要找到含有副作用函数A属性，并清除它
// 故需要建立双向的联系
// 涉及三个改动
// effect 执行时，添加一个 deps 记录
// get track 时，提供依赖集合供 effect.deps 记录
// set trigger 防止 set 与 foreach 的无限循环，需要新设立一个 set

let activeEffect

const bucket = new WeakMap()
const data = { text: 'hello world', isReady: true }
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

// function effect(fn) {
//   activeEffect = fn
//   fn()
// }
// function effect(fn) {
//   const effectFn = () => {
//     activeEffect = effectFn
//     fn()
//   }
//   // activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合
//   effectFn.deps = []
//   effectFn()
// }

function effect(fn) {
  const effectFn = () => {
    cleanUp(effectFn)
    activeEffect = effectFn
    fn()
  }
  effectFn.deps = []
  effectFn() // 执行一次
}

// CASE1
// function effect(fn) {
//   activeEffect = fn
//   fn()
// }
// 触发响应式更新
// setTimeout(() => {
//   obj.isReady = false
// }, 1000)

//  仍会触发副作用函数，尽管  obj.text 对该函数来说，无任何影响
// setTimeout(() => {
//   obj.text = 'hhh'
// }, 3000)

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

// 在 set 拦截函数内调用 trigger 函数触发变化
function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)
  const effectsToRun = new Set(effects)
  effectsToRun && effectsToRun.forEach((fn) => fn())
}

function cleanUp(effectFn) {
  for (const dep of effectFn.deps) {
    dep.delete(effectFn)
  }
  // 可以清空依赖关系了
  effectFn.deps.length = 0
}
