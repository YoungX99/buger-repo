// 场景2：对象数组去重
const arr = [
  {
    name: "ls",
    age: "22",
  },
  {
    name: "zs",
    age: "11",
  },
  {
    name: "ww",
    age: "33",
  },
  {
    name: "zs",
    age: "11",
  },
];
// 额外借助对象，记录对象中某一个数值，用 map 也可以
const obj = {};
const objectArr = arr.reduce((pre, cur) => {
  if (typeof obj[cur.name] === "undefined") {
    obj[cur.name] = true;
    pre.push(cur);
  }
  return pre;
}, []);
console.log(objectArr);
