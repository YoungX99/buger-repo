# 🍔 buger-repo

该仓库用于收录一些场景与原理，配备好相应的笔记与输入输出，便于复习。

## 🙀 收录列表

### 1. 数据结构

| 题目                                          | 备注 |
| --------------------------------------------- | ---- |
| [冒泡](Algorithm/sort/bubleSort.js)           |      |
| [插入](Algorithm/sort/insertionSort.js)       |      |
| [选择](Algorithm/sort/selectSort.js)          |      |
| [希尔](Algorithm/sort/shellSort.js)           |      |
| [快排](Algorithm/sort/quickSort.js)           |      |
| [随机快排](Algorithm/sort/randomQuickSort.js) |      |
| [归并](Algorithm/sort/mergeSort.js)           |      |

### 数组

| 题目                                                                                    | 备注        |
| --------------------------------------------------------------------------------------- | ----------- |
| [数组去重](JavaScript/Array-case/de-duplicate.js)                                       |             |
| [数组展平](JavaScript/Array-case/flat.js)                                               |             |
| [数组 reduce 分类](JavaScript/Array-case/reduce-case/classify.js)                       |             |
| [数组 reduce 去重](JavaScript/Array-case/reduce-case/de-duplicate.js)                   | reduce 细分 |
| [数组 reduce 展平](JavaScript/Array-case/reduce-case/flat.js)                           | reduce 细分 |
| [数组 reduce 对象数组去重](JavaScript/Array-case/reduce-case/objectArr-de-duplicate.js) | reduce 细分 |

### Promise

| 题目                                                                 | 备注                            |
| -------------------------------------------------------------------- | ------------------------------- |
| [批量请求-并发限制](JavaScript/Promise-case/multiRequest/index.html) |                                 |
| [PromiseAll](JavaScript/Promise-case/PromiseAll.js)                  |                                 |
| [PromiseRace](JavaScript/Promise-case/PromiseRace.js)                |                                 |
| [Promise 定时器](JavaScript/Promise-case/timeoutControl.js)          |                                 |
| [超时重传](JavaScript/Promise-case/timeoutRetry.js)                  |                                 |
| [重复执行函数](JavaScript/Promise-case/repeatFn.js)                  | 涉及了一个 Promise 封装的定时器 |

### 原型与继承

| 题目                                                                   | 备注 |
| ---------------------------------------------------------------------- | ---- |
| [原型链继承](JavaScript/Inheritance/01-prototype.js)                   |      |
| [盗用构造函数继承](JavaScript/Inheritance/02-stealing.js)              |      |
| [组合继承](JavaScript/Inheritance/03-combination.js)                   |      |
| [原型式继承](JavaScript/Inheritance/04-prototypal.js)                  |      |
| [寄生式继承](JavaScript/Inheritance/05-parasitic.js)                   |      |
| [寄生式组合继承](JavaScript/Inheritance/06-parasiticAndCombination.js) |      |
| [class 继承](JavaScript/Inheritance/07-class.js)                       |      |
| [new 实现](JavaScript/Inheritance/08-new.js)                           |      |
| [instanceOf 实现](JavaScript/Inheritance/09-instancof.js)              |      |
| [bind 实现](JavaScript/Inheritance/bind/final-bind.js)                 |      |

### 递归

| 题目                                                         | 备注 |
| ------------------------------------------------------------ | ---- |
| [柯里化](JavaScript/Recursive-case/curry-fn.js)              |      |
| [循环引用判断](JavaScript/Recursive-case/cycle-object.js)    |      |
| [简易深拷贝](JavaScript/Recursive-case/deep-copy.js)         |      |
| [json 数据深度统计](JavaScript/Recursive-case/json-depth.js) |      |

### Vue 相关

| 题目                                                                   | 备注 |
| ---------------------------------------------------------------------- | ---- |
| [响应式概念](Vue/reactive/01-reactive-basic-concept/main.js)           |      |
| [注册副作用函数](Vue/reactive/02-effectFn-wrapper/main.js)             |      |
| [关联属性与副作用函数](Vue/reactive/03-bind-key-with-effectFn/main.js) |      |
| [执行前清除副作用](Vue/reactive/04-cleanup-before-run/main.js)         |      |
| [嵌套 Effect](Vue/reactive/05-nest-effect/main.js)                     |      |
| [避免无限递归](Vue/reactive/06-avoid-infinite-recursion/main.js)       |      |
| [调度器](Vue/reactive/07-schedule/main.js)                             |      |
| [计算属性](Vue/computed/main.js)                                       |      |
| [wacth](Vue/watch/base-watch/main.js)                                  |      |
| [立即执行 watch](Vue/watch/immediate-watch/main.js)                    |      |
| [渲染器](Vue/renderer/01-base-renderer-case/main.js)                   |      |
| [原生 v-model](Vue/directive/v-model.html)                   |      |

### 设计模式

| 题目                                     | 备注 |
| ---------------------------------------- | ---- |
| [观察者模式](DesignPatterns/observer.js) |      |
| [单例模式](DesignPatterns/singleton.js)  |      |

### 有趣的场景

| 题目                                                        | 备注                         |
| ----------------------------------------------------------- | ---------------------------- |
| [画格子-逆序擦除](FunCase/paint%26clean/paint%26clean.html) | 画六个格子，画完自动倒序擦除 |
| [链式 query](FunCase/database-queryFn/index.js)             |                              |
| [url 解析](FunCase/parse-url/index.js)                      |                              |
| [柯里 Sum 函数](FunCase/sum-curry-liked/index.js)           |                              |

### 杂项

| 题目                                                           | 备注 |
| -------------------------------------------------------------- | ---- |
| [防抖节流](JavaScript/Other-case/debounce-throttle/index.html) |      |
| [跨域 jsonp](JavaScript/Other-case/jsonp/index.html)           |      |
| [图片懒加载](JavaScript/Other-case/lazy-load/index.html)       |      |
