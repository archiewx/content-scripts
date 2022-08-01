/*
https://leetcode.cn/problems/lru-cache/
请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
实现 LRUCache 类：
LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。
*/

let LinkNode = function(key, value) {
  this.key = key;
  this.value = value;
  this.next = null;
  this.prev = null;
}

var LRUCache2 = function (capacity) {
  this.capacity = capacity;
  this.header = new LinkNode();
  this.trailing = new LinkNode();
  this.header.next = this.trailing;
  this.trailing.prev = this.header;
  this.cache = new Map();
}

LRUCache2.prototype.get = function(key) {
  if (this.cache.get(key)) {
    const node = this.cache.get(key);
    deleteNode(node);
    moveHead(node, this.header);
    return node.value;
  }
  return -1;
}

/** 
 * 新建逻辑
 *  1. new一个节点，通过key存入到cache
 *  2. 存入节点的时候，判断长度是否和capacity相等，如果相等，则删除最后一个节点，并把当前节点移动到头部
 *  3. 当已存在key 的时候，就直接更新value，并移动节点到头部
 */
LRUCache2.prototype.put = function(key, value) {
  if (this.cache.has(key)) {
    // 已存在的情况, 重置value,并防止到头部
    const node = this.cache.get(key);
    node.value = value;
    deleteNode(node);
    moveHead(node, this.header);
  } else {
    // 不存在的情况
    const node = new LinkNode(key, value); 
    this.cache.set(key, node);
    if (this.cache.size - 1 >= this.capacity) {
      this.cache.delete(this.trailing.prev.key)
      // 移除最后一个节点，并且把当前节点移动到头部
      deleteNode(this.trailing.prev);
      moveHead(node, this.header);
    } else {
      moveHead(node, this.header)
    }
  }
}

/**
 * 
 * @param {LinkNode} node 
 * @param {LinkNode} header 
 */
function moveHead(node, header) {
  node.prev = header;
  node.next = header.next;
  header.next = node;
  node.next.prev = node;
}

/**
 * 
 * @param {LinkNode} node 
 */
function deleteNode(node) {
  const next = node.next;
  const prev = node.prev;
  next.prev = prev;
  prev.next = next;
}

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.cache = [];
  this.frequency = [];
  this.header = { value: -1, next: null };
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  const i = this.frequency.indexOf(key);
  if (i < 0) return i;

  const item = this.cache[i];
  this.frequency.splice(i, 1);
  this.cache.splice(i, 1);
  this.frequency.unshift(key);
  this.cache.unshift(item);
  return item.value;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.frequency.includes(key)) {
    const i = this.frequency.indexOf(key);
    this.cache.splice(i, 1);
    this.frequency.splice(i, 1);
  }

  if (this.cache.length >= this.capacity) {
    this.cache.pop();
    this.frequency.pop();
  }

  this.cache.unshift({ key, value });
  this.frequency.unshift(key);
};
