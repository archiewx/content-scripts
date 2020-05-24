/**
 *
 * @param {Function} fn
 */
function curry() {
  const args = Array.prototype.slice.apply(arguments);
  const fn = args[0];
  const params = args.slice(1);
  return function wrap() {
    params.push(...Array.prototype.slice.apply(arguments));
    // 如果参数结果参数个数相等的话，就返回结果
    if (fn.length > params.length) {
      return wrap;
    }
    return fn.apply(this, params);
  };
}

function add(a, b, c, d) {
  return a + b + c + d;
}
const currayAdd = curry(add)

console.log(currayAdd(1)(2)(3)(10))
