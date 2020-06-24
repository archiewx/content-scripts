function format(str) {
  const _str = str + '';
  return _str.replace(/(\d)(?=(\d{3})+\b)/g, '$1,');
}

// 分组解决
function format1(str = '') {
  const strArray = (str + '').split('');
  const dotIndex = strArray.indexOf('.');
  let integerArray = strArray;
  let dotArray = [];
  if (~dotIndex) {
    integerArray = strArray.slice(0, dotIndex);
    dotArray = strArray.slice(dotIndex + 1);
  }
  const reminder = integerArray.length % 3;
  const dotRemind = dotArray.length % 3;
  let intSeqArray = integerArray.slice(0, reminder);
  if (integerArray.length > 3) intSeqArray = intSeqArray.concat(',');

  let dotSeqArray = [];
  if (~dotIndex) {
    dotSeqArray = dotArray.slice(0, dotRemind)
    if (dotSeqArray.length && dotArray.length > 3) dotSeqArray = dotSeqArray.concat(',');
  }
  const count = (integerArray.length - reminder) / 3;
  const dotCount = (dotArray.length - dotRemind) / 3;

  function groupSplit(array, offset, count) {
    let seqArray = [];
    for (let index = 0; index < count; index++) {
      const startIndex = offset + index * 3;
      const endIndex = offset + (index + 1) * 3;
      seqArray = seqArray.concat(array.slice(startIndex, endIndex), endIndex === array.length ? '' : ',');
    }
    return seqArray;
  }
  intSeqArray = intSeqArray.concat(groupSplit(integerArray, reminder, count));
  dotSeqArray = dotSeqArray.concat(groupSplit(dotArray, dotRemind, dotCount));

  let _str = intSeqArray.join('');
  if (~dotIndex) _str += '.' + dotSeqArray.join('');

  return _str;
}

console.log(format(2.23234243242));
console.log(format1(3.23234243242));
