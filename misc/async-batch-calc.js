function asyncAdd(a, b) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a + b);
    }, 1000 * Math.random());
  });
}

// 分组批量处理+缓存
const cache = new Map();

function setCache(a, b, s) {
  if (cache.has(a)) {
    const bCache = cache.get(a);
    if (!bCache.has(b)) bCache.set(b, s);
  }
  const bCache = new Map();
  bCache.set(b, s);
  cache.set(a, bCache);
}

function getCache(a, b) {
  if (cache.has(a) && cache.get(a).has(b)) {
    return cache.get(a).get(b);
  }
  return null;
}
/**
 * @param  {number[]} args
 */
async function sum(...args) {
  if (args.length <= 1) return args[0];

  if (args.length <= 2) {
    const [a, b] = args;
    if (getCache(a, b)) return getCache(a, b);

    const s = await asyncAdd(a, b);
    setCache(a, b, s);
    return s;
  }
  const invokeQueue = args.slice(0, 2);
  let total = 0;
  let isFinish = 0;
  const waitQueue = args.slice(2);
  return new Promise((resolve) => {
    const checkResolve = () => {
      if (isFinish >= Math.floor(args.length / 2)) resolve(total);
      isFinish++;
    };

    const runTask = () => {
      if (invokeQueue.length <= 1) {
        total += invokeQueue.pop() || 0;
        checkResolve();
        return;
      }

      const [a, b] = [invokeQueue.shift(), invokeQueue.shift()];
      if (getCache(a, b) || getCache(a, b) === 0) {
        total += getCache(a, b);
        checkResolve();
      } else {
        asyncAdd(a, b).then((st) => {
          total += st;
          setCache(a, b, st);
          checkResolve();
        });
      }
      if (!waitQueue.length) return;

      const da = waitQueue.shift();
      if (da) invokeQueue.push(da);
      const db = waitQueue.shift();
      if (db) invokeQueue(db);
      runTask();
    };
    runTask();
  });
}

async function main() {
  const s1 = await sum(1, 2, 3);
  const s2 = await sum(1, 2);
  const s3 = await sum(1, 2);
  console.log(s1, s2, s3);
}
main();
