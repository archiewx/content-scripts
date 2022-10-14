interface BaseOptions {
  map: string; // 进制字符表，例如十进制： '0123456789'
  base: number; // 表示几进制
}

function convertBase(
  numberString: string,
  fromBase: BaseOptions,
  toBase: BaseOptions
): string {
  if (numberString === '0') return numberString;
  // 先转换统一10进制
  const from = fromBase.base;
  let num10 = 0;
  let fromLen = numberString.length;
  for (let i = 0; i < fromLen; i++) {
    const fromNum = fromBase.map.indexOf(numberString[i]); 
    if (fromNum < 0) throw new Error('Base not match');
    num10 += Number(fromNum) * Math.pow(from, fromLen - 1 - i);
  }
  // 10进制转n进制
  let numN = "";
  let dividend = num10;

  while (dividend !== 0) {
    const extra = dividend % toBase.base;
    dividend = (dividend - extra) / toBase.base;
    // 换算
    numN = toBase.map[extra] + numN;
  }

  return numN;
}

// test cases

const base62: BaseOptions = {
  map: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  base: 62,
};
const base36: BaseOptions = {
  map: "0123456789abcdefghijklmnopqrstuvwxyz",
  base: 36,
};
const base16: BaseOptions = {
  map: "0123456789abcdef",
  base: 16,
};
const base10: BaseOptions = {
  map: "0123456789",
  base: 10,
};
const base8: BaseOptions = {
  map: "01234567",
  base: 8,
};
const base2: BaseOptions = {
  map: "01",
  base: 2,
};

console.log('base10=', convertBase("0", base36, base10));
console.log(convertBase("0", base36, base10) === "0");
console.log('base62=', convertBase("7371012", base8, base62));
console.log(convertBase("7371012", base8, base62) === "8exk");
console.log('base36=', convertBase("1001001", base2, base36));
console.log(convertBase("1001001", base2, base36) === "21");
console.log('base10=', convertBase("Eax8031", base62, base10));
console.log(convertBase("Eax8031", base62, base10) === "2281660277579");
// console.log(convertBase("1037238", base8, base2));
