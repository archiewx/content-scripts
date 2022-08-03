/*
https://leetcode.cn/problems/kth-largest-element-in-an-array/
*/
// 思路：先排序，返回sortNums[k - 1] 的值
var findKthLargest = function(nums, k) {
  const size = nums.length;
  buildMaxHeap(nums, size);
  // 获取k-1的结果返回，例如：返回第2大的值，那么需要把第一大的值移除堆
  while(k-1) {
    nums[0] = nums.pop();
    maxHeapify(nums, 0, nums.length)
    k--;
  }
  return nums[0]
};
console.log(findKthLargest([1, 2, 3, 4, 6, 5], 4));

function buildMaxHeap(nums, size) {
  for (let index = Math.floor((size - 2)/2); index >= 0; index--) {
    maxHeapify(nums, index, size);
  }
}

function maxHeapify(nums, i, size) {
  let p = i;
  let l = i * 2 + 1;
  let r = i * 2 + 2;
  if (l < size && nums[l] > nums[p]) {
    p = l;
  }

  if (r < size && nums[r] > nums[p]) {
    p = r;
  }
  
  if (p !== i) {
    [nums[p], nums[i]] = [nums[i], nums[p]];
    maxHeapify(nums, p, size);
  }
}

class MaxHeap {
  container = [];

  push(v) {
    this.container.push(v)
    this.heapifyUp();
    return this;
  }

  compare(a, b) {
    return a > b;
  }

  leftChild(i) {
    return this.container[2 * i + 1];
  }

  rightChild(i) {
    return this.container[2 * i + 2];
  }

  parent(i) {
    return this.container[this.getParentIndex(i)];
  }

  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  getLeftChildIndex(i) {
    return 2 * i + 1;
  }

  getRightChildIndex(i) {
    return 2 * i + 2;
  }

  swap(a, b) {
    [this.container[a], this.container[b]] = [this.container[b], this.container[a]];
  }

  hasParent(i) {
    return this.getParentIndex(i) >= 0
  }

  heapifyUp(i) {
    let curr = i || this.container.length - 1; 
    // 这里要判断是否有父节点，如果没有父节点，并且父节点不符合最大堆的情况
    while(this.hasParent(curr) && !this.compare(this.parent(curr), this.container[curr])) {
      this.swap(this.getParentIndex(curr), curr);
      curr = this.getParentIndex(curr);
    }
  }


  /** 查找到所有当前值所在索引 */
  findIndex(v) {
    const indexes = [];
    this.container.forEach((v1, i) => {
      if (v === v1) indexes.push(i);
    });
    return indexes;
  }

  delete(v) {
    const deletedIndexes = this.findIndex(v);
    for (let index = 0; index < deletedIndexes.length; index++) {
      const deletedIndex = deletedIndexes[index];

      // 先判断是否是最后一个元素
      if (deletedIndex === this.container.length - 1) {
        this.container.pop();
      } else {
        // 非最后一个元素，那就将最后一个元素填充到移除的元素上
        this.container[deletedIndex] = this.container.pop();
        // 这里要判断该元素是上浮还是下沉
        // 不存在父节点时候，下沉
        // 存在父节点但是满足compare的时候，下沉
        // 必须要有左节点，否则该节点就是叶子结点
        if (
          this.hasLeftChild(deletedIndex) &&
          (!this.hasParent(deletedIndex) ||
            this.compare(
              this.parent(deletedIndex),
              this.container[deletedIndex]
            ))
        ) {
          this.heapifyDown(deletedIndex);
        } else {
          this.heapifyUp(deletedIndex);
        }
      }
    }
  }

  hasLeftChild(i) {
    return 2 * i + 1 < this.container.length;  
  }

  hasRightChild(i) {
    return 2 * i + 2 < this.container.length;
  }

  pop() {
    if (this.container.length <= 0) return this.container.pop();

    const deleted = this.container[0];
    this.container[0] = this.container.pop();
    this.heapifyDown();
    return deleted;
  }

  /** 下沉，把当前值和下面值比较, 默认值为堆顶 */
  heapifyDown(i = 0) {
    // 判断是否有左节点，堆如果有节点，总是从左到有布局
    let curr = i;
    let childIndex = 0;
    while(this.hasLeftChild(curr)) {
      // 如果有子节点的话，并且去的字节点的最大值 或者 不存在子节点，就直接去左节点
      if (this.hasRightChild(curr) && this.compare(this.rightChild(curr), this.leftChild(curr))) {
        childIndex = this.getRightChildIndex(curr);
      } else {
        childIndex = this.getLeftChildIndex(curr);
      }

      // 得到子节点后，需要和curr比较，如果不符合compare的话， 就需要执行交换, 负责就跳出循环
      if (this.compare(this.container[curr], this.container[childIndex])) {
        break
      }

      this.swap(curr, childIndex);
      // 当前索引变更为交换后的索引
      curr = childIndex;
    }
  }
}

// const maxHeap = new MaxHeap();
// maxHeap.push(2).push(5).push(3).push(6);
// console.log(maxHeap);
// maxHeap.delete(6);
// console.log(maxHeap);