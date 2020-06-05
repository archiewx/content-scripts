window.requestIdleCallback =
  window.requestIdleCallback ||
  function (callback) {
    const start = Date.now();
    // 这里polyfill 最少延迟1s后执行，判断当前时间是否在50ms以内
    return setTimeout(() => {
      callback({
        didTimeout: false,
        timeRemaining() {
          return Math.max(0, 50 - (Date.now() - start));
        },
      });
    }, 1);
  };
