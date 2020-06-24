// 已排序原地去重

function removeDuplicate(nums = []) {
  let counter = 0;
  for (let index = 1; index < nums.length; index++) {
    if (nums[counter] !== nums[index]) {
      nums[++counter] = nums[index]
    }
  }
  return counter + 1
}

const nums = [0, 0, 1, 1, 1, 3, 3, 5, 6]
console.log(removeDuplicate(nums))
console.log(nums)

const array = [1,1, '1', 'NaN', NaN, {a:1}, {a:1}, '{a:1}']
console.log(removeDuplicate(array))
console.log(array)
