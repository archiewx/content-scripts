/*
 * @Date: 2019-10-22 19:54:45
 * @Last Modified time: 2019-10-22 19:54:45
 * 深拷贝
 */

const objectTag = '[object Object]';
const arrayTag = '[object Array]';
const dateTag = '[object Date]';
const mapTag = '[object Map]';

const getTag = (o) => Object.prototype.toString.call(o);

function deepCopy(o) {
  if (typeof o !== 'object') return o;

  const object = {};

  for (const key in o) {
    const element = o[key];

    if (element && typeof element === 'object') {
      const tag = getTag(element);
      const Ctor = element.constructor
      switch (tag) {
        case arrayTag:
        case objectTag:
          object[key] = deepCopy(element);
          break
        case dateTag:
          object[key] = new Ctor(+element)
          break
        case mapTag:
          const map = new Ctor
          element.forEach((subValue, key) => {
            map.set(key, deepCopy(subValue))
          })
          object[key] = map
        default:
          break;
      }
    } else object[key] = element;
  }
  return object;
}

const o = {
  a: 2,
  b: '2',
  c: { say: 'hello world' },
  d: null,
  e: undefined,
  f: function() {
    console.log('Good');
  },
  g: Infinity,
  symbol: Symbol('hello'),
  dd: new Date(),
  cc: new Map([['a', 2]]),
};
o.ff = o

console.log(o);
const o1 = deepCopy(o);
console.log(o1);
console.log(o.dd === o1.dd, o.cc === o1.cc)
