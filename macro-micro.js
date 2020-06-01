function testMicroAndMacro() {
  // macro task
  setTimeout(() => {
    console.log('log timeout1');
  }, 0);

  // promise 执行初始化阶段，按照同步执行
  const promise1 = new Promise((resolve) => {
    console.log('log-promise1');
    resolve('promise1');
  });

  // 在主线程内和setTimeout不定顺序，受当前系统执行应用资源和线程性能影响
  // 在该示例node-v12.x版本情况下。setTimeout总是优先于setImmediate执行
  setImmediate(() => {
    console.log('log immediate');
  });

  // 这个比较特殊
  (async () => {
    // 这里同步执行
    console.log('async start');

    // 这里按照微任务执行,且微任务等级低于async函数外微任务
    const v = await promise1;
    console.log(v);
  })();

  // micro-task
  promise1.then((v) => {
    console.log('log-promise1-then', v);
  });

  console.log('log end');

  // macro-task
  setImmediate(() => {
    console.log('immediate-1');
    // micro-task
    Promise.resolve(232).then((v) => console.log('immediate promise', v));

    process.nextTick(() => {
      console.log('setimmediate nexttick');
    });
  });

  // macro-task
  setTimeout(() => {
    console.log('timeout-1');
    // micro-task
    Promise.resolve(232).then((v) => console.log('settimeout promise', v));
    process.nextTick(() => {
      console.log('setimmediate nexttick');
    });
  }, 0);

  require('fs').readFile(__filename, () => {
    // 在nodejs中属于一次i/o周期, 在一次i/o周期内，setTimeout总是比setimmediate晚执行

    setTimeout(() => {
      console.log('timeout-2');
    }, 0);
    setImmediate(() => {
      console.log('immediate-2');
    });
  });

  // 在第一次宏任务执行完成后，微任务执行前执行
  process.nextTick(() => {
    console.log('tick');
  });
}

// 如果不断给微任务插入微任务，任务是不是就不会结束
// 严格按照事件循环，不断清空前一次堆栈后再次执行下一次循环。微任务总是在当次宏任务执行完成后执行。
function test2() {
  console.log(1);
  setTimeout(() => {
    let i = 100;
    while (--i > 0) {
      Promise.resolve(i).then((v) => {
        console.log(v);
      });
    }
  }, 200);

  let i = 0;
  while (i++ < 100) {
    console.log(i);
  }
}

test2();
