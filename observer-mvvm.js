// 观察者
class Observer {
  constructor(key, v) {
    this._preValue = undefined;
    this._value = v;
    this._key = key;
    this.watchers = [];
  }

  set value(v) {
    this._preValue = this.value;
    this._value = v;
    this.notify();
  }

  get value() {
    return this._value;
  }

  static watch(obj, key, callback) {
    let v = obj[key];
    Object.defineProperty(obj, key, {
      get() {
        return v;
      },
      set(value) {
        if (value === v) {
          return;
        }
        v = value;

        callback && callback();
      },
    });
  }

  addDep(fn) {
    this.watchers = this.watchers.concat(fn);
  }

  notify() {
    this.watchers.forEach((watcher) => watcher.update());
  }
}

// 订阅者
class Watcher {
  constructor({ vm, attr, callback }) {
    this.vm = vm;
    this.attr = attr;
    this.callback = callback;
    this.update();
  }

  update() {
    this.callback(pickObject(this.vm.data, this.attr));
  }
}

// 核心实现
class SimpleVue {
  constructor({ data, el, methods }) {
    this.deps = [];
    this.binding = {};
    this.el = el;
    this.data = data;
    this.methods = methods;
    // 初始化响应式数据
    this.defineReactiveData(this.data);
    // 编译模板
    this.compile();
  }

  compile() {
    const children = this.el.children;
    const ctx = this;
    for (let childIndex = 0; childIndex < children.length; childIndex++) {
      const node = children[childIndex];
      const innerText = node.innerText;
      // 获取所有待替换的模板单元
      const matches = node.innerText.match(/{{([^{}]+)}}/g);
      if (matches && matches.length) {
        // 后续在遍历matches 时候以为闭包原因，锁住了innerText值始终是模板的值
        node.bindingAttributes = [];
        matches.forEach((matchText) => {
          const attr = matchText.match(/{{([^{}]+)}}/)[1];
          node.bindingAttributes.push(attr);
          // 进行模板替换
          const updater = function (v) {
            let compiledText = innerText.replace(new RegExp('{{' + attr + '}}', 'g'), v);
            node.bindingAttributes.forEach((cacheAttr) => {
              if (cacheAttr !== attr) {
                compiledText = compiledText.replace(RegExp(`{{${cacheAttr}}}`), pickObject(ctx.data, cacheAttr));
              }
            });
            node.innerText = compiledText;
          };
          updater(pickObject(ctx.data, attr));

          // 添加watcher，订阅单个属性改变
          ctx.binding[attr].texts.addDep(new Watcher({ vm: ctx, attr, callback: updater }));
        });
      }

      // 获取元素所有的属性名称
      const attributes = node.getAttributeNames();
      for (let attrIndex = 0; attrIndex < attributes.length; attrIndex++) {
        const attr = attributes[attrIndex];
        // 获取单个节点的属性标签
        const attrData = node.getAttribute(attr);

        if (/v-model:([^=]+)/.test(attr)) {
          const domAttr = RegExp.$1;
          const updater = function (v) {
            node[domAttr] = attrData;
          };
          ctx.binding[attrData].directives.addDep(
            new Watcher({
              vm: ctx,
              attr: attrData,
              callback: updater,
            })
          );
        } else if (attr === 'v-model' && (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA')) {
          const updater = function (v) {
            node.value = v;
          };
          ctx.binding[attrData].directives.addDep(
            new Watcher({
              vm: ctx,
              attr: attrData,
              callback: updater,
            })
          );

          node.addEventListener('input', function (evt) {
            const el = evt.target;
            ctx.data[attrData] = el.value;
          });
        } else if (/v-on:([^=]+)/.test(attr)) {
          const event = RegExp.$1;
          const evtHandlerName = attrData;
          node.addEventListener(event, function (evt) {
            ctx.methods[evtHandlerName] && ctx.methods[evtHandlerName].call(ctx.data, evt);
          });
        }
      }
    }
  }

  defineReactiveData(data, parentKey = '') {
    const ctx = this;
    const prefixKey = (key) => (parentKey ? `${parentKey}.${key}` : key);
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        let v = data[key];

        this.binding[prefixKey(key)] = {
          directives: new Observer(),
          texts: new Observer(),
        };

        if (typeof v === 'object') ctx.defineReactiveData(v, key);
        else {
          Observer.watch(data, key, function () {
            ctx.binding[prefixKey(key)].directives.notify();
            ctx.binding[prefixKey(key)].texts.notify();
          });
        }
      }
    }
  }
}

// keyPath=a.b.c
function pickObject(object, keyPath = '') {
  const keyArray = keyPath.split('.');
  let current = object[keyArray.shift()];
  while (keyArray.length) {
    if (typeof current === 'undefined' || current === null) return undefined;

    const key = keyArray.shift();
    current = current[key];
  }

  return current;
}
