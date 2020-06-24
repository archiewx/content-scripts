function* test() {
  yield 1;
  yield 2;
  yield 3;
  const a = yield Promise.resolve(20);
  console.log(a);
}

/**
 * GeneratorFunction 中调用next， next的参数代表上一次迭代的最终结果, 即将yield xx 整体表示的值为这个
 */

/**
 *
 * @param {GeneratorFunction} gen
 */
function runGenerator(gen) {
  const g = gen();

  function next(data) {
    const result = g.next(data);
    if (result.done) {
      return result.value;
    }

    if (result.value instanceof Promise) {
      result.value.then(function (data) {
        next(data);
      });
    } else next(result.value);
  }

  next();
}

const gen = function* () {
  console.log(1);

  const b = yield Promise.resolve(Math.random()).then((v) => {
    console.log(v);
    return 100 * Math.random();
  });

  yield Promise.resolve(b).then((v) => console.log(v));

  console.log(3);
};

// co 最终返回的都是Promise
// co 内的yield 只接收 thunk函数或者Promise
function simpleCo(gen) {
  const ctx = this;
  return new Promise(function (resolve, reject) {
    if (typeof gen === 'function') gen = gen.call(ctx);

    if (!gen || typeof gen.next !== 'function') return resolve(gen);

    // 内部自执行函数
    function next(ret) {
      if (ret.done) return resolve(ret.value);

      // 特意将数据转化成Promise
      // 这一步，如果继续是Generator函数，可以递归调用simpleCo
      // https://github.com/tj/co/blob/249bbdc72da24ae44076afd716349d2089b31c4c/index.js#L116
      const v = Promise.resolve(ret.value);
      return v.then(onFulfilled, onRejected);
    }

    // 错误执行
    function onRejected(err) {
      reject(err);
    }

    // 正确执行
    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (error) {
        reject(error);
      }

      next(ret);
    }

    // 第一步启动函数
    onFulfilled();
  });
}

simpleCo(function* () {
  const v = yield Promise.resolve(10);
  console.log(v);
});

runGenerator(function* () {
  const v = yield Promise.resolve(20);
  console.log(v);

  const v1 = yield Promise.resolve(30)
  console.log(v1)
});

runGenerator(gen)
