const LinkedList = require('./linked-list')

// 链表正向遍历
function traverse(linkedList, callback) {
  let current = linkedList.head;
  while (current) {
    callback(current.value);
    current = current.next;
  }
}

function reverseTraverse(linkedList, callback) {
  function traverse(node, callback) {
    if (node) {
      traverse(node.next, callback)
      callback(node.value)
    }
  }

  traverse(linkedList.head, callback)
}

const linkedList = new LinkedList()

linkedList.append(20).append(30).append(50)

traverse(linkedList, (v) => {
  console.log(v)
})
reverseTraverse(linkedList, (v) => {
  console.log(v)
})
