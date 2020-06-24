// 洗牌算法

function shuffle(array = []) {
  const cloneArray = array.slice();

  // 依次对在 0 -> i 范围内的元素，随机指定一个位置，以达到洗牌的目的
  for (let index = cloneArray.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [cloneArray[index], cloneArray[randomIndex]] = [cloneArray[randomIndex], cloneArray[index]];
  }

  return cloneArray;
}

console.log(shuffle([1, 2, 3, 4, 5, 6, 7, 8]));
