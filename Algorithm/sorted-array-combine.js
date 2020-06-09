// 有序数组合并, 双指针方式

function sortedArrayCombine(array1 = [], array2 = []) {
  const len = array1.length > array2.length ? array1.length : array2.length;

  const newArray = [];
  let m = 0;
  let n = 0;
  while (newArray.length < array1.length + array2.length) {
    const currentV = array1[m];
    const insertV = array2[n];
    // 下面哪个数据小，哪个数据就++, 大的保持不变，小数推入数组
    if (currentV < insertV) {
      currentV !== undefined && newArray.push(currentV);
      m++;
    } else if (currentV > insertV) {
      insertV !== undefined && newArray.push(insertV);
      n++;
    } else {
      currentV !== undefined && newArray.push(currentV);
      insertV !== undefined && newArray.push(insertV);
      m++;
      n++;
    }
  }

  return newArray;
}

console.log(sortedArrayCombine([ 6, 9, 10], [1, 3, 8]));
