/**
 * 背包问题是算法研究中的一个经典问题。试想你是一个保险箱大盗，
 * 打开了一个装满奇珍异宝的保险箱，但是你必须将这些宝贝放入你的一个小背包中。
 * 保险箱中的物品规格和价值不同。你希望自己的背包装进的宝贝总价值最大。
 */

/**
 * 递归解决
 * @param {*} capacity 背包剩余容量
 * @param {*} treasures 宝物列表
 * @param {*} index 宝物索引
 */
function backpackRecursive(capacity, treasures, index) {
  if (capacity <= 0 || index < 0) return 0;

  if (treasures[index].size > capacity) return backpackRecursive(capacity, treasures, index - 1);

  // 这里比较当前这个宝物价值+下一件物品价值(减去背包容量)是否能够比下一件物品价值高(不减容量)
  return Math.max(
    treasures[index].value + backpackRecursive(capacity - treasures[index].size, treasures, index - 1),
    backpackRecursive(capacity, treasures, index - 1)
  );
}

console.log(
  backpackRecursive(
    20,
    [
      { value: 4, size: 3 },
      { value: 5, size: 4 },
      { value: 10, size: 7 },
      { value: 11, size: 8 },
      { value: 13, size: 9 },
    ],
    4
  )
);

function dpBackpack(capacity, treasures = []) {
  const f = [];
  for (let index = 0; index <= treasures.length; index++) {
    f[index] = [];
    for (let w = 0; w <= capacity; w++) {
      if (w === 0 || index === 0) {
        f[index][w] = 0;
      } else if (treasures[index - 1].size <= w) {
        let size = treasures[index - 1].size,
          value = treasures[index - 1].value;

        f[index][w] = Math.max(f[index - 1][w - size] + value, f[index - 1][w]);
      } else {
        f[index][w] = f[index - 1][w];
      }
    }
  }
  console.log(f);

  return f[treasures.length][capacity];
}
console.log(
  dpBackpack(10, [
    { value: 4, size: 3 },
    { value: 5, size: 4 },
    { value: 10, size: 7 },
    { value: 11, size: 8 },
    { value: 13, size: 9 },
  ])
);
