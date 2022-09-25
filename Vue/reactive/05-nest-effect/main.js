// 前面的实现中，还不支持 effect 嵌套
// 原因在于：利用一个全局变量记录当前激活的副作用函数
// 如果嵌套的情况，外层激活的 ativeEffect 会在执行内层时被覆盖
// 这样会导致外层的变量被覆盖，且无法回退
// 所以需要设立一个 stack 结构，存入各个阶段的副作用函数，并且当前副作用函数执行完毕后，需要弹出

let activeEffect
// effect 栈
const effectStack = [] // 新增

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
