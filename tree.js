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
// 左右子树都是二叉排序树
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
    if (this.value < v) {
      if (this.right) this.right.insert(v);
      else this.setRight(node);

      return node;
    }

    if (this.value > v) {
      if (this.left) this.left.insert(v);
      else this.setLeft(node);
      return node;
    }

    return this;
  }

  find(v) {
    if (this.value === v) return this;

    if (this.value < v && this.right) {
      return this.right.find(v);
    }

    if (this.value > v && this.left) {
      return this.left.find(v);
    }

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
      // 通过右侧子树查找最小值
      const nextBiggerNode = nodeToRemove.right.findMin();
      // NOTE: 这里还有疑问?
      if (nextBiggerNode !== nodeToRemove.right) {
        this.remove(nextBiggerNode.value);
        nodeToRemove.setValue(nextBiggerNode.value);
      } else {
        nodeToRemove.setValue(nodeToRemove.right.value);
        nodeToRemove.setRight(nodeToRemove.right.right);
      }
    } else {
      const childNode = nodeToRemove.left || nodeToRemove.right;
      if (nodeToRemove.parent) {
        nodeToRemove.parent.replaceChild(nodeToRemove, childNode);
      } else {
        BinarySearchTreeNode.copyNode(childNode, nodeToRemove);
      }
    }

    nodeToRemove.parent = null;

    return true;
  }

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

const tree = new BinaryTree()

tree.insert(50).insert(20)
tree.insert(90)

tree.remove(50)
console.log(tree)
console.log(tree.root.leftHeight, tree.root.height)
