/**
 * 堆的数据结构
 */

class Heap {
  constructor() {
    if (new.target === Heap) throw new Error('Need using the new to create the Heap object.');
    this.heapContainer = [];
  }

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
        targets.push(this.heapContainer[index]);
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

  remove() {}

  heapifyUp(customStartIndex) {
    let customIndex = customStartIndex || this.heapContainer.length - 1;

    while (
      this.hasParent(customIndex) &&
      !this.pairIsInCorrectOrder(this.parent(customIndex), this.heapContainer[customIndex])
    ) {
      this.swap(customIndex, this.getParentIndex(customIndex));
      customIndex = this.getParentIndex(customIndex);
    }
  }

  heapifyDown(customStartIndex = 0) {
    let customIndex = customStartIndex,
      nextIndex = null;
    while (this.hasLeftChild(customIndex)) {
      if (
        this.hasRightChild(customIndex) &&
        this.pairIsInCorrectOrder(this.rightChild(customIndex), this.leftChild(customIndex))
      ) {
        nextIndex = this.getRightChildIndex(customIndex);
      } else {
        nextIndex = this.getLeftChildIndex(customIndex);
      }

      if (this.pairIsInCorrectOrder(this.heapContainer[customIndex], this.heapContainer[nextIndex])) {
        break;
      }

      this.swap(customIndex, nextIndex);
      customIndex = nextIndex;
    }
  }

  pairIsInCorrectOrder(firstElement, secondElement) {
    throw new Error(`
      You have to implement heap pair comparision method
      for ${firstElement} and ${secondElement} values.
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

const minHeap = new MinHeap()

minHeap.add(2).add(5)

console.log(minHeap)

const maxHeap = new MaxHeap()
maxHeap.add(2).add(5)
console.log(maxHeap)

