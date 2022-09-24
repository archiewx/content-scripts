/**
 * 匹配字符串重复字符串
 * @param {*} name 
 * @param {*} typed 
 * @returns 
 */
function judge(name, typed) {
  var i1 = 0,
    i2 = 0;
  while (i1 < name.length) {
    const c = name[i1];
    let dup1 = 0,
      dup2 = 0;
    while (c === name[i1]) {
      i1++;
      dup1++;
    }

    while (c === typed[i2]) {
      i2++;
      dup2++;
    }

    if (dup1 > dup2) return false;
  }

  return i1 === name.length && i2 === typed.length;
}

console.log(judge("alex", "aaleex")); // true
console.log(judge("account", "aaccoount")); // true
console.log(judge("aacb", "acbb")); // false
