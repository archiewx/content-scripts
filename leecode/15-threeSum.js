/*
https://leetcode.cn/problems/3sum/
*/
// 排序+双指针
var threeSum = function (nums) {
  if (nums.length < 3) return [];
  // if (nums.every(v => v === 0)) return [0, 0, 0];
  // if (nums.every(v => v > 0) || nums.every(v => v < 0)) {
  //   return [];
  // }
  let newNums = [];
  sort(nums);
  console.log(nums);
  for (let i = 0; i < nums.length; i++) {
      // 如果nums[i] 就 > 0 的话，那么就无法，根本无法组成 a+b+c=0的情况
    if (nums[i] > 0) break;

    // 如果i 与 i - 1 相等，说明之前的数字已经使用过了
    // 在 i-1 的时候，已经和后面的所有l,r组合过了。
    // 如果当 i 与 i-1相同的相同的时候，后面必然会出现重复的3元数据
    if (i > 0 && nums[i] === nums[i - 1]) continue
    let l = i + 1;
    let r = nums.length - 1;
    while (l < r) {

      const sum = nums[i] + nums[l] + nums[r];
      if (sum > 0) {
        // 值偏大，就移动最大的值往小的方向移动
        r--;
      } else if (sum < 0) {
        // 值偏小，就移动小的值往大的方向移动
        l++;
      } else {
        newNums.push([nums[i], nums[l], nums[r]]);

        // 判断是否重复, 如果相同的相同，就跳过
        while (l < r && nums[l] === nums[l + 1]) l++;
        while (l < r && nums[r] === nums[r - 1]) r--;
        // 跳过相同的值
        l++;
        r--;
      }
    }
  }

  return newNums;
};

function sort(nums) {
  for (let m = 1; m < nums.length; m++) {
    for (let n = 0; n < nums.length - m; n++) {
      if (nums[n] > nums[n + 1]) {
        [nums[n], nums[n + 1]] = [nums[n + 1], nums[n]];
      }
    }
  }
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
