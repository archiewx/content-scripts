// 洗牌算法

function shuffle(array = []) {
  const cloneArray = array.slice();

  for (let index = cloneArray.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [cloneArray[index], cloneArray[randomIndex]] = [cloneArray[randomIndex], cloneArray[index]];
  }

  return cloneArray;
}

console.log(shuffle([1, 2, 3, 4, 5, 6, 7, 8]));
