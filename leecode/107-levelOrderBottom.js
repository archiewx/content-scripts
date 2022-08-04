// https://leetcode.cn/problems/binary-tree-level-order-traversal-ii/submissions/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function (root) {
  if (!root) return [];
  var queue = [root];
  var values = [];
  var len = queue.length;
  var levelValues = [];
  while (len--) {
    var node = queue.shift();
    levelValues.push(node.val);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
    if (!len) {
      len = queue.length;
      values.unshift(levelValues);
      levelValues = [];
    }
  }
  return values;
};
