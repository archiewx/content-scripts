/*
https://leetcode.cn/problems/hanota-lcci/
*/

/**
 *
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * 思路：参数代表A移动到C
 */
var hanota = function (A, B, C) {
  move(A.length, A, B, C);
};

function move(n, A, B, C) {
  if (n === 1) {
    C.push(A.pop());
  } else {
    move(n - 1, A, C, B);
    C.push(A.pop())
    move(n - 1, B, A, C);
  }
}

const A = [2, 1, 0];
const B = [];
const C = [];
hanota(A, B, C);
console.log('A', A)
console.log('B', B)
console.log('C', C)
