// 动态规划
function cutRope(number) {
  const array = [];

  array[0] = 0;
  array[1] = 1;

  for (let m = 1; m <= number; m++) {
    if (m === number) array[m] = 1;
    else array[m] = m;
    for (let n = 1; n < m; n++) {
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
