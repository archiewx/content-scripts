function jumpFloorII(number) {
  if (number === 0) return 0;

  if (number === 1) return 1;

  // 状态房产 f(number) = 2 * f(number - 1)
  return 2 * jumpFloorII(number - 1);
}

console.log(jumpFloorII(20))

function jumpFloorII1(number) {
  var jumpFlr = 1
  while(--number) {
    jumpFlr *= 2
  }

  return jumpFlr
}

console.log(jumpFloorII1(20))
console.log(Math.pow(2, 20 - 1))
