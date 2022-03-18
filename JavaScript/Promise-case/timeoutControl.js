/* 
 利用 Promise.race 进行超时控制
 - 注意 race 本身返回一个 Promise
 - 注意 catch 的对 reject 的捕捉。
*/

const timeoutControl = function (promiseFn, delay = 3000) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => {
      reject("请求超时！");
    }, delay);
  });
  return Promise.race([timeout, promiseFn()]);
};

// 利用 Promise 模拟一个耗时 1s 的网络请求
const httpGet = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("请求完成！");
    }, 1000);
  });
};

// 请求超时
timeoutControl(httpGet, 500)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

// 请求成功
timeoutControl(httpGet, 5000)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
