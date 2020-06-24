// 查找先升后降的数组最大值

function find(array = []) {
  let maxValue = array[0];

  const _array = array.slice(1);

  while (_array.length) {
    const v = _array.shift();
    if (v > maxValue) maxValue = v;
  }

  return maxValue;
}

console.log(find([1, 2, 3, 4, 5, 4, 3, 2, 1]));

