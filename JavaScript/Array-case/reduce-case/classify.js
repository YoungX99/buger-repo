// 场景4：reduce 实现对象数据按照某一属性分类
const someData = [
  { id: 1, age: 18 },
  { id: 1, name: "john" },
  { id: 2, age: 21 },
  { id: 3, name: "jay", age: 18 },
];
function classifyByReduce(arr, key) {
  return arr.reduce((pre, cur) => {
    const sortKey = cur[key];
    if (!pre[sortKey]) {
      pre[sortKey] = [];
    }
    pre[sortKey].push(cur);
    return pre;
  }, {});
}
console.log(classifyByReduce(someData, "id"));
console.log(classifyByReduce(someData, "age"));
