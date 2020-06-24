// 广度优先遍历(BFS)

function breathFirstSearch(rootNode, callback) {
  const queue = [rootNode]
  while(!queue.length) {
    const node = queue.shift()

    callback(node)

    if (node.left) queue.push(node.left)

    if (node.right) queue.push(node.right)
  }
}
