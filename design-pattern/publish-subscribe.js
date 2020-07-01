class EventEmitter {
  constructor() {
    this.queue = [];
  }

  on(key, fn) {
    const item = this.queue.find((item) => item.key === key);

    if (!item) {
      this.queue.push({ key, listeners: [fn] });
    } else {
      item.listeners.push(fn);
    }
  }

  off(key) {
    this.queue = this.queue.filter((item) => item.key === key);
  }

  once(key, fn) {
    const item = this.queue.find((item) => item.key === key);
    if (!item) this.queue.push({ key, tempListeners: [fn] });
    else {
      item.tempListeners = (item.tempListeners || []).concat(fn)
    }
  }

  emit(key, ...args) {
    this.queue
      .filter((item) => item.key === key)
      .forEach((item) => {
        if (item.listeners) item.listeners.forEach((listener) => listener(...args));

        while (item.tempListeners && item.tempListeners.length) {
          const tmpListener = item.tempListeners.pop();
          tmpListener(...args);
        }
      });
  }
}

const emitter = new EventEmitter();

emitter.on('hello', (...args) => {
  console.log('1-->', ...args);
});
emitter.on('hello', (...args) => {
  console.log('2-->', ...args);
});
emitter.once('say', (...args) => {
  console.log('3-->', ...args);
});

emitter.emit('hello', 'zs');

setTimeout(() => {
  emitter.emit('say', 'hello world');
  emitter.emit('say', 'hello world');
  emitter.emit('say', 'hello world');
emitter.emit('hello', 'zs');
emitter.emit('hello', 'zs');
emitter.emit('hello', 'zs');
}, 2000);
