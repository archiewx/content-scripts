/**
 * 背包问题是算法研究中的一个经典问题。试想你是一个保险箱大盗，
 * 打开了一个装满奇珍异宝的保险箱，但是你必须将这些宝贝放入你的一个小背包中。
 * 保险箱中的物品规格和价值不同。你希望自己的背包装进的宝贝总价值最大。
 * https://blog.csdn.net/qq_16234613/article/details/52235082
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

// 状态方程: f[i][w] = max(f[i-1][w], f[i-1][w-w[i]] + v[i])
// i: 代表宝贝下标
// w: 表示当前背包容量
// w[i]: 第i件宝贝所占容量
// v[i]: 代表第i件宝贝价值
// f[i][w]: 代表在i件宝贝，背包容量为w的情况下最大收益
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

// 动态规划优化
// 通过比较状态 f[w] = max(f[w], f[w-w[i]] + v[i])
// i 代表第i件宝贝
// v[i] 第i件宝贝价值
// w: 容量为w
// f[w]: 容量为w下的背包最大价值
// w[i]: 第i减宝贝占用的容量
function dpBackpack1(capacity, treasures) {
  const f = [];
  for (let w = 0; w <= capacity; w++) {
    for (let index = 0; index < treasures.length; index++) {
      if (w === 0) {
        f[w] = 0;
      } else if (treasures[index].size <= w) {
        let size = treasures[index].size,
          value = treasures[index].value;

        f[w] = Math.max(f[w - size] + value, f[w] || 0);
      } else {
        f[w] = Math.max(f[w] || 0, f[w - 1]);
      }
    }
  }
  console.log(f);
  return f[capacity];
}

console.log(
  dpBackpack1(10, [
    { value: 4, size: 3 },
    { value: 5, size: 4 },
    { value: 10, size: 7 },
    { value: 11, size: 8 },
    { value: 13, size: 9 },
  ])
);

// 背包,贪心算法
// 非0-1背包问题
function greedyBackpack(capacity, treasures) {
  // 按照宝物性价比排序
  treasures.sort((a, b) => {
    return a.value / a.size - b.value / b.size;
  });

  // 最大价值
  let maxValue = 0,
    // 选择宝物
    selected = 0;

  for (let index = 0; index < treasures.length && selected < capacity; index++) {
    const v = treasures[index].value,
      w = treasures[index].size;
    if (w <= capacity - selected) {
      maxValue += v;
      selected += w;
    } else {
      maxValue += v * ((capacity - selected) / w);
      selected = capacity;
    }
  }
  return maxValue
}

console.log(
  greedyBackpack(10, [
    { value: 4, size: 3 },
    { value: 5, size: 4 },
    { value: 10, size: 7 },
    { value: 11, size: 8 },
    { value: 13, size: 9 },
  ])
);
