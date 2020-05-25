class LinkedNode {
  constructor(v, next) {
    this.value = v;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    /** @type {LinkedNode} */
    this.head = null;
    /** @type {LinkedNode} */
    this.tail = null;
  }

  // 插入
  prepend(v) {
    const node = new LinkedNode(v, this.head);

    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }

    return this;
  }

  // 添加
  append(v) {
    const node = new LinkedNode(v);

    if (!this.head) {
      this.head = node;
      this.tail = node;
      return this;
    }

    this.tail.next = node;
    this.tail = node;
    return this;
  }

  // 删除 todo: 有问题
  delete(v) {
    while (this.head && this.head.value === v) {
      this.head = this.head.next;
    }

    if (!this.head) return null;

    let prevNode = this.head;
    let curvNode = this.head.next;

    while (curvNode) {
      if (curvNode.value === v) {
        prevNode.next = curvNode.next;
      } else {
        prevNode = curvNode;
      }
      curvNode = curvNode.next;
    }

    if (curvNode === this.tail && this.tail.value === v) {
      this.tail = prevNode;
    }
    return this;
  }

  // 查询
  find(v) {
    let cuvNode = this.head;
    while (cuvNode) {
      if (v === cuvNode.value) {
        return cuvNode;
      }
      cuvNode = cuvNode.next;
    }
    return null;
  }

  // 反转
  reverse() {
    let prevNode = null,
      curvNode = this.head,
      nextNode = null;
    while (curvNode) {
      nextNode = curvNode.next;
      curvNode.next = prevNode;

      prevNode = curvNode;
      curvNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;

    return this;
  }

  toString() {
    let curvNode = this.head;
    const ves = [];
    while (curvNode) {
      ves.push(curvNode.value);
      curvNode = curvNode.next
    }

    return ves.join(',');
  }
}

const linked = new LinkedList();
linked.append(20).append(30).append(40).append(50).append(80).append(50).prepend(50);

console.log(linked.toString());

linked.reverse();

console.log(linked.toString());
