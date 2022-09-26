// watch 的实现，则是利用了 effect 和调度器
// 思路在于，根据 effect 触发响应式收集，根据调度器定义用户的 callback 函数，利用 lazy 取得新老值
// 若用户传入了一个响应式对象，watch 内部需要对该响应式对象进行遍历，读取所有属性，并且进行依赖收集
// 如果传入一个 getter，那就好办，effect 会自动收集
let activeEffect
const effectStack = []

const bucket = new WeakMap()
const data = { foo: 1, isReady: true }
const obj = new Proxy(data, {
  get(target, key) {
    track(target, key)
    return target[key]
  },
  set(target, key, newVal) {
    target[key] = newVal
    trigger(target, key)
  }
})

const jobQueue = new Set()
const p = Promise.resolve()
let isFlushing = false
function flushJob() {
  if (isFlushing) return
  isFlushing = true
  p.then(() => {
    jobQueue.forEach((job) => job())
  }).finally(() => {
    isFlushing = false
  })
}
function traverse(value, seen = new Set()) {
  // 如果要读取的数据是原始值，或者已经被读取过了，那么什么都不做
  if (typeof value !== 'object' || value === null || seen.has(value)) return
  // 将数据添加到 seen 中，代表遍历地读取过了，避免循环引用引起的死循环
  seen.add(value)
  // 暂时不考虑数组等其他结构
  // 假设 value 就是一个对象，使用 for...in 读取对象的每一个值，并递归地 traverse 进行处理
  for (const k in value) {
    traverse(value[k], seen)
  }
  return value
}

function watch(source, cb) {
  // 定义 getter
  let getter
  // 如果 source 是函数，说明用户传递的是 getter，所以直接把 source 赋给 getter
  if (typeof source === 'function') {
    getter = source
  } else {
    // 否则按照原来的实现调用 traverse 递归地读取
    getter = () => traverse(source)
  }
  let oldVal, newVal
  const effectFn = effect(
    // 执行 getter
    () => getter(),
    {
      lazy: true, // 传入 lazy 方便手动调用
      scheduler() {
        // 在 scheduler 中重新执行副作用函数，得到的是新值（getter）
        newVal = effectFn()
        cb(newVal, oldVal)
        oldVal = newVal
      }
    }
  )
  //  watch 第一次调用
  oldValue = effectFn()
}

watch(
  () => obj.foo,
  () => {
    console.log('watch out!')
  }
)
function effect(fn, options = {}) {
  const effectFn = () => {
    cleanUp(effectFn)
    activeEffect = effectFn
    effectStack.push(effectFn)
    const res = fn() // 新增
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
    return res // 新增
  }
  effectFn.options = options
  effectFn.deps = []
  if (!options.lazy) {
    // 新增
    // 执行副作用函数
    effectFn()
  }
  // 将副作用函数作为返回值返回
  return effectFn // 新增
}

function track(target, key) {
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
  activeEffect.deps.push(deps)
}

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
      effectFn.options.scheduler(effectFn)
    } else {
      effectFn()
    }
  })
}

function cleanUp(effectFn) {
  for (const dep of effectFn.deps) {
    dep.delete(effectFn)
  }
  effectFn.deps.length = 0
}
