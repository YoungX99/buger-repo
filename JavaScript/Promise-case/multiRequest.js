/* 实现一个批量请求函数 multiRequest(urls, maxNum)，要求如下：
• 要求最大并发数 maxNum
• 每当有一个请求返回，就留下一个空位，可以增加新的请求
• 所有请求完成后，结果按照 urls 里面的顺序依次打出 

首先明确，并行请求，一般使用 Promise.all 实现
故限制最大并发数，要配合 Promise.all 进行实现

场景：如果你的 promises 数组中每个对象都是 http 请求，而这样的对象有几十万个
那么就会爆内存了，所以需要做并发控制
*/

// 一个 Promise.all 的使用案例
// var promises = function () {
//   // 返回一个 Promise 数组
//   return [1000, 2000, 3000].map((current) => {
//     return new Promise(function (resolve) {
//       setTimeout(() => {
//         resolve("请求完成，耗时：" + current);
//       }, current);
//     });
//   });
// };

// Promise.all(promises()).then((res) => {
//   console.log(res);
// });

// 并发请求的具体实现
function multiRequest(urls, maxNum) {
  // 请求总数量
  const len = urls.length;
  // 根据请求数量创建一个数组来保存请求的结果
  const result = new Array(len).fill(false);
  // 当前完成的数量
  let count = 0;
  return new Promise((resolve) => {
    // 请求maxNum个
    while (count < maxNum) {
      next();
    }
    function next() {
      let current = count;
      count += 1;
      // 处理边界条件
      if (current >= len) {
        // 请求全部完成就将promise置为成功状态, 然后将result作为promise值返回
        !result.includes(false) && resolve(result);
        return;
      }
      const url = urls[current];
      console.log(`开始 ${current}`, new Date().toLocaleString());
      fetch(url)
        .then((res) => {
          // 保存请求结果
          result[current] = res;
          console.log(`完成 ${current}`, new Date().toLocaleString());
          // 请求没有全部完成, 就递归

          next();
        })
        .catch((err) => {
          console.log(`结束 ${current}`, new Date().toLocaleString());
          result[current] = err;
          // 请求没有全部完成, 就递归
          next();
        });
    }
  });
}

const urls = [
  "https://api.unsplash.com/photos/random",
  "https://api.unsplash.com/photos/random",
  "https://api.unsplash.com/photos/random",
  "https://api.unsplash.com/photos/random",
  "https://api.unsplash.com/photos/random",
  "https://api.unsplash.com/photos/random",
  "https://api.unsplash.com/photos/random",
  "https://api.unsplash.com/photos/random",
  "https://api.unsplash.com/photos/random",
  "https://api.unsplash.com/photos/random",
];

multiRequest(urls, 5).then((res) => console.log(res));
