/**
 * 堆的数据结构
 */

class Heap {
  constructor() {
    if (new.target === Heap) throw new Error('Need using the new to create the Heap object.');
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
    [this.heapContainer[m], this.heapContainer[n]] = [this.heapContainer[n], this.heapContainer[m]];
  }

  peek() {
    if (!this.heapContainer.length) return null;

    return this.heapContainer[0];
  }

  // 这个就是将最后一个节点和顶点交换，顶点节点出堆
  poll() {
    if (!this.heapContainer.length) return null;

    if (this.heapContainer.length === 1) return this.heapContainer.pop();

    const item = this.heapContainer[0];

    this.heapContainer[0] = this.heapContainer.pop();
    this.heapifyDown();

    return item;
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

  add(v) {
    this.heapContainer.push(v);
    this.heapifyUp();

    return this;
  }

  remove(item) {
    // 获取移除的长度
    const removeLen = this.find(item).length;

    for (let index = 0; index < item; index++) {
      // 获取当前移除下标
      const removeItemIndex = this.find(item).pop();

      // 判断下标是否等于堆容器最后一个下标
      if (removeItemIndex === this.heapContainer.length - 1) {
        this.heapContainer.pop();
      } else {
        // 若不是最后最后一个，则就把堆最后一个元素填充到要移除的位置
        this.heapContainer[removeItemIndex] = this.heapContainer.pop();

        if (
          this.getParentIndex(removeItemIndex) &&
          (!this.parent(removeItemIndex) ||
            this.pairIsInCorrectOrder(this.parent(removeItemIndex), this.heapContainer[removeItemIndex]))
        ) {
          this.heapifyDown(removeItemIndex);
        } else {
          this.heapifyUp(removeItemIndex);
        }
      }
    }
    return this
  }

  heapifyUp(customStartIndex) {
    let currentIndex = customStartIndex || this.heapContainer.length - 1;

    // 用来比较heap内部顺序，每次添加时候就调用从下自上排序
    // 最大堆 要求当前节点始终小于父级节点, 否则swap
    // 最小堆 要求当前节点始终大于父级节点， 否则swap
    while (
      this.hasParent(currentIndex) &&
      !this.pairIsInCorrectOrder(this.parent(currentIndex), this.heapContainer[currentIndex])
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  // 执行poll或者remove 操作后，从自上而下
  heapifyDown(customStartIndex = 0) {
    let currentIndex = customStartIndex,
      nextIndex = null;
    while (this.hasLeftChild(currentIndex)) {
      // 这里判断是否有右节点, 若有则比较
      // 最大堆 右侧节点大于左侧节点
      // 最小堆 右侧节点小于左侧节点
      // 这里主要获取下一个节点
      if (
        this.hasRightChild(currentIndex) &&
        // 这里通过比较顺序，得到最大堆的最大值，最小堆的最小值
        this.pairIsInCorrectOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))
      ) {
        // 继续获取下一个右侧节点
        nextIndex = this.getRightChildIndex(currentIndex);
      } else {
        // 不存在右侧节点，继续获取左侧节点
        nextIndex = this.getLeftChildIndex(currentIndex);
      }

      // 这里比较当前节点(父级)和他的下一个子节点， 若符合顺序要求，就跳出循环
      if (this.pairIsInCorrectOrder(this.heapContainer[currentIndex], this.heapContainer[nextIndex])) {
        break;
      }

      // 这里交换当前节点和它的下一个子节点
      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
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
  pairIsInCorrectOrder(firstElement, secondElement) {
    return firstElement < secondElement;
  }
}

class MaxHeap extends Heap {
  pairIsInCorrectOrder(firstElement, secondElement) {
    return firstElement > secondElement;
  }
}

// const minHeap = new MinHeap();

// minHeap.add(2).add(5).add(3).add(6);

// console.log(minHeap);
// minHeap.heapifyDown()

// const maxHeap = new MaxHeap();
// maxHeap.add(2).add(5).add(3).add(6);
// console.log(maxHeap);

exports.MinHeap = MinHeap
