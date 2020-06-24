function sum() {
  const args = Array.prototype.slice.apply(arguments);
  function _sum() {
    args.push(...Array.prototype.slice.apply(arguments));
    return _sum
  }

  _sum.valueOf = function () {
    return args.reduce((prev, curv) => prev + curv);
  };

  return _sum;
}

console.log(sum(1)(2)(3)(20).valueOf())
