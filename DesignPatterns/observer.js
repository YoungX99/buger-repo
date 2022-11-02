class Observable {
  constructor() {
    this.observers = []
  }

  subscribe(func) {
    this.observers.push(func)
  }

  unsubscribe(func) {
    this.observers = this.observers.filter((observer) => observer !== func)
  }

  notify(data) {
    this.observers.forEach((observer) => observer(data))
  }
}

const observable = new Observable()
function log() {
  console.log('yes')
}
function bug() {
  console.log('bug')
}

observable.subscribe(log)
observable.subscribe(bug)
observable.notify()
console.log('-'.repeat(10));
observable.unsubscribe(bug)
observable.notify()
