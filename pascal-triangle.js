// 杨辉三角生成

// 递归实现
function recursivePascalTriangle(lineNumber) {
  if (lineNumber === 0) return [1];

  const currentLineNum = lineNumber + 1;
  const preLineNum = currentLineNum - 1;

  const currentLine = [];

  const preLine = recursivePascalTriangle(lineNumber - 1);

  for (let index = 0; index < currentLineNum; index++) {
    // 最左侧元素是否超出边界
    const leftValue = index - 1 >= 0 ? preLine[index - 1] : 0;
    // 判断是为了最右侧元素是否超过边界
    const rightValue = index < preLineNum ? preLine[index] : 0;

    // 每一个数都等于上一行 下标: index - 1, 下标: index 的和
    currentLine[index] = leftValue + rightValue;
  }

  return currentLine;
}

console.log(recursivePascalTriangle(5));

// O(1) 级别算法
function pascalTriangle(lineNum) {
  const currentLine = [1]
  const currentLineNum = lineNum + 1;
  for (let index = 1; index < currentLineNum; index++) {
    // C(lineNumber, i) = C(lineNumber, i - 1) * (lineNumber - i + 1) / i
    currentLine[index] = currentLine[index - 1] * (lineNum - index + 1) / index
  }

  return currentLine
}
console.log(pascalTriangle(5));
