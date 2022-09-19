class A {
  values = [];

  add(v) {
    this.values.push(v);
    return this;
  }

  *[Symbol.iterator]() {
    for (let index = 0; index < this.values.length; index++) {
      const element = this.values[index];
      yield element;
    }
  }
}

const b = {
  a: 1,
  b: 2,
  c: 3
};
b[Symbol.iterator] = function* () {
  const keys = Object.keys(b);
  for (let index = 0; index < keys.length; index++) {
    const element = b[keys[index]];
    yield { k: keys[index], v: element };
  }
};
for (const iterator of b) {
  console.log(iterator); 
}

const a = new A();
a.add(1).add(2).add(3).add(4);
for (const iterator of a) {
  console.log(iterator); 
}
