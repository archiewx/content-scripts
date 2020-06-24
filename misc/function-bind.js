/*
 * @Date: 2019-10-31 13:14:51
 * @Last Modified time: 2019-10-31 13:14:51
 */

const testObj = {
  a: 3,
  b: function(...args) {
    console.log(args || this.a);
  },
};
// testObj.b()
// testObj.b(23)
// const c = testObj.b
// c()
// c(23)
// const c1 = testObj.b.bind(testObj, 50)
// c1(70)
// console.log(c1.length);

/**
 * 这里不同的bind 是内部不应该包含: prototype以及内部属性[[Scope]]、[[Code]]、[[FormalParameters]]
 */
Function.prototype.bind2 = function bind2(thisArgs) {
  const aArgs = Array.prototype.slice.call(arguments, 1);
  const fThis = this;
  const fNOP = function() {};
  const fBound = function() {
    console.log('fBound', this instanceof fBound)
    // 这段判断是不是使用bind返回函数继续bind,主要用来使用new的
    return fThis.apply(this instanceof fBound ? this : fThis, aArgs.concat(Array.prototype.slice.call(arguments)));
  };
  // this === Function.prototype
  if (this.prototype) fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};

const c1 = testObj.b.bind(testObj, 23, 32);
const c2 = testObj.b.bind2(testObj, 23, 32);
c1(50);
c2(50);
const c3 = new c2(200)
console.log(c3)

