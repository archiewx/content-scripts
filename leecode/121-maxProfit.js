// https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/

/*
给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。
返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。

输入：[7,1,5,3,6,4]
输出：5
解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。

输入：prices = [7,6,4,3,1]
输出：0
解释：在这种情况下, 没有交易完成, 所以最大利润为 0。

提示：
1 <= prices.length <= 105
0 <= prices[i] <= 104

状态方程:
m,n 代表买入/卖出日子, m > n
v[n/m] 代表第n或m天的价值
f[m][n], 代表第m天买入，第n天卖出的最大价值

f[m][n] = v[m] - min(n, ... m-2, m-1)
*/

/**
 * 
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let min = Number.MAX_SAFE_INTEGER, max = 0, m = 0;
  while(m < prices.length) {
    min = Math.min(prices[m], min);
    max = Math.max(max, prices[m] - min);
    m ++;
  }
  return max
};

console.log(maxProfit([7,1,5,3,6,4]))

/*
https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/

给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格。
在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以先购买，然后在 同一天 出售。
返回 你能获得的 最大 利润 。

示例 1：

输入：prices = [7,1,5,3,6,4]
输出：7
解释：在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4 。
     随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6 - 3 = 3 。
     总利润为 4 + 3 = 7 。
示例 2：

输入：prices = [1,2,3,4,5]
输出：4
解释：在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4 。
     总利润为 4 。
示例 3：

输入：prices = [7,6,4,3,1]
输出：0
解释：在这种情况下, 交易无法获得正利润，所以不参与交易可以获得最大利润，最大利润为 0 。
 

提示：

1 <= prices.length <= 3 * 104
0 <= prices[i] <= 104

状态方程：
i: 天数
dp[天数][持有股票状态]
dp[i][0]: 第i天不持有股票
dp[i][1]: 第i天持有只股票
dp[i][0] > dp[i][1]: 不持有股票的利润大于持有股票的利润
dp[i][0] = max{dp[i - 1][0], dp[i - 1][1] + prices[i]}
dp[i][1] = max{dp[i - 1][1], dp[i - 1][0] - prices[i]}
特别的: dp[0][0] = 0, dp[0][1] = -prices[0]
*/
/**
 * @param {number[]} prices
 * @return {number}
 */
 var maxProfit2 = function(prices) {
  let dp = Array(prices.length).fill(0).map(v => []);
  dp[0][0] = 0;
  dp[0][1] = -prices[0];
  let n = 1;
  while(n < prices.length) {
    dp[n][0] = Math.max(dp[n-1][0], dp[n-1][1] + prices[n]);
    dp[n][1] = Math.max(dp[n-1][1], dp[n-1][0] - prices[n]);
    n ++;
  }
  return dp[prices.length - 1][0];
}
console.log(maxProfit2([1,2,3,4,5]));
var maxProfit21 = function(prices) {
  let dp0 = 0, dp1 = -prices[0]
  let n = 1;
  while(n < prices.length) {
    dp0 = Math.max(dp0, dp1 + prices[n]);
    dp1 = Math.max(dp1, dp0 - prices[n]);
    n ++;
  }
  return dp0;
}
console.log(maxProfit21([1,2,3,4,5]))

/**
 * https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iii/
 * 状态：f[天数][持股状态][买卖次数]
 * 1. 一次没买 f[i][0][0] = 0
 * 2. 买了一次: 之前买的或者第i天买的 f[i][1][0] = max{f[i-1][1][0],  -prices[i]}
 * 3. 买了一次卖了一次 f[i][0][1] = max{f[i-1][0][0], f[i][1][1] + prices[i]}
 * 4. 完成第一次操作，第二次买: f[i][1][2] = max{f[i-1][1][2], f[i-1][0][1] - prices[i]}
 * 5. 完成了两次操作: f[i][0][2] = max{f[i-1][0][2], f[i-1][1][1] + prices[i]}
 * 实际执行过程中，当前状态量只和第一次买，第一次卖，第二次买，第二次卖有关系，这四个状态重新命名: b[i]1, s[i]1, b[i]2, s[i]2
 * b[i]1 = max(b[i-1]1, -prices[i])
 * s[i]1 = max(s[i-1]1, b[i-1]1 + prices[i])
 * b[i]2 = max(b[i-1]2, s[i-1]1 - prices[i])
 * s[i]2 = max(s[i-1]2, b[i-1]2 + prices[i])
 * @param {number[]} prices
 * @return {number}
 */
 var maxProfit3 = function(prices) {
  let n = 1, b1 = -prices[0], b2 = -prices[0], s1 = 0, s2 = 0;
  while(n < prices.length) {
    b1 = Math.max(b1, -prices[n])
    s1 = Math.max(s1, b1 + prices[n])
    b2 = Math.max(b2, s1 - prices[n])
    s2 = Math.max(s2, b2 + prices[n]);
    n++;
  }
  return s2;
}

console.log('maxProfit3', maxProfit3([3,3,5,0,0,3,1,4]))