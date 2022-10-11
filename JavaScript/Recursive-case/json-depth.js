const emptyJson = {}
const obj = {
  a: 1,
  b: [{ a: 1 }, { b: {} }]
}
// obj->b->[]->1 3
function getDepth(obj) {
  // base:1
  let deep = 0
  function myDeep(obj, depth) {
    const keyArr = Object.keys(obj)
    for (const key of keyArr) {
      const currentDepth = depth + 1
      if (obj[key] instanceof Object) {
        // depth + 1
        myDeep(obj[key], currentDepth)
      } else {
        deep = Math.max(deep, currentDepth)
      }
    }
  }
  myDeep(obj, deep)
  return deep
}
console.log(getDepth(emptyJson))
console.log(getDepth(obj))
