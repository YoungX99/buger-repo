// vue 会把用到了响应式数据的渲染函数注册为副作用函数进行响应式跟踪，当响应式变量变动时，
// 重新出发渲染函数的渲染，实现页面的变动

// 渲染器的主要功能：在浏览器内把虚拟 dom 渲染为真实 dom，可供用户传入不同的配置实现跨平台渲染能力等

const { effect, ref } = VueReactivity

function createRenderer(options = {}) {
  // 通过 options 得到操作 DOM 的 API
  const { createElement, insert, setElementText } = options
  // 在这个作用域内定义的函数都可以访问那些 API
  function mountElement(vnode, container) {
    // ...
  }
  function patch(n1, n2, container) {
    // ...
  }
  function render(vnode, container) {
    container.innerHTML = vnode
  }
  return {
    render
  }
}

const count = ref(1)
const renderer = createRenderer()
effect(() => {
  renderer.render(`<h1>${count.value}</h1>`, document.getElementById('app'))
})

setTimeout(() => {
  count.value++
}, 3000)
