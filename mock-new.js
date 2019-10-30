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
