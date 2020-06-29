/**
 * https://leetcode-cn.com/problems/palindrome-number/
 */

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  x = x + "";

  var len = x.length;
  var isOdd = len % 2 !== 0;

  var m = Math.floor(len / 2);
  var left = "";
  for (var n = 0; n < m; n++) {
    left += x[n];
  }

  var right = "";
  for (let n1 = len - 1; n1 > m - (isOdd ? 0 : 1); n1--) {
    right = right + x[n1];
  }
  return right === left;
};

console.log(isPalindrome(10));

var isPalindromeOptimize = function (x) {
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false

  var revertNumber = 0;
  while (x > revertNumber) {
    revertNumber = revertNumber * 10 + (x % 10);
    x = Math.floor(x / 10);
  }
  return x === revertNumber || x === Math.floor(revertNumber / 10);
};

console.log(isPalindromeOptimize(10));
