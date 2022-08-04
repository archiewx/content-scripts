// 已排序原地去重

function removeDuplicate(nums = []) {
  let l = 0;
  for (let r = 1; r < nums.length; r++) {
    if (nums[l] !== nums[r]) {
      nums[++l] = nums[r]
    }
  }
  return l + 1
}

const nums = [0, 0, 1, 1, 1, 3, 3, 5, 6]
console.log(removeDuplicate(nums))
console.log(nums)

// const array = [1,1, '1', 'NaN', NaN, {a:1}, {a:1}, '{a:1}']
// console.log(removeDuplicate(array))
// console.log(array)
