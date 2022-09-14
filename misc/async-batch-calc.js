function asyncAdd(a, b) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a + b);
    }, 1000 * Math.random());
  });
}

class TrieNode {
  constructor(num) {
    this.value = num;
    this.children = new Map();
  }

  getChild(v) {
    return this.children.get(v);
  }
}

class Trie {
  constructor() {
    this.head = new TrieNode(0);
  }

  add(n) {
    
  }
}

// 分组批量处理+缓存
const cache = new Map();
async function sum() {
}

async function main() {
  const s1 = await sum(1, 2, 3, 4, 5);
  const s2 = await sum(4, 5, 6, 7, 8);
  const s3 = await sum(10, 4, 5, 8, 3);
  console.log(s1, s2, s3);
}