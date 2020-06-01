// 数组 [1, [2, 3], [[4], 5]]

// 时间复杂度: O(n)
function flat(arr = []) {
  let array = [];
  const shadowArray = arr.slice();
  while (shadowArray.length) {
    const v = shadowArray.shift();
    if (Array.isArray(v)) array = array.concat(flat(v));
    else array = array.concat(v);
  }

  return array;
}

console.log(flat([1, [2, 3], [[4], 5]]));

// mock mdn flat
function flatDepth(arr = [], depth = Infinity) {
  if (depth === 0 || !arr.length) return arr

  let array = []
  const shadowArray = arr.slice()
  while(shadowArray.length) {
    const v = shadowArray.shift()

    if (Array.isArray(v)) array = array.concat(flatDepth(v, depth - 1))
    else array = array.concat(v)
  }

  return array
}

console.log(flatDepth([1, [2, 3], [[4], 5]], 2));
