class Singleton {
  constructor(name) {
    this.name = name
    this.instance = null
  }

  static getInstance(name) {
    if (!this.instance) this.instance = new Singleton(name)
    return this.instance
  }
}
const oA = Singleton.getInstance('single1')
const oB = Singleton.getInstance('single2')

console.log(oA === oB) // true
console.log(oB.name) // stay the same
