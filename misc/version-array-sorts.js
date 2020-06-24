/**
 * ['1.45.0','1.5','6','3.3.3.3.3.3.3']
 */

const array = ['1.45.0', '1.5', '6', '3.3.3.3.3.3.3'];

function sortVersion(array) {
  return array.sort(versionCompare)
}

console.log(sortVersion(array))

// 1 v1 > v2
// 0 v1 == v2
// -1 v1 < v2
function versionCompare(v1 = '', v2 = '') {
  const v1Array = v1.split('.');
  const v2Array = v2.split('.');
  const v1OriginLen = v1Array.length;
  const v2OriginLen = v2Array.length;
  let flag;

  while (v1Array.length || v2Array.length) {
    const sv1 = v1Array.shift() || 0;
    const sv2 = v2Array.shift() || 0;
    if (sv1 > sv2) {
      flag = 1;
      break;
    }

    if (sv1 < sv2) {
      flag = -1;
      break;
    }
  }

  if (!flag) flag = 0;

  return flag;
}
