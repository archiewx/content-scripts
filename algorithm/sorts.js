// 常用排序
// https://zhuanlan.zhihu.com/p/35946897

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

function insertOrderNum(nums, n) {
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] <= n) {
      nums[i + 1] = n;
      break
    } else {
      nums[i + 1] = nums[i] 
    }
  }
  return nums;
}

console.log('insert value =', insertOrderNum([1, 2, 5], 4));

// 插入排序: 选择未排序的空间插入已排序的空间，直到未排序的空间为空
// 以 【3,2,1】为例
// 当 i = 1, tmpValue = arr[i] = 2 => [3, 2, 1]
// j = 0,  arr[j] = 3 > tmpValue  = true, 执行: array[j + 1] = array[j] = 3  => [3, 3, 1]
// j = -1, arr[j + 1] = tmpValue = 2 => [2, 3, 1]

// 当 i = 2, tmpValue = arr[i] = 1 => [2, 3, 1]
// j = 1, arr[j] = 3 > tmpValue = true，执行: array[j + 1] = arr[j] = 3 => [2, 3, 3]
// j = 0, arr[j] = 2 > tmpValue = true, 执行: array[j + 1] = arr[j] = 2 => [2, 2, 3]
// j = -1, arr[j + 1] = tmpValue = 1 => [1, 2, 3]
function insertSort(array = []) {
  // 把[0-1] 当成已排序好的空间，[1-n] 当成待排序空间
  for(let i = 1; i < array.length; i ++) {
    // 待插入的值
    const insertValue = array[i]
    let j = i - 1;
    // arr[0...j] 就是已排序数组
    for(; j >= 0; j --) {
      if (insertValue >= array[j]) {
        break;
      } else {
        // 给插入的值腾位置，从j开始王后移动
        array[j + 1] = array[j];
      }
    }
    // 将insertValue插入
    array[j + 1] = insertValue;
  }
  return array;
}

console.log('insert', insertSort([3, 2, 8, 1]))

/*
归并排序，分治法
*/
function mergeSort(numArray = []) {
  const recursiveSort = (numArray) => {

  } 
  recursiveSort()
}

// 分治思想，快排就是分组排序
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


/*
  快速排序是不稳定排序算法，思路是寻找一个数据点，大于该数据点的数据放在右侧，小于改数据点的属于放在左侧
  通过分治法来处理
*/
function quickSortInPlace(array = [], l = 0, r = array.length - 1) {
  // 如果排序左侧下标高于右侧下标则停止递归
  if (l >= r) return;

  let s = l;
  let b = r;
  // 任意寻找一个数据点分割
  let markValue = array[l];
  while (s < b) {
    // 先判断右侧数据，大于锚点数据就左移
    while(b > s && array[b] >= markValue) {
      b --;
    }
    // [6, 5, 1]
    // 判断右侧数据，小于锚点数据右移动
    while(b > s && array[s] <= markValue) {
      s ++;
    }
    // 这里是操作是，将基准数最右侧不满足的值，移动到基准数数左侧第一个不满足的位置
    [array[s], array[b]] = [array[b], array[s]];
    // 重复操作，不断把区间内的小的值左移，大的值右移
    // 知道区间所有小的值有左移，大的值右移后，low/high 相遇
    // 这时候把基准值移动到low/high的位置，降低空间重复计算
    // 什么时候执行完成？s=b时候就暂停,只要在s++过程中
  }
  array[l] = array[s];
  array[s] = markValue;
  console.log('归并-invoke =', array);
  quickSortInPlace(array, l, s - 1);
  quickSortInPlace(array, s + 1, r);
}

console.log(quickSort([...array]));
const nums = [3, 2, 1];
quickSortInPlace(nums)
console.log('归并结果 =', nums);

const { MinHeap } = require('../Data-Structure/heap');
// 堆排序
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
