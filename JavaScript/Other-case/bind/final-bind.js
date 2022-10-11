Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new Error(`${this}.bind is not a function`)
  }
  const self = this

  const fBound = function () {
    return self.apply(
      this instanceof fBound ? this : context,
      args.concat(...arguments)
    )
  }

  if (self.prototype) {
    fBound.prototype = Object.create(self.prototype)
  }
  return fBound
}
