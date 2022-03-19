const p1 = Promise.resolve("p1");
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p2 延时一秒");
  }, 1000);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p3 延时两秒");
  }, 2000);
});

const p4 = Promise.reject("p4 rejected");

// const p5 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject('p5 rejected 延时1秒')
//   }, 1500)
// })

Promise.race([p1, p2, p3]).then(console.log);

Promise.myRace = function (promiseArr) {
  return new Promise((resolve, reject) => {
    for (const element of promiseArr) {
      Promise.resolve(element).then(resolve, reject);
    }
  });
};

Promise.myRace([p4, p2, p1]).then(console.log).catch(console.log);
