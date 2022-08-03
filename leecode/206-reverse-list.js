var reverseList = function(head) {
  let prev = null;
  let curr = head;
  while (curr) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
  }
  return prev;
};

/*
反转链表递归实现考虑递归函数和终止条件：
终止条件: 当前currNode为null或者currNode.next 时候就返回节点，在递归过程就是最后一个节点时候就直接返回
递归函数: 为了实现n个节点反转，需要先反转 n-1 个节点，...., 先反转最后2个节点，最后一个节点。倘若当前节点是需要反转的节点是k-1。
  nk.next.next = nk
  nk.next = null
就完成nk 和 n(k-1)的元素反转,在终止条件下，返回的是n(k-1)-n(size) 之间反转过链表，该链表的末尾就是 nk

首先先看只有3个节点反转过程: 3 -> 2 -> 1 该链表头为head
1. 首先为了让3个节点反转，先要让 2 -> 1 反转， 执行 recursive([2, 1]), head: [3, 2, 1]
2. 执行 recursive([2, 1]) 后，判断不符合终止条件，当前参数是: 2 -> 1, head: [2, 1], 继续执行 recursive(1)
3. 满足终止条件，这个时候返回的结果是[1], 也就是newHead
4. 当前递归结果后，回到【2】内执行堆栈中执行，当前head: [2, 1], newHead: [1], 
  改变链表关系: 
    1 -> 2 -> null, 1.next = 2, 2.next = null
    head.next.next = head;
    2 -> 1 -> 2 ....
    head.next = null;
    2 -> 1 -> null
  返回 newHead [1], head: [2, 1]
5. 回到 【1】 的执行堆栈中，此刻head：[3, 2, 1], newHead: [1, 2]
  改变链表关系:
    3 -> 2 -> 1
    head.next.next = head
    2 -> 3 -> 2 -> 3 ...
    head.next = null
    2 -> 3 -> null
  返回 newHead [1, 2, 3], head: [2, 3]
  这里需要关注的就是 newHead 最后一个元素会被 head.next.next = head 关联起来
6. 完成递归
*/
var recursiveReverseList = function(head) {
  if (head == null || head.next == null) {
    return head;
  }
  const newHead = recursiveReverseList(head.next);
  // head.next 实际上当前递归堆栈newHead中最后一个元素
  head.next.next = head;
  head.next = null;
  return newHead;
}

function ListNode(val, next) {
  this.val = val || 0;
  this.next = next || null;
}
function printNode(node) {
  const v = [];
  while(node) {
    v.push(node.val);
    node = node.next;
  }
  return v;
}

const head = new ListNode(4, new ListNode(3, new ListNode(2, new ListNode(1))))
console.log(printNode(recursiveReverseList(head, 5)));
