/**
 * https://leetcode.cn/problems/longest-substring-without-repeating-characters/
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 */
/*
输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
*/

/**
解题思路
1. 不含有重复字符
2. 最长子串
找到最长的子串，如果有重复字符，则更新子串的起始位置
* 通过map的方式，存下每一个字符串的位置，使用object也可以
* 使用start/end记录起始位置和结束位置
* end 每次都次循环都会更新
* start 当存在重复字符时，更新start, 比如: abca，存在字符a，则后面bca组成相等长度的相同子串
* 最后比较max和 end - start + 1 取更大得值
*/
// 时间复杂度: O(n), 空间复杂度: O(log(n))
const lengthOfLongestSubstring = function (s) {
  if (!s.length) return 0;

  let max = 0;
  let start = 0;
  let end = 0;
  let map = new Map();
  while (end < s.length) {
    if (map.get(s[end]) >= start) {
      start = map.get(s[end]) + 1;
    }
    map.set(s[end], end);
    max = Math.max(max, end - start + 1);
    end++;
  }
  return max;
};

const lengthOfLongestSubstring2 = function (s) {
  if (!s.length) return 0;

  const cache = [];
  let max = 0;
  for (let i = 0; i < s.length; i++) {
    while(cache.includes(s[i])) {
      cache.shift();
    }
    cache.push(s[i])
    max = Math.max(max, cache.length);
  }
  return max;
};

console.log(lengthOfLongestSubstring('abcabcbb'));
console.log(lengthOfLongestSubstring2('bbbbb'));
console.log(lengthOfLongestSubstring2('pwwkew'));
console.log(lengthOfLongestSubstring2('abba'));
