// computed 实际上就是利用副作用注册函数和调度器的配合，得到的一个属性值
// 之前实现的 effect 都是立刻执行一次，而传入一个 getter 并且设置 lazy，
// 则可以得到一个响应式的 getter，这就是 computed！！
// 它具有：自动收集依赖，自动触发更新，缓存等功能

// 计算属性唯一的注意点便是，需要在 get 时，手动触发依赖收集。
// why？
// 因为计算属性属于懒执行，当读取 value 时，才会触发响应收集
// 但如果该计算属性被另外一个副作用函数使用，这个自动收集的过程，无法将外层的收集
// 即 num.value 这个读取过程，无法触发外层的收集
// 所以要手动收集  obj 和 value 的依赖关系
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

function computed(getter) {
  // cacheVal 用来缓存上一次计算的值
  let cacheVal
  // dirty 标志，用来标识是否需要重新计算值，为 true 则意味着“脏”，需要计算
  let dirty = true

  // 把 getter 作为副作用函数，创建一个 lazy 的 effect
  const effectFn = effect(getter, {
    lazy: true,
    scheduler() {
      dirty = true
      // 当计算属性依赖的响应式数据变化时，手动调用 trigger 函数触发响应
      trigger(obj, 'value')
    }
  })
  const obj = {
    // 当读取 value 时才执行 effectFn
    get value() {
      // 只有“脏”时才计算值，并将得到的值缓存到 value 中
      if (dirty) {
        cacheVal = effectFn()
        // 将 dirty 设置为 false，下一次访问直接使用缓存到 value 中的值
        dirty = false
      }
      // 当读取 value 时，手动调用 track 函数进行追踪
      track(obj, 'value')
      return cacheVal
    }
  }
  return obj
}

const num = computed(() => obj.foo + 3)
// 副作用函数内读取了计算属性
effect(() => {
  console.log(num.value)
})
obj.foo = 9

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
