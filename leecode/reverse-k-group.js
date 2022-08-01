/**
 https://leetcode.cn/problems/reverse-nodes-in-k-group/
 给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。

k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function ListNode(val, next) {
  this.val = val || 0;
  this.next = next || null;
}
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  if (k == 1) return head;
  // 思路: 返回是新的链表
  // 创建一个新的header

  let len = 0;
  let cNode = head;
  while (cNode) {
    cNode = cNode.next;
    len++;
  }
  let gl = (len - (len % k)) / k;

  let newHead = new ListNode(0);
  let dHead = newHead;
  for (let m = 0; m < gl; m++) {
    let prevNode = null;
    let currNode = head;
    let nextNode = null;
    for (let index = 0; index < k; index++) {
      nextNode = currNode.next;
      currNode.next = prevNode;
      prevNode = currNode;
      currNode = nextNode;
    }
    dHead.next = prevNode;
    dHead = head;
    head = currNode;
  }
  dHead.next = head;
  return newHead.next;
};

const head = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
);

function printNode(node) {
  const v = [];
  while(node) {
    v.push(node.val);
    node = node.next;
  }
  return v;
}

console.log(printNode(reverseKGroup(head, 5)));
