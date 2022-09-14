// 给定一个数组，形如 [1, 1, 2 , 3, 3, 3, 3, 4, 6, 6]，给定一个数 n，例如 3，找出给定的数 n 在 数 组内出现的次数，要求时间复杂度小于 O(n)

const array = [1, 1, 2, 3, 3, 3, 3, 4, 6, 6];

function binarySearch(sorted, num) {
  var l = 0,
    r = sorted.length - 1;
  var targetIndex = -1;
  while (r >= l) {
    var m = l + Math.floor((r - l) / 2);
    if (sorted[m] === num) {
      targetIndex = m; 
      break;
    } else if (sorted[m] > num) {
      r = m - 1;
    } else {
      l = m + 1;
    }
  }

  l = m;
  r = m;
  while(l >= 0 && r <= sorted.length - 1) {
    if (sorted[l] === num) {
      l --;
    }
    if (sorted[r] === num) {
      r ++
    }

    if (sorted[r] !== num && sorted[l] !== num) break;
  }

  return r - l - 1
}

console.log('二分法', binarySearch(array, 3));

function find(arr = [], num) {
  let i = 0;
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (element > num) {
      break;
    } else {
      if (element === num) i++;
    }
  }
  return i;
}

console.log(find(array, 3));

let num = array.shift();
let i = 0;
while (num <= 3) {
  if (num === 3) i++;
  num = array.shift();
}
console.log(i);
