/* 组合继承就是把原型链继承和盗用构造函数继承集合在一起
   实现了：属性副本，方法重用，可传参等一系列问题
   但问题在于：效率不高
*/

function Animal(name) {
  this.name = name;
  this.colors = ["black", "white"];
}
Animal.prototype.getName = function () {
  return this.name;
};

function Dog(name, age) {
  // stealing
  Animal.call(this, name);
  this.age = age;
}

// prototype
Dog.prototype = new Animal();

// 还原构造器属性
Dog.prototype.constructor = Dog;

// 可传参
let dog1 = new Dog("奶昔", 2);
dog1.colors.push("brown");
// 属性副本
let dog2 = new Dog("哈赤", 1);
console.log(dog2);
// 方法重用
console.log(dog1.getName === dog2.getName); // true
