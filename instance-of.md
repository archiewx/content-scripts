# instance-of 判断机制

## 原理

`object instanceof ObjectConstructor` 操作符用来判断 `object` 上是否有 `ObjectConstructor` 的原型链。代码表示:

```js
function mockInstanceOf(object, constructor) {
  return constructor.prototype ? constructor.prototype.isPrototypeOf(object) : false;
}

class Person {}
const p = new Person();

console.log(mockInstanceOf(p, Person)); // true
console.log(p instanceof Person); // true
```

上面使用 `Object.prototype.isPrototypeOf(targetObject)` 方法，判断当前对象是否存在目标对象的原型链上。

而 `instanceof` 和上面不同的是需要得到构造函数的原型链，`构造函数原型链` 存在目标对象的原型链上才能判断 instanceOf 的
bool 值

## 例外情况

- `Object.create(null)` 创建的对象， 使用 `object instanceof Object` => false
- 字面量申明的: 字符串，数字，布尔值
- 使用 `__proto__`， 操作 `__proto__` 来修改原型链 (PS: `__proto__` 是对内部属性 `[[Prototype]]` 属性操作，设置该属性是
  一个缓慢的操作，为了性能应该避免使用该属性)
- 页面跨窗口通信, 传递` remoteArray instanceof Array` => false
- `Symbol('xx') instanceof Symbol`  => false 
