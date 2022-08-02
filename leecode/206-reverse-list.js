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

var recursiveReverseList = function(head) {
  if (head == null || head.next == null) {
    return head;
  }
  const newHead = recursiveReverseList(head.next);
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

const head = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
);
console.log(printNode(recursiveReverseList(head, 5)));
