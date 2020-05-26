// 寻找最大公共子串

// 暴力遍历法
function findCommonMaxSubString(str1 = '', str2 = '') {
  if (!str1 || !str2) return '';

  let len1 = str1.length,
    len2 = str2.length;

  var maxSubString = '';

  for (let m = 0; m < len1; m++) {
    for (let n = 0; n < len2; n++) {
      var tempStr = '',
        k = 0;
      while (m + k < len1 && n + k < len2 && str1[m + k] === str2[n + k]) {
        tempStr += str1[m + k];
        k++;
      }
      if (tempStr.length > maxSubString.length) {
        maxSubString = tempStr;
      }
    }
  }

  return maxSubString;
}

console.log(findCommonMaxSubString('12345632323322', '65123432323322'));

function findCommonMaxSubString2(str1, str2) {
  if (!str1 || !str2) return '';

  let len1 = str1.length,
    len2 = str2.length;

  var maxSubString = '';

  for (let m = 0; m < len1; m++) {
    for (let n = 0; n < len2; n++) {
      if (str1[m] === str2[n]) {
        let k = 0;
        let tmpStr = str1[m];
        while (m + k < len1 && n + k < len2 && str1[m + k] === str2[n + k]) {
          tmpStr += str1[m + k];
          k++;
        }

        if (tmpStr.length > maxSubString.length) maxSubString = tmpStr;
      }
    }
  }

  return maxSubString;
}
console.log(findCommonMaxSubString('12345632323322', '65123432323322'));

// 动态规划: https://blog.csdn.net/u010397369/article/details/38979077
// 这里思路通过将元素按照二维矩阵来排列，若(x,y)点相同的值为1，不同的值为0
// 则发现 值为1对角线最长的地方就是最长的子串
function findCommonMaxSubString1(str1 = '', str2 = '') {
  const points = [];
  let maxLen = 0;
  let maxSubString = '';
  for (let m = 0; m < str1.length; m++) {
    for (let n = 0; n < str2.length; n++) {
      if (!Array.isArray(points[m])) points[m] = [];

      if (str1[m] === str2[n]) {
        if (m > 0 && n > 0) {
          points[m][n] = points[m - 1][n - 1] + 1;
        } else {
          points[m][n] = 1;
        }
        if (points[m][n] > maxLen) {
          maxLen = points[m][n];
          // 此刻最长子串就是[m + 1 - maxLen, m]
          // substring的参数区间是[startIndex, endIndex)
          // 所以使用substring结果就是[m+1-maxLen, m + 1)
          // 实际结果就是[m+1-maxLen, m]
          maxSubString = str1.substring(m + 1 - maxLen, m + 1);
        }
      } else {
        points[m][n] = 0;
      }
    }
  }
  return maxSubString;
}

console.log(findCommonMaxSubString1('12345632323322', '65123432323322'));

// 针对 findCommonMaxSubString2 优化
function findCommonMaxSubString3(str1 = '', str2 = '') {
  const points = [];
  // 初始化第一行
  points[0] = [];
  let maxLen = 0;
  let maxSubString = ''
  for (let index = 0; index < str1.length; index++) {
    points[0][index] = str1[index] === str2[0] ? 1 : 0;
  }
  // 初始化第一列
  for (let index = 1; index < str2.length; index++) {
    if (!Array.isArray(points[index])) points[index] = [];
    points[index][0] = str1[index] === str2[0] ? 1 : 0;
  }

  for (let m = 1; m < str1.length; m++) {
    for (let n = 1; n < str2.length; n++) {
      if (str1[m] === str2[n]) {
        points[m][n] = points[m - 1][n - 1] + 1;

        if (points[m][n] > maxLen) {
          maxLen = points[m][n];
          maxSubString = str1.substring(m + 1 - maxLen, m + 1)
        }
      } else {
        points[m][n] = 0;
      }
    }
  }
  return maxSubString;
}

console.log(findCommonMaxSubString3('12345632323322', '65123432323322'));
