class LinkedNode {
  constructor(v, next) {
    this.value = v;
    this.next = next;
  }
}

/**
链表操作的时间复杂度是相对的一般来说:
访问复杂度: O(n)
查找复杂度: O(n)
添加复杂度: 最优 O(1), 最差 O(n)
删除复杂度: 最优 O(1), 最差 O(n)
添加和删除要看具体场景，例如插入或删除中间的位置，那么添加和删除的复杂度就会变成O(n),因为要先访问，再操作。
不过链表的真正在变更添加和删除的时候复杂度始终是O(1)。
*/

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

  delete(v) {
    let deletedNode = null;
    while (this.head && this.head.value === v) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    if (!this.head) return deletedNode;

    let prevNode = this.head;
    let currNode = this.head.next;

    while (currNode) {
      if (currNode.value === v) {
        deletedNode = currNode;
        prevNode.next = currNode.next;
      } else {
        prevNode = currNode;
      }
      currNode = currNode.next;
    }

    this.tail = prevNode;
    // if (currNode === this.tail && this.tail.value === v) {
    //   deletedNode = this.tail;
    //   prevNode.next = null;
    //   this.tail = prevNode;
    // }
    return deletedNode;
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

  findByCallback(callback) {
    let cuvNode = this.head
    while(cuvNode) {
      if (callback(cuvNode)) {
        return cuvNode
      }
      cuvNode = cuvNode.next
    }
    return null
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

module.exports = LinkedList

const list = new LinkedList()
list.append(0)
list.append(1)
list.append(2)
list.append(3)
console.log(list.toString());
console.log(list.delete(0));
console.log(list.toString(), list.head.value, list.tail.value)