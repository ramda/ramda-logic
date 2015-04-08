module.exports = function disj(f1, f2) {
  return function(x) {
    return f1(x).concat(f2(x));
  };
};
