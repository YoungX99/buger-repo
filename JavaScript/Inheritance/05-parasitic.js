/* 
    寄生式继承实际上就是借用了原型式继承，并且在其之上添加了一些方法
    问题也在于方法不可重用
*/
const object = require("./04-prototypal");

function createObject(original) {
  let o = object(original);
  // 寄生
  o.sayHi = () => {
    console.log("hello world");
  };
  return o;
}

let person = {
  name: "jay",
  age: 18,
  hobbies: [1, 2, 3],
};

let p = createObject(person);
p.sayHi();
