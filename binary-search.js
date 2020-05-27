// 二分查找法, 查找已排序的数据方式
function binarySearch(sortedArray = [], n) {
  let startIndex = 0,
    endIndex = sortedArray.length - 1;

  while (startIndex <= endIndex) {
    const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);

    if (sortedArray[middleIndex] === n) return middleIndex;

    if (sortedArray[middleIndex] < n) {
      // 因为middleIndex也被排除了
      startIndex = middleIndex + 1;
    } else {
      endIndex = middleIndex - 1;
    }
  }
  return -1;
}

console.log(binarySearch([1, 2, 3, 4, 8, 20], 2))
