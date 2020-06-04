// 针对二叉树，从根到不同叶子形成的数字求求和

const tree = require('./tree');

function treeSum(root, cur = 0, sum = 0) {
  if (!root) return;
  cur = cur * 10 + root.value;
  // 当前节点只有左子树
  if (root.left && !root.right) {
    // 当前节点只有右子树
    sum = treeSum(root.left, cur, sum);
  } else if (!root.left && root.right) {
    sum = treeSum(root.right, cur, sum);
  } else if (!root.left && !root.right) {
    return sum + cur;
  } else {
    // 左右子树都存在
    sum = treeSum(root.left, cur, sum);
    sum = treeSum(root.right, cur, sum);
  }

  return sum;
}

tree.insert(3);
tree.insert(2);
tree.insert(4);
tree.insert(5);

console.log(tree);
console.log(treeSum(tree.root));
