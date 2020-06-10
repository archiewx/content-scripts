// 一个人总共吹了253根蜡烛，它几岁了【一岁吹一根，两岁吹两根，依次类推】

// 动态规划
function blowCandle(number) {
  let i = 1,
    sum = 0;
  while (sum < number) {
    sum += i++;
  }
  // 以为上面多加了1
  return i - 1;
}

// 递归解决
function recursiveBlowCandle(number) {
  let num = 0;
  const run = function (number) {
    if (number <= 0) return num;
    return run(number - ++num);
  };
  run(number);
  return num
}

console.log(recursiveBlowCandle(253));

console.log(blowCandle(253));

function sum(number) {
  let sum = 0,
    i = 0;
  while (i <= number) {
    sum += i++;
  }
  return sum;
}

console.log(sum(22));
