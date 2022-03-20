/* 
原型链继承的缺点在于：实例无法拥有单独的引用属性副本，
并且不能向父类传参，仅仅只是搭了一条链子而已
*/

function Animal(myName) {
  this.name = myName;
  this.colors = ["black", "white"];
}
Animal.prototype.getColor = function () {
  return this.colors;
};

// 子类
function Dog() {}
// 采用原型链继承，并且传参无效
Dog.prototype = new Animal("sb");

let dog1 = new Dog();
dog1.colors.push("brown");

let dog2 = new Dog();
console.log(dog2.colors); // ['black', 'white', 'brown']

console.log(dog2.myName); // undefined
