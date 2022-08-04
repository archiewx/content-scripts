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

var zigzagLevelOrder = function (root) {
  if (!root) return [];
  var array = [root];
  var values = [];
  var level = 0;
  while(array.length) {
    let len = array.length;
    values.push([]);
    while(len --) {
      const node = array.shift();
      if (level % 2 === 0) {
        values[values.length - 1].push(node.val);
      } else {
        values[values.length - 1].unshift(node.val);
      }
      if (node.left) array.push(node.left);
      if (node.right) array.push(node.right);
    }
    level = level + 1;
  }
  return values;
};