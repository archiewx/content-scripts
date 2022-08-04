// 广度优先遍历(BFS)

/**
 * 广度遍历优先的思路：从当前节点开始，借助队列，依次从左往右访问
 * @param {*} rootNode 
 * @param {*} callback 
 */
function breathFirstSearch(rootNode, callback) {
  const queue = [rootNode]
  while(!queue.length) {
    const node = queue.shift()

    callback(node)

    if (node.left) queue.push(node.left)

    if (node.right) queue.push(node.right)
  }
}
