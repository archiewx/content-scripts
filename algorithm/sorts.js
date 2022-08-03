// 常用排序

// 冒泡排序: 时间复杂度O(n^2), 最好是O(n)
function bubbleSort(arr = []) {
  let count = 0;
  for (let m = 1; m < arr.length; m++) {
    for (let n = 0; n < arr.length - m; n++) {
      // 总是把最大的值移动到最后，然后重复将n-1个值比较
      if (arr[n] > arr[n + 1]) {
        count ++;
        [arr[n], arr[n + 1]] = [arr[n + 1], arr[n]];
      }
    }
  }
  console.log('执行次数', count);
  return arr;
}

const array = [20, 1, 10, 3, 2, 8, 6, 5, 9];
console.log('冒泡', bubbleSort([...array]));

// 快排就是分组排序
function quickSort(arr = []) {
  // 快排递归条件
  if (arr.length <= 1) return arr;

  const array = arr.slice();
  const center = array.pop();
  let leftArray = [];
  let rightArray = [];
  let centerArray = [center];

  while (array.length) {
    const el = array.pop();
    if (el > center) rightArray.push(el);
    else if (el === center) centerArray.push(el);
    else leftArray.push(el);
  }

  return quickSort(leftArray).concat(centerArray).concat(quickSort(rightArray));
}

function quickSortInPlace(array = [], lowIndex = 0, highIndex = array.length - 1) {
  if (array.length <= 1) return array;

  const partitionArray = (lowIndex, highIndex) => {
    const pivot = array[highIndex];
    let partitionIndex = lowIndex;
    for (let index = lowIndex; index < highIndex; index++) {
      if (array[index] < pivot) {
        console.log(index, partitionIndex);
        [array[index], array[partitionIndex]] = [array[partitionIndex], array[index]];
        partitionIndex++;
      }
    }
    // array[highIndex] 总是不大于 array[partitionIndex]
    [array[partitionIndex], array[highIndex]] = [array[highIndex], array[partitionIndex]];

    return partitionIndex;
  };

  if (lowIndex < highIndex) {
    // 划分数组节点, partitionIndex 左侧数组都比右侧小
    const partitionIndex = partitionArray(lowIndex, highIndex);

    // 递归排序左侧
    quickSortInPlace(array, lowIndex, partitionIndex - 1);
    // 递归右侧
    quickSortInPlace(array, partitionIndex + 1, highIndex);
  }

  return array;
}

console.log(quickSort([...array]));
console.log(quickSortInPlace([2, 1, 3, 4]));

const { MinHeap } = require('../Data-Structure/heap');
function heapSort(array = []) {
  const _array = array.slice();
  const minHeap = new MinHeap();
  while (_array.length) {
    minHeap.push(_array.shift());
  }

  while (!minHeap.isEmpty()) {
    _array.push(minHeap.pop());
  }
  return _array
}

console.log(heapSort(array));
