// 观察者模式

class Observer {
  constructor(key, v) {
    this._preValue = undefined;
    this._value = v;
    this._key = key
    this.listeners = [];
  }

  set value(v) {
    this._preValue = this.value;
    this._value = v;
    this.notify();
  }

  get value() {
    return this._value;
  }

  addDep(fn) {
    this.listeners = this.listeners.concat(fn);
  }

  notify() {
    this.listeners.forEach((listener) => listener(this._key, this._preValue, this.value));
  }
}

const obj = {
  a: 1,
  b: 2,
};

const callback = (key, oldValue, value) => {
  console.log(key, oldValue, value);
};

const deps = []

Object.keys(obj).forEach(function (key) {
  let value = obj[key];
  const observer = new Observer(key, value);
  observer.addDep(callback);
  deps.push(observer)
  Object.defineProperty(obj, key, {
    set(v) {
      observer.value = v;
      value = v;
    },
    get() {
      return value;
    },
  });
});

deps.forEach((dep) => dep.notify())
obj.a = 20
obj.b = 200
