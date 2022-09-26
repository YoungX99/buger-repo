// trigger 时，如果两个副作用函数存在影响怎么办？
// 即，假设一个副作用函数，它需要取到这一轮最新的结果，那按道理应该将它放在集合的尾部
// 那么如何让用户决定他们的顺序？
// 答：调度器
// scheduler 接受该副作用函数，并决定其执行时机，次数等
// 对于时机，可以利用宏任务 微任务进行控制
// 对于次数，比如连续两次触发，则可以利用 set 去重，省去不必要的副作用函数调用
// - 具体实现为:
//   - 设置一个队列集合，当副作用函数触发时，会加入到该队列中（并去重）
//   - 加入后，执行 flushjob 函数，设立一个布尔值，以及一个微任务
//   - 一次事件循环内，通过控制布尔值，flushjob 的队列副作用函数只会执行一次（即设立一次微任务）
//   - 事件循环末端，通过调用队列集合，实现最简化的更新，提高了效率

// 这便是 vue 多次更改响应式数据，只触发一次更新的实现思路

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

// 定义一个任务队列
const jobQueue = new Set()
// 使用 Promise.resolve() 创建一个 promise 实例，我们用它将一个任务添加到微任务队列
const p = Promise.resolve()
// 一个标志代表是否正在刷新队列
let isFlushing = false
function flushJob() {
  // 如果队列正在刷新，则什么都不做
  if (isFlushing) return
  // 设置为 true，代表正在刷新
  isFlushing = true
  // 在微任务队列中刷新 jobQueue 队列

  p.then(() => {
    jobQueue.forEach((job) => job())
  }).finally(() => {
    // 结束后重置 isFlushing
    isFlushing = false
  })
}
effect(
  () => {
    console.log(obj.foo)
  },
  {
    scheduler(fn) {
      // 每次调度时，将副作用函数添加到 jobQueue 队列中
      jobQueue.add(fn)
      // 调用 flushJob 刷新队列
      flushJob()
    }
  }
)
obj.foo++
obj.foo++

function effect(fn, options = {}) {
  const effectFn = () => {
    cleanUp(effectFn)
    activeEffect = effectFn
    effectStack.push(effectFn)
    fn()
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
  }
  // 将 options 挂载到 effectFn 上
  effectFn.options = options // 新增
  effectFn.deps = []
  effectFn()
}

// oldEffect
// function effect(fn) {
//   const effectFn = () => {
//     cleanUp(effectFn)
//     activeEffect = effectFn
//     effectStack.push(effectFn)
//     fn()
//     effectStack.pop()
//     activeEffect = effectStack[effectStack.length - 1]
//   }
//   effectFn.deps = []
//   effectFn()
// }

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
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn)
      }
    })
  }
  effectsToRun.forEach((effectFn) => {
    if (effectFn.options.scheduler) {
      // 通过调度器决定如何执行该副作用函数
      effectFn.options.scheduler(effectFn)
    } else {
      // 否则直接执行副作用函数（之前的默认行为）
      effectFn() // 新增
    }
  })
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
