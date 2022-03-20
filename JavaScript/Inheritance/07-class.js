/* 
    在 ES6 中，采用 class 实现继承
    其本质上还是利用了构造函数和原型链，是一种语法糖结构
*/

class Animal {
  constructor(name) {
    this.age = 18;
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name);
    this.hobbies = [1, 2, 3];
  }
  // 定义在 prototype 上的方法，方法无需带上 function
  getName() {
    return this.name;
  }
}

// 可传参
let dog1 = new Dog("joey");
let dog2 = new Dog("john");

// 可继承父类属性
console.log(dog1.age); // 18

// 属性副本
dog2.hobbies.push(4);
console.log(dog1.hobbies); // [1,2,3]

// 方法重用
console.log(dog1.getName === dog2.getName); // true
