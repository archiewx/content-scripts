// hash 表
// 这里hash表解决 哈希碰撞 方式通过 单独链表方式解决
const LinkedList = require('./linked-list');

// 默认hash表的大小
const defaultHashTableSize = 32;

class HashTable {
  constructor(size = defaultHashTableSize) {
    this.buckets = Array(size)
      .fill(null)
      .map(() => new LinkedList());

    // 所有的键名
    this.keys = {};
  }

  // 计算hash值
  hash(key) {
    const hash = Array.from(key).reduce((acc, k) => acc + k.charCodeAt(0), 0);

    return hash % this.buckets.length;
  }

  // 设置key/value
  set(k, v) {
    const hash = this.hash(k);
    this.keys[k] = hash;

    const hashLinkedList = this.buckets[hash];

    const node = hashLinkedList.findByCallback((node) => node.key === k);

    if (!node) {
      hashLinkedList.append({ key: k, value: v });
    } else {
      node.value.value = v;
    }

    return this;
  }

  // 删除
  delete(key) {
    const hash = this.hash(key);
    delete this.keys[key];

    const hashLinkedList = this.buckets[hash];

    const node = hashLinkedList.findByCallback((node) => node.key === k);

    if (node) {
      hashLinkedList.delete(node.value);
    }
    return this;
  }

  // 获取
  get(key) {
    const hash = this.hash(key);
    const hashLinkedList = this.buckets[hash];

    const node = hashLinkedList.findByCallback((node) => (node.key = key));

    if (node) return node.value.value;

    return null;
  }

  has(key) {
    return Object.prototype.hasOwnProperty.call(this.keys, key);
  }

  // 获取所有键名
  getKeys() {
    return Object.keys(this.keys);
  }
}

module.exports = HashTable
