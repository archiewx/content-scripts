// 数组去重

const array = [1, 2, 2, 32, 3, 4, 6, 6];

const uniqArray = [...new Set(array)];
console.log(uniqArray);

function removeDuplicate(array = []) {
  // m 代表重复的下标
  let m = 0;
  for (let n = 1; n < array.length; n++) {
    if (array[m] !== array[n]) {
      array[++m] = array[n];
    }
  }

  // slice使用时候，下标+1
  return array.slice(0, m + 1);
}

console.log(removeDuplicate(array))
