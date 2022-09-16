/**
 * @filename override
 * JS 实现函数重载的能力
 */

function implOverride(handlerName, ...handlers) {
  const adapter = {};
  while(handlers.length) {
    const oldHandler = adapter[handlerName];
    const handler = handlers.shift(); 
    adapter[handlerName] = (...args) => {
      if (args.length === handler.length) {
        return handler.call(this, ...args);
      } else {
        if (oldHandler) return oldHandler.call(this, ...args);

        throw new Error(`not impl method of ${handlerName}`)
      }
    }
  }
  return adapter[handlerName];
}

function get(a) {
  return a;
}
function getTwo(a, b) {
  return (a + b) * 2;
}
function getMany(a, b, c) {
  return (a + b + c) * 3;
}

const find = implOverride("find", get, getTwo, getMany);

console.log(find(1));
console.log(find(1, 1));
console.log(find(1, 1, 1));
console.log(find(1, 1, 1, 1));
