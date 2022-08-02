// 双向链表实现

class DoublyLinkedNode {
  constructor(value, previous = null, next = null) {
    this.value = value;
    /** @type {DoublyLinkedNode | null} */
    this.previous = previous;
    /** @type {DoublyLinkedNode | null} */
    this.next = next;
  }
}

class DoublyLinkedList {
  constructor() {
    /** @type {DoublyLinkedNode} */
    this.head = null;
    /** @type {DoublyLinkedNode} */
    this.tail = null;
  }

  // 添加
  append(v) {
    const node = new DoublyLinkedNode(v, this.tail, null);
    if (!this.head) {
      this.head = node;
      this.tail = node;
      return this;
    }

    this.tail.next = node;
    this.tail = node;
    return this;
  }

  // 插入
  prepend(v) {
    const node = new DoublyLinkedNode(v, null, this.head);
    if (!this.head) {
      this.head = node;
      this.tail = node;
      return this;
    }

    this.head.previous = node;
    this.head = node;

    return this;
  }

  // 查找
  find(v) {
    const curvNode = this.head;
    while (curvNode) {
      if (curvNode.value === v) return curvNode;

      curvNode = curvNode.next;
    }

    return null;
  }

  // 删除
  delete(v) {
    let deletedNode = null;
    while (this.head && this.head.value === v) {
      deletedNode = this.head;
      this.head = this.head.next;
      this.head.previous = null;
    }

    if (!this.head) {
      this.head = null;
      this.tail = null;
      return deletedNode;
    }

    let previousNode = this.head;
    let currNode = this.head.next;

    // 这里遍历的长度为 length - 1
    while (currNode) {
      if (currNode.value === v) {
        deletedNode = currNode;
        const nextNode = currNode.next;
        if (nextNode) nextNode.previous = previousNode;
        previousNode.next = nextNode;
      } else {
        previousNode = currNode;
      }
      currNode = currNode.next;
    }

    this.tail = previousNode;

    return deletedNode;
  }

  // 旋转
  reverse() {
    let previousNode = null,
      nextNode = null,
      curvNode = this.head;

    while (curvNode) {
      nextNode = curvNode.next;

      curvNode.next = previousNode;
      curvNode.previous = nextNode;

      previousNode = curvNode;
      curvNode = nextNode;
    }

    this.tail = this.head;
    this.head = previousNode;
    return this;
  }

  toString() {
    if (!this.head) return;

    const ves = [];
    let curvNode = this.head;
    while (curvNode) {
      ves.push(curvNode.value);
      curvNode = curvNode.next;
    }
    return ves;
  }
}

const doublyLinkedList = new DoublyLinkedList();

doublyLinkedList.append(20).append(30).append(50).append(100);

// console.log(doublyLinkedList.toString(), doublyLinkedList);

// doublyLinkedList.reverse();
// console.log(doublyLinkedList.toString(), doublyLinkedList);

console.log(doublyLinkedList.toString())
doublyLinkedList.delete(100);
console.log(doublyLinkedList.toString());
// doublyLinkedList.delete(30);
// console.log(doublyLinkedList.toString());
