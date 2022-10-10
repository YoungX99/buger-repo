const wait = (delay) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

function log() {
  console.log(this, ...arguments)
}

function repeat(fn, times, delay) {
  return async function () {
    while (times > 0) {
      await wait(delay)
      fn.apply(this, arguments)
      times--
    }
  }
}
const obj = { a: 1 }

const repeatFn = repeat(log, 4, 3000)
repeatFn('global or window')
repeatFn.call(obj, '不要', '滥用', '箭头函数')
