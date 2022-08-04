/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
// https://leetcode.cn/problems/binary-tree-level-order-traversal/submissions/
var levelOrder = function (root) {
  if (!root) return [];
  const ret = [];
  const queue = [root];
  while(queue.length) {
    let len = queue.length;
    ret.push([]);
    while(len --) {
      const node = queue.pop();
      ret[ret.length - 1].push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  } 
  return ret;
};
