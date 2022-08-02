/**
 * 二叉堆的数据结构
 * 当前堆的实现是使用数组实现的堆，二叉堆堆是一个完全二叉树。
 * 若父节点的位置是n，在数组中的该左侧节点位置是2n+1，右侧节点位置是2n+2。
 * 如果知道子节点m，则可以计算出父节点的位置是Math.floor((m-1)/2), 避免数组越界。
 */

class Heap {
  constructor() {
    if (new.target === Heap)
      throw new Error("Need using the new to create the Heap object.");
    this.heapContainer = [];
  }

  // 这个正好和getParentIndex 相反
  getLeftChildIndex(parentIndex) {
    return parentIndex * 2 + 1;
  }

  getRightChildIndex(parentIndex) {
    return parentIndex * 2 + 2;
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0;
  }

  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
  }

  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
  }

  leftChild(parentIndex) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)];
  }

  rightChild(parentIndex) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }

  parent(childIndex) {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }

  swap(m, n) {
    // 交换堆中两个元素，用数字实现的，就是交换数组两个元素的位置值
    [this.heapContainer[m], this.heapContainer[n]] = [
      this.heapContainer[n],
      this.heapContainer[m],
    ];
  }

  top() {
    if (!this.heapContainer.length) return null;

    return this.heapContainer[0];
  }

  // 这个就是将最后一个节点和顶点交换，顶点节点出堆
  pop() {
    if (this.heapContainer.length <= 1) return this.heapContainer.pop();

    const topNode = this.heapContainer[0];

    // 移动最后一个节点到第一个节点
    this.heapContainer[0] = this.heapContainer.pop();
    // 将第一个节点和下面节点进行比较，进行下沉
    this.heapifyDown();

    return topNode;
  }

  find(v) {
    const targets = [];
    for (let index = 0; index < this.heapContainer.length; index++) {
      if (this.heapContainer[index] === v) {
        targets.push(index);
      }
    }
    return targets;
  }

  isEmpty() {
    return !this.heapContainer.length;
  }

  /** 添加操作 */
  push(v) {
    this.heapContainer.push(v);
    this.heapifyUp();

    return this;
  }

  /** 移除 */
  delete(v) {
    // 获取移除的长度
    const removeLen = this.find(v).length;

    for (let index = 0; index < removeLen; index++) {
      // 获取当前移除下标
      const removeItemIndex = this.find(v).pop();

      // 判断下标是否等于堆容器最后一个下标
      if (removeItemIndex === this.heapContainer.length - 1) {
        this.heapContainer.pop();
      } else {
        // 若不是最后最后一个，则就把堆最后一个元素填充到要移除的位置
        this.heapContainer[removeItemIndex] = this.heapContainer.pop();

        if (
          this.hasLeftChild(removeItemIndex) &&
          (!this.parent(removeItemIndex) ||
            this.pairIsInCorrectOrder(
              this.parent(removeItemIndex),
              this.heapContainer[removeItemIndex]
            ))
        ) {
          this.heapifyDown(removeItemIndex);
        } else {
          this.heapifyUp(removeItemIndex);
        }
      }
    }
    return this;
  }

  /** 上浮，不断与父节点比较，形成最大堆或者最小堆 */
  heapifyUp(customStartIndex) {
    let currentIndex = customStartIndex || this.heapContainer.length - 1;

    // 用来比较heap内部顺序，每次添加时候就调用从下自上排序
    // 最大堆 要求当前节点始终小于父级节点, 否则swap
    // 最小堆 要求当前节点始终大于父级节点， 否则swap
    while (
      this.hasParent(currentIndex) &&
      !this.pairIsInCorrectOrder(
        this.parent(currentIndex),
        this.heapContainer[currentIndex]
      )
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      // 交换完成后，更新当前坐标为父级坐标
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  /* 下沉，不断与子节点比较，形成最大堆或者最小堆 */
  heapifyDown(customStartIndex = 0) {
    let currentIndex = customStartIndex,
      childIndex = null;
    while (this.hasLeftChild(currentIndex)) {
      // 这里判断是否有右节点, 若有则比较
      // 这里主要获取下一个节点
      if (
        this.hasRightChild(currentIndex) &&
        this.pairIsInCorrectOrder(
          this.rightChild(currentIndex),
          this.leftChild(currentIndex)
        )
        // 这里通过比较顺序，子节点得到最大堆的最大值，最小堆的最小值
      ) {
        // 继续获取下一个右侧节点
        childIndex = this.getRightChildIndex(currentIndex);
      } else {
        // 不存在右侧节点，继续获取左侧节点
        childIndex = this.getLeftChildIndex(currentIndex);
      }

      // 这里比较当前节点(父级)和他的下一个子节点， 若符合顺序要求，就跳出循环
      if (
        this.pairIsInCorrectOrder(
          this.heapContainer[currentIndex],
          this.heapContainer[childIndex]
        )
      ) {
        break;
      }

      // 这里交换当前节点和它的下一个子节点
      this.swap(currentIndex, childIndex);
      currentIndex = childIndex;
    }
  }

  pairIsInCorrectOrder(parentElement, childElement) {
    throw new Error(`
      You have to implement heap pair comparision method
      for ${parentElement} and ${childElement} values.
    `);
  }
}

class MinHeap extends Heap {
  /** 父节点始终要小于子节点 */
  pairIsInCorrectOrder(pel, cel) {
    return pel < cel;
  }
}

class MaxHeap extends Heap {
  /* 父节点始终要大于子节点的值 */
  pairIsInCorrectOrder(pel, cel) {
    return pel > cel;
  }
}

const maxHeap = new MaxHeap();

maxHeap.push(2).push(5).push(3).push(6);

console.log(maxHeap);
maxHeap.delete(6);
console.log(maxHeap);
// minHeap.heapifyDown()

// const maxHeap = new MaxHeap();
// maxHeap.add(2).add(5).add(3).add(6);
// console.log(maxHeap);

exports.MinHeap = MinHeap;
