// 深度优先遍历 (DFS)
// 前序、中序、后序遍历都是针对 root 节点， 根据遍历root 时机分为前中后

// 前序遍历 root -> left -> right
// 递归实现
function recursiveDepthFirstSearch(root, callback) {
  const traverse = (node, callback) => {
    callback && callback(node);

    if (node.left) traverse(node.left, callback);

    if (node.right) traverse(node.right, callback);
  };

  traverse(root, callback);
}

// 非递归实现DFS
function depthFirstSearch(root, callback) {
  const stack = [];

  let currentNode = root;
  while (currentNode || stack.length) {
    if (currentNode) {
      callback(currentNode);
      stack.push(currentNode);
      currentNode = currentNode.left;
    } else {
      const node = stack.pop();
      currentNode = node.right;
    }
  }
}

// 中序遍历 left -> root -> right
function recursiveInfixDepthFirstSearch(root, callback) {
  if (root.left) recursiveInfixDepthFirstSearch(root.left, callback);
  callback(root);
  if (root.right) recursiveInfixDepthFirstSearch(root.right, callback);
}

const tree = require('./tree');

tree.insert(2);
tree.insert(1);
tree.insert(3);

console.log('前序遍历-递归');
recursiveDepthFirstSearch(tree.root, (v) => {
  console.log(v.value);
});
console.log('前序遍历');
depthFirstSearch(tree.root, (v) => {
  console.log(v.value);
});

console.log('中序遍历-递归');
recursiveInfixDepthFirstSearch(tree.root, (v) => {
  console.log(v.value);
});

console.log('中序遍历');
infixDepthFirstSearch(tree.root, (v) => {
  console.log(v.value);
});

// 中序遍历，非递归
function infixDepthFirstSearch(root, callback) {
  // 记录每个节点值
  const stack = [];
  let currentNode = root;
  while (currentNode || stack.length) {
    if (currentNode) {
      stack.push(currentNode);
      currentNode = currentNode.left;
    } else {
      // 元素依次出栈，并访问当前元素right
      const node = stack.pop();
      callback(node);
      currentNode = node.right;
    }
  }
}

// 后续遍历 left -> root -> right
function recursiveFollowDepthFirstSearch(root, callback) {
  if (root) {
    // 递归访问左节点
    recursiveFollowDepthFirstSearch(root.left, callback);
    // 递归访问左节点
    recursiveFollowDepthFirstSearch(root.right, callback);
    callback(root);
  }
}
console.log('后序遍历-递归');
recursiveFollowDepthFirstSearch(tree.root, (v) => {
  console.log(v.value);
});

console.log('后序遍历');
followDepthFirstSearch(tree.root, (v) => {
  console.log(v.value);
});

// 后续遍历，该出未完全实现
function followDepthFirstSearch(root, callback) {
  const stack = [];
  let currentNode = root;
  while (currentNode || stack.length) {
    if (currentNode) {
      stack.push(currentNode);
      parentNode = null
    } else {
      const node = stack.pop();
      currentNode = node.right;
    }

    if (currentNode) callback(currentNode);
  }
}
