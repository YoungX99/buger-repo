const timeOut = (delay) => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(`超时${delay}ms`), delay)
  })
}

const timeoutControl = (fn, delay) => {
  return Promise.race([fn(), timeOut(delay)])
}

const myFn = () => {
  return new Promise((resolve) => {
    const paid = Math.random() * 10000
    setTimeout(() => resolve(`成功，耗时${paid}ms`), paid)
  })
}
/**
 *
 * @param {异步函数} fn
 * @param {重传次数} times
 * @param {超时时间} delay
 */
Promise.retry = (fn, times, delay) => {
  timeoutControl(fn, delay)
    .then(console.log)
    .catch((e) => {
      if (times > 0) {
        console.log(e, 'retry...')
        Promise.retry(fn, times - 1, delay)
      } else {
        console.log('retry error')
      }
    })
}

Promise.retry(myFn, 3, 1000)
