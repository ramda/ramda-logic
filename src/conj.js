var chain = require('ramda').chain;

module.exports = function conj(f1, f2) {
  return function(x) {
    return chain(f2, f1(x));
  };
};
