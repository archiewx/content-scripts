// 防抖, 在连续触发的 delay 时间内，只执行一次
function debounce(fn, delay) {
  let timer = null;
  return function () {
    const args = Array.prototype.slice.call(arguments, 0);
    const now = Date.now();
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const log = (...args) => console.log(...args);
const debounceLog = debounce(log, 300);
const delay = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

async function testDebounce() {
  for (let index = 0; index < 100; index++) {
    debounceLog(index);
    if (Math.floor(Math.random() * 1000) % 2 === 0) {
      await delay(200);
    }
  }
}

// 节流, 在连续触发的 时间内，每隔delay执行一次
function throttle(fn, delay) {
  let invokeAt = 0;
  let timer = null;
  return function () {
    const args = Array.prototype.slice.call(arguments, 0);
    if (timer) clearTimeout(timer)
    // 保证最后一次，当时间不够的时候也能触发一次
    timer = setTimeout(() => fn(...args), delay);
    if (Date.now() - invokeAt > delay) {
      fn(...args);
      invokeAt = Date.now();
    }
  };
}

const throttleLog = throttle(log, 500);
async function testThrottle() {
  for (let index = 0; index < 50; index++) {
    throttleLog(index);
    if (Math.floor(Math.random() * 1000) % 2 === 0) {
      await delay(200);
    }
  }
}
testThrottle();
