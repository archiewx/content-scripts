/*
https://leetcode.cn/problems/3sum-closest/
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  const val = nums[0] + nums[1] + nums[2];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let l = i + 1;
    let r = nums.length;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      const diff = target - sum;
      if (Math.abs(diff) < Math.abs(target - val)) {
        val = sum;
      }
      // 这里就是偏大
      if (diff > 0) {
        r--;
      } else if (diff < 0) {
        l ++;
      } else {
        return val;
      }
    }
  }
};

console.log(threeSumClosest([-1, 2, 1, -4], 1));

function three(nums) {
  for(let m = 0; m < nums.length; m ++) {
    if (m > 0 && nums[m] === nums[m - 1]) continue;
    for (let n = 0; n < nums.length; n ++) {
      if (n > 0 && nums[n] === nums[n - 1] ) continue;
      for (let y = 0; y < nums.length; y ++) {
        if (y > 0 && nums[y] === nums[y - 1]) continue;
        console.log(nums[m], nums[n], nums[y]);
      }
    }
  }
}