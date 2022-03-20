/* 寄生式组合继承完美地解决了组合继承调用了两次构造函数的问题
   是 ES5 中比较完美的继承方式
   核心思路是不通过调用父类构造函数为子类原型赋值，而是取得父类的一个副本，即寄生式继承
   在 ES5 中，原型式继承被 Object.create 实现
*/
function Animal(name) {
  this.age = 18;
  this.name = name;
  this.colors = ["black", "white"];
}
Animal.prototype.getName = function () {
  return this.name;
};

function Dog(name, age) {
  // stealing
  Animal.call(this, name);
  // 子类属性一定要在父类构造函数之后定义
  // 否则会被覆盖
  this.age = age;
}

////////////////合并：寄生式继承////////////////////
// 原型式继承
Dog.prototype = Object.create(Animal.prototype);
// 还原构造属性
Dog.prototype.constructor = Dog;
/////////////////////////////////////////////////

// 可传参
let dog1 = new Dog("奶昔", 2);
dog1.colors.push("brown");
// 属性副本
let dog2 = new Dog("哈赤", 1);
console.log(dog2);
// 方法重用
console.log(dog1.getName === dog2.getName); // true

// 效率问题得以解决
console.log(Dog.prototype.age);
