const HashTable = require('./hash-table');

// 二叉树节点
class BinaryTreeNode {
  constructor(v = null) {
    this.value = v;
    /** @type {BinaryTreeNode} */
    this.parent = null;
    /** @type {BinaryTreeNode} */
    this.left = null;
    /** @type {ThisType} */
    this.right = null;

    // 每一个节点关联的元信息
    this.meta = new HashTable();
  }

  get leftHeight() {
    if (!this.left) return 0;
    return this.left.height + 1;
  }

  get rightHeight() {
    if (!this.right) return 0;

    return this.right.height + 1;
  }

  get height() {
    return Math.max(this.leftHeight, this.rightHeight);
  }

  get balanceFactor() {
    return this.leftHeight - this.rightHeight;
  }

  // 得到父亲兄弟节点
  get uncle() {
    if (!this.parent || !this.parent.parent) return null;

    if (!this.parent.parent.left || !this.parent.parent.right) return null;

    if (this.parent.parent.left === this.parent) return this.parent.parent.right;

    return this.parent.parent.left;
  }

  setValue(v) {
    this.value = v;
    return this;
  }

  setLeft(node) {
    if (this.left) this.left.parent = null;

    this.left = node;
    if (this.left) this.left.parent = this;

    return this;
  }

  setRight(node) {
    if (this.right) this.right.parent = null;

    this.right = node;
    if (this.right) this.right.parent = this;

    return this;
  }

  removeChild(node) {
    if (this.left && node === this.left) {
      this.left = null;
      return true;
    }

    if (this.right && node === this.right) {
      this.right = null;
      return true;
    }

    return false;
  }

  replaceChild(oldNode, newNode) {
    if (!oldNode || !newNode) return false;

    if (this.left && oldNode === this.left) {
      this.left = newNode;
      return true;
    }

    if (this.right && oldNode === this.right) {
      this.right = newNode;
      return true;
    }

    return false;
  }

  static copyNode(sourceNode, targetNode) {
    targetNode.setValue(sourceNode.value);
    targetNode.setLeft(sourceNode.left);
    targetNode.setRight(sourceNode.right);
  }

  traverseInOrder() {
    let traverses = [];

    if (this.left) traverses = traverses.concat(this.left.traverseInOrder());

    traverses.push(this.value);

    if (this.right) traverses = traverses.concat(this.right.traverseInOrder());

    return traverses;
  }

  toString() {
    return this.traverseInOrder().toString();
  }
}

// 二叉搜索树节点
// 再一个二叉搜索树中，如果左子树不空，左子树恒小于根节点
// 如果有一个右侧子树，右侧子树恒大于根节点
// 左右子树都是二叉排序树 ->> 二叉排序树就是二叉查找树
// 键值不等
class BinarySearchTreeNode extends BinaryTreeNode {
  constructor(v) {
    super(v);
  }

  insert(v) {
    if (this.value === null) {
      this.value = v;
      return this;
    }

    const node = new BinarySearchTreeNode(v);
    // 若插入的值大于当前节点值, 放置到右侧
    if (this.value < v) {
      // 如果右节点不为空，就使用右节点insert方法
      if (this.right) this.right.insert(v);
      // 否则直接设置右节点
      else this.setRight(node);

      return node;
    }

    // 若插入的值小于当前值，放置到左侧
    if (this.value > v) {
      // 判断左侧是否有元素，依次执行下去
      if (this.left) this.left.insert(v);
      // 否则直接设置左节点
      else this.setLeft(node);
      return node;
    }

    return this;
  }

  find(v) {
    if (this.value === v) return this;

    // 根据二叉排序树特点, 大于当前值就去右侧find
    if (this.value < v && this.right) {
      return this.right.find(v);
    }

    // 否则就在左侧find
    if (this.value > v && this.left) {
      return this.left.find(v);
    }

    // 最后返回null
    return null;
  }

  contains(v) {
    return !!this.find(v);
  }

  remove(v) {
    const nodeToRemove = this.find(v);

    if (!nodeToRemove) return true;

    // 若移除的元素不存在左右子树
    if (!nodeToRemove.left && !nodeToRemove.right) {
      // 直接通过其父级元素移除该节点
      if (nodeToRemove.parent) nodeToRemove.parent.removeChild(nodeToRemove);
      // 否则就设置该节点值为空, 这里应该走不到
      else nodeToRemove.setValue(undefined);
      // 若移除元素存在左右子树
    } else if (nodeToRemove.left && nodeToRemove.right) {
      // 通过右侧子树查找最小值, 以满足BST 规则
      // 这里查找到相当于 当前节点right节点的最小值
      const nextBiggerNode = nodeToRemove.right.findMin();
      if (nextBiggerNode !== nodeToRemove.right) {
        // 这里如果说下一级节点不是right节点本身, 就递归删除right节点的左侧节点
        this.remove(nextBiggerNode.value);
        // 最后将要移除的节点值用right节点的left值覆盖掉
        nodeToRemove.setValue(nextBiggerNode.value);
      } else {
        // 下一个节点就是right节点本身。就直接用覆盖掉移除节点。(满足父级节点大于left节点值)
        nodeToRemove.setValue(nodeToRemove.right.value);
        nodeToRemove.setRight(nodeToRemove.right.right);
      }
    } else {
      // 到这里判断条件，移除的节点只存在一个left或者right节点
      const childNode = nodeToRemove.left || nodeToRemove.right;
      if (nodeToRemove.parent) {
        // 存在父级，就直接replace
        nodeToRemove.parent.replaceChild(nodeToRemove, childNode);
      } else {
        // 不存在父级节点，且只有一个子节点情况下，直接copy 移除节点
        BinarySearchTreeNode.copyNode(childNode, nodeToRemove);
      }
    }

    // 所有操作完成，需要把移除节点的父级给断开
    // 这里还有疑问?
    nodeToRemove.parent = null;

    return true;
  }

  // 查询最小值，只能在左子树上寻找
  findMin() {
    if (!this.left) return this;

    return this.left.findMin();
  }
}

class BinaryTree {
  constructor() {
    this.root = new BinarySearchTreeNode();
  }

  insert(v) {
    return this.root.insert(v);
  }

  contains(v) {
    return this.root.contains(v);
  }

  remove(v) {
    return this.root.remove(v);
  }

  toString() {
    return this.root.toString();
  }
}

const tree = new BinaryTree();
module.exports = tree;

// tree.insert(50).insert(20)
// tree.insert(90)

// tree.remove(50)
// console.log(tree)
// console.log(tree.root.leftHeight, tree.root.height)
