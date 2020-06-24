// 大数乘法
function multiply(num1 = "", num2 = "") {
  if (isNaN(num1) || isNaN(num2)) return 0;

  const sum = [];
  for (let m = num1.length - 1; m >= 0; m--) {
    for (let n = num2.length - 1; n >= 0; n--) {
      const i1 = m + n,
        i2 = m + n + 1;
      const mul = num1[m] * num2[n] + (sum[i2] || 0);
      sum[i1] = Math.floor(mul / 10) + (sum[i1] || 0);
      sum[i2] = mul % 10
    }
  }

  return sum.join('').replace(/^0+/, '')
}

console.log(multiply('99999', '10000'))

function add(num1 = "", num2 = "") {
  if (isNaN(num1) || isNaN(num2)) return 0;

  const len1 = num1.length,
    len2 = num2.length;

  const len = len1 > len2 ? len1 : len2;
  // 最大长度为，最大位数+1
  const sum = [];
  while (num1.length !== num2.length) {
    if (num1.length < num2.length) {
      num1 = "0" + num1;
    } else if (num1.length > num2.length) {
      num2 = "0" + num2;
    }
  }
  console.log(num1, num2);
  let pos = len;
  for (let m = len - 1; m >= 0; m--) {
    const n1 = num1[m] || 0;
    const n2 = num2[m] || 0;
    const v = Number(sum[pos] || 0) + Number(n1) + Number(n2);
    if (v >= 10) {
      const v1 = v % 10;
      sum[pos--] = v1;
      sum[pos] = Math.floor(v / 10);
    } else {
      sum[pos--] = v;
    }
  }

  return sum.join("");
}

console.log(add("1000", "999"));
console.log(add("1001", "999"));
console.log(
  add("99999999999999999999999999999", "99999999999999999999999999999")
);
