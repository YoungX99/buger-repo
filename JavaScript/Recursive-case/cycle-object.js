const a = {
  b: {
    c: {}
  }
}

const myObj = {
  e: 1
}

a.b.c.d = a

function isCycleObject(obj, map = new Map()) {
  for (const key of Object.keys(obj)) {
    if (map.get(key)) {
      return true
    }
    if (typeof obj[key] === 'object') {
      map.set(key, obj[key])
      return isCycleObject(obj[key], map)
    }
  }
  return false
}

console.log(isCycleObject(a))
console.log(isCycleObject(myObj))