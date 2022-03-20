/* 盗用构造函数的核心思想：
   在子类的构造函数，调用了父类的构造函数，这样做解决了原型链继承：共享引用类型、不可传参的问题
   但也引出了新问题，方法不可重用，每一个实例的方法虽然相同，但不是同一个
*/

function Animal(name) {
  this.name = name;
  this.arr = [1, 2, 3, 4];
  this.getName = function () {
    return this.name;
  };
}
function Dog(name) {
  Animal.call(this, name);
}

let dog1 = new Dog("woo");
let dog2 = new Dog("woo");
dog2.arr[0] = "dog2";
// 可传参
console.log(dog1.name); // woo
// 独立属性副本
console.log(dog1.arr[0]); // 1
// 但方法不可重用
console.log(dog1.getName === dog2.getName); // false
