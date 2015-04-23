module.exports = function conj(f1, f2) {
  return function(x) {
    return f1(x).flatMap(f2);
  };
};
