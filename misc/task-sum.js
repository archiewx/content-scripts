const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

function taskSumAsync(delay, fn) {
  const taskQueue = [{ delay, fn }];
  const obj = {
    task(delay, fn) {
      taskQueue.push({ delay, fn });
      return obj;
    },
  };
  const invokeQueue = async (delay) => {
    while (taskQueue.length) {
      const { fn, delay } = taskQueue.shift();
      await wait(delay);
      fn();
    }
  };
  invokeQueue(delay);
  return obj;
}

function taskSum(delay, fn) {
  const invokeQueue = [{ delay, fn }];
  const waitQueue = []
  const obj = {
    task(delay, fn) {
      waitQueue.push({ delay, fn })
      return obj
    }
  }

  const invoke = function() {
    const { fn, delay } = invokeQueue.shift()
    setTimeout(() => {
      fn()
      if (waitQueue.length) {
        invokeQueue.push(waitQueue.shift())
        invoke()
      }
    }, delay)
  }
  invoke()

  return obj
}

taskSum(1000, () => {
  console.log(1);
})
  .task(1200, () => {
    console.log(2);
  })
  .task(1300, () => {
    console.log(3);
  })
  .task(500, () => {
    console.log(4);
  });
