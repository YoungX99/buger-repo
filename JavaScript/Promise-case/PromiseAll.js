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
//     reject("p5 rejected 延时1.5秒");
//   }, 1500);
// });

Promise.MyAll = function (promiseArr) {
  let res = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    promiseArr.forEach((element, index) => {
      Promise.resolve(element)
        .then((data) => {
          res[index] = data;
          count += 1;
          count === promiseArr.length && resolve(res);
        })
        .catch((err) => reject(err));
    });
  });
};

Promise.MyAll([1, 23, p1, p4])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));
