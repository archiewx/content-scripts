// 深度优先遍历 (DFS)

function depthFirstSearch(root, callback) {
  const traverse = (node, callback) => {
    if (node.left) traverse(node.left, callback)

    if (node.right) traverse(node.right, callback)
  }

  traverse(root, callback)
}
