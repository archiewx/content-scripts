// Fibonacci 斐波拉契数列
// 0 1 1 2 3 5 8 12 ...

// 递归解决方式 a(n) = a(n-1) + a(n-2)
// 把 n分解成 小单元递归解决问题
function fibonacci(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));

// 动态规划
// 这里思路，从最简单问题单元可以解决,一直得到整体内容
function fibonacci1(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  let a = 0, b = 1
  for (let i = 2; i <= n; i++) {
    b = a + b 
    a = b - a
  }
  return b
}
console.log(fibonacci1(10))

