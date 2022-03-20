/* 原型式继承并不算真正意义上的继承
   但它却可以解决组合继承的效率问题，即引出寄生式组合继承的概念
   其思想为：创建一个实例，其原型对象为传入的对象，即 newInstance.__proto__== object
*/

// 原型式继承
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

let person = {
  name: "jay",
  age: 18,
  hobbies: [1, 2, 3],
};

let p1 = object(person);
console.log(p1.__proto__); // person

// 通过该方法创建的所有实例，都会共享这个 person 内的引用属性
let p2 = object(person);
p2.hobbies.push(4);
console.log(p1.hobbies); // [ 1, 2, 3, 4 ]

module.exports = object;
