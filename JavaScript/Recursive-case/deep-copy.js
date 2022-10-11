const obj = {
  name: 'jason',
  age: 18,
  type: [{ a: 1 }, { b: 2 }, [1, 2, 3, 4, 5]]
}

// 深拷贝每一步都要确定是否创建新的容器
function deepClone(target, map = new WeakMap()) {
  if (target instanceof Object) {
    if (map.get(target)) {
      return map.get(target)
    }
    const cloneTarget = Array.isArray(target) ? [] : {}
    map.set(target, cloneTarget)
    for (const key of Object.keys(target)) {
      cloneTarget[key] = deepClone(target[key], map)
    }
    return cloneTarget
  } else {
    return target
  }
}

// 浅拷贝无需递归，确定容器直接赋值即可
function shallowClone(target) {
  // 只拷贝对象
  if (!target instanceof Object) {
    return target
  }
  // 在内存里新开一个外层容器
  const cloneTarget = Array.isArray(target) ? [] : {}
  for (const key of Object.keys(target)) {
    cloneTarget[key] = target[key]
  }
  return cloneTarget
}

const clone = deepClone(obj)
obj.type = null
console.log(clone.type)

// shallow
const shallowClone = shallowClone(obj)
obj.type.pop()
console.log(shallowClone.type, shallowClone.name)
