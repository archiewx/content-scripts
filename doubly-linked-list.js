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
    while (this.head && this.head.value === v) {
      this.head = this.head.next;
    }

    if (!this.head) return this;

    let previousNode = this.head;
    let curvNode = this.head.next;

    // 这里遍历的长度为 length - 1
    while (curvNode) {
      if (curvNode.value === v) {
        previousNode.next = curvNode.next;
      } else {
        previousNode = curvNode;
      }
      curvNode = curvNode.next;
    }

    if (this.tail === curvNode && curvNode.value === v) {
      previousNode.next = null;
      this.tail = previousNode;
    }

    return this;
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
    return ves.join(',');
  }
}

const doublyLinkedList = new DoublyLinkedList();

doublyLinkedList.append(20).append(30).prepend(100).append(50);

console.log(doublyLinkedList.toString());

doublyLinkedList.reverse();
console.log(doublyLinkedList.toString());

doublyLinkedList.delete(100);
console.log(doublyLinkedList.toString());
doublyLinkedList.delete(30);
console.log(doublyLinkedList.toString());
