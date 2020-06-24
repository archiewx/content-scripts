window.requestAnimationFrame =
  window.requestAnimationFrame ||
  function (callback) {
    // 该功能浏览器在下一帧执行改回调，浏览器执行回调1s/60，也就是 1000/60 ~= 16.66ms
    return setTimeout(callback, 1000 / 60);
  };
