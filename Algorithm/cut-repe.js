// 动态规划
function cutRope(number) {
  const array = [];

  array[0] = 0;
  array[1] = 1;

  for (let m = 1; m <= number; m++) {
    if (m === number) array[m] = 1;
    else array[m] = m;
    for (let n = 1; n < m; n++) {
      // 转移方程 f[n] = max{f[n], f[m] * f[n-m]}
      // 解释: 长度为n 的绳子最大乘值是 当前绳子长度值与 m长的绳子的值和n-m绳子最长的值成绩
      array[m] = Math.max(array[m], array[n] * array[m - n]);
    }
  }

  console.log(array);
  return array[number];
}
console.log(cutRope(8));

// 贪心算法
function cutRope1(number) {
  if (number === 2) return 1;

  if (number === 3) return 2;

  var x = number % 3;
  var y = Math.floor(number / 3);

  if (x === 0) return Math.pow(3, y);
  else if (x === 1) return 2 * 2 * Math.pow(3, y - 1);
  else return 2 * Math.pow(3, y);
}
