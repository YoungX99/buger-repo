/**
 * 防抖 debounce 常用于频繁触发操作，只保留最后一次
 * 如 watch 输入变化请求，通常保留最后一次即可
 */

/**
 * 两个注意事项，箭头函数没有 arguments，来自上层
 * 记得清除定时器
 * @param {需要防抖的函数} fn
 * @param {停止操作后多少秒触发} delay
 * @returns
 */
const debounce = (fn, delay = 500) => {
  let timer
  return function () {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}

/**
 * 即设置定时器后，通过 flag 禁止在该定时器结束前再设立定时
 * 当该次定时器结束后，修改 flag，允许下一次设立
 * @param {节流函数} fn
 * @param {多少延迟执行一次} delay
 * @returns
 */
const throttle = (fn, delay = 500) => {
  let flag = false
  return function () {
    if (!flag) {
      setTimeout(() => {
        fn.apply(this, arguments)
        flag = false
      }, delay)
    }
    flag = true
  }
}

const log = (e) => {
  console.log('debounce', e.type)
}

const log2 = (e) => {
  console.log('throttle', e.type)
}

window.addEventListener('resize', debounce(log))
window.addEventListener('resize', throttle(log2))