function Parent(name, age) {
  this.name = name;
  this.age = age;
}

function Child() {
  this.say = function () {
    console.log(this.name, this.age);
  };
}

// babel inherits
function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

// 原型链继承
// 1.无法得到Child的构造函数，
// 2.在 `this.prototype = new ParentCtor(...args);` 之前的原型链方法被覆盖, 无法传参,
// 3. 共享父级所有原型链方法
// 4.无法多继承
function inherits1(P, C) {
  C.prototype = new P();
}
inherits1(Parent, Child);

var child = new Child();
child.say();

// 子构建函数继承
// 1. 缺点只能实例和方法， 原型链方法无法继承 2. 性能问题，每个子类都有父类的副本
function Child1(name, age, score) {
  Parent.call(this, name, age);
  this.score = score;
}

// 组合继承(原型链+构造函数)
// 缺点，调用两次Parent实例化
function Child2(name, age, score) {
  Parent.call(this, name, age);
  this.score = score;
}
Child2.prototype = new Parent();
// 恢复child的构造函数
Child2.prototype.constructor = Child2;

// 组合继承 - 解决多次调用
function Child3(name, age, score) {
  Parent.call(this, name, age); // 获取父级实例上所有方法和属性
  this.score = score;
}
// bug: 这一句会导致无法判断具体实例类型
Child3.prototype = Parent.prototype; // 获取原型链所有方法和属性
Child3.prototype.constructor = Child3; // 解决instanceof 判断问题
