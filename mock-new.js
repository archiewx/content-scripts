/**
 * 按照mdn规范
 * 创建一个空的简单JavaScript对象（即{}）；
 * 链接该对象（即设置该对象的构造函数）到另一个对象 ；
 * 将步骤1新创建的对象作为this的上下文 ；
 * 如果该函数没有返回对象，则返回this。
 * @param  {...any} args 
 */
function mockNew(...args) {
  const Constructor = args[0];
  const object = Object.create(Constructor.prototype);
  const params = args.slice(1);
  const ret = Constructor.apply(object, params);
  return ret || object;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

const pe = mockNew(Person, '战三', 23)
console.log(pe);
