function jumpFloorII(number) {
  if (number === 0) return -1;

  if (number === 1) return 1;

  // 状态房产 f(number) = 2 * f(number - 1)
  return 2 * jumpFloorII(number - 1);
}

console.log(jumpFloorII(20))
